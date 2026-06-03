"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { setAdvancedMatching, trackCompleteRegistration, trackLead } from "@/lib/meta-pixel";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eventType: hangi Meta event'i fire edilsin?
  //   "CR"   → CompleteRegistration (varsayılan, ana sayfa)
  //   "Lead" → Lead (yeni VIP Mastermind sayfası)
  // Sayfa türüne göre audience ayrımı için kullanılır.
  eventType?: "CR" | "Lead";
  // VARIANT override'ları — /katil gibi paralel funnel'lar için.
  // Belirtilmezse main funnel default'ları kullanılır (ZOOM_WEBINAR_ID env
  // var'ı + /kayitbasarili redirect + "Webinar Kayıt" content_name).
  webinarId?: string;
  successPath?: string;
  contentName?: string;
  // Sabit webinar tarihi (variant'lar için, örn. "6 Haziran 2026 20:00").
  // Belirtilmezse "next 20:00 today/tomorrow" hesabı kullanılır.
  fixedDateString?: string;
}

function getEventDateString(): string {
  const now = new Date();
  const turkeyOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();
  const turkeyNow = new Date(
    now.getTime() + (turkeyOffset + localOffset) * 60000
  );

  const target = new Date(turkeyNow);
  target.setHours(20, 0, 0, 0);

  // If past 20:00 Turkey time, show tomorrow's date
  if (turkeyNow.getHours() >= 20) {
    target.setDate(target.getDate() + 1);
  }

  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const days = [
    "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi",
  ];

  return `${days[target.getDay()]}, ${target.getDate()} ${months[target.getMonth()]} - Saat 20:00 (GMT+3)`;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  eventType = "CR",
  webinarId,
  successPath,
  contentName,
  fixedDateString,
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  // Telefon artık ZORUNLU DEĞİL — bonus hediye checkbox'ına tıklayan
  // kullanıcılar için açılır ve required olur. Aksi takdirde gizli kalır
  // ve boş string olarak Zoom'a/CAPI'ye gider (Zoom phone field optional,
  // Meta CAPI advanced matching da phone'u optional kabul eder).
  // Karar: people don't want to give phone — checkbox = opt-in, daha
  // yüksek conversion + telefon veren kullanıcılar daha kaliteli lead.
  const [wantsBonus, setWantsBonus] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    // fixedDateString verilmişse onu kullan, yoksa default "next 20:00" hesabı
    setDateString(fixedDateString || getEventDateString());
  }, [fixedDateString]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    // Telefon sadece "VIP hediye + özel teklifler" checkbox'ı işaretliyse
    // zorunlu. Aksi takdirde boş geçebilir.
    if (wantsBonus && !formData.phone.trim()) {
      setErrorMsg("Özel teklifler için lütfen telefon numaranızı girin.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0] || formData.name;
    const lastName = nameParts.slice(1).join(" ") || "-";

    // Advanced matching — gelecek event'ler için (email + name + phone).
    // Phone boşsa ph parametresi gönderilmez (Meta'nın hash mekanizması
    // optional field'ları normal şekilde atlar).
    setAdvancedMatching({
      em: formData.email,
      fn: firstName,
      ln: lastName,
      ...(formData.phone ? { ph: formData.phone } : {}),
    });

    try {
      // Tek-fazlı: /api/qualify-lead her kayıt için
      //   - Supabase'e kayıt
      //   - Zoom webinar'a kayıt (telefon Zoom'a da gider)
      //   - Welcome email
      //   - Sayfa türüne göre TEK CAPI event (phone CAPI'ye hash'lenerek gönderilir):
      //       ana sayfa       → CompleteRegistration
      //       vip-mastermind  → Lead
      const res = await fetch("/api/qualify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName,
          lastName,
          phone: formData.phone,
          eventType, // "CR" veya "Lead" — sayfa türüne göre
          // Variant override'lar — /katil gibi paralel funnel'lar için.
          // undefined olarak gönderilirse API default ZOOM_WEBINAR_ID +
          // default content_name kullanır.
          webinarId,
          contentName,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          fbc: getCookie("_fbc"),
          fbp: getCookie("_fbp"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
        return;
      }

      // Browser-side dedup event (server'la aynı eventId).
      // Sayfa türüne göre SADECE BİR event fire edilir — full audience ayrımı.
      const eventValue = data.eventValue ?? 0.5;
      const fireLead = data.eventType === "Lead" || eventType === "Lead";

      if (fireLead) {
        trackLead(
          {
            content_name: "Webinar Kayıt",
            content_category: "webinar",
            value: eventValue,
            currency: "TRY",
          },
          data.eventId
        );
      } else {
        trackCompleteRegistration(
          {
            content_name: "Webinar Kayıt",
            status: "completed",
            value: eventValue,
            currency: "TRY",
          },
          data.eventId
        );
      }

      // fbq flush için 200ms bekle, sonra doğru kayitbasarili'ye yönlendir:
      //   ana sayfa (CR)        → /kayitbasarili
      //   vip-mastermind (Lead) → /vip-mastermind/kayitbasarili
      //   /katil variant        → /katil/kayitbasarili (successPath prop ile)
      // successPath prop verilmişse onu kullan, yoksa eventType'a göre default.
      const computedSuccessPath =
        successPath ||
        (eventType === "Lead" ? "/vip-mastermind/kayitbasarili" : "/kayitbasarili");
      setTimeout(() => {
        window.location.href = `${computedSuccessPath}?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
      }, 200);
    } catch (err) {
      console.warn("qualify-lead failed:", err);
      setStatus("error");
      setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black font-bold hover:brightness-110 transition-all z-10 cursor-pointer"
        >
          &times;
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-1">
            &ldquo;Evet, Yerimi Ayırt&rdquo;
          </h2>
          <p className="text-xl md:text-2xl font-bold text-white text-center mb-6">
            Bu ÜCRETSİZ Webinar İçin!
          </p>

          {/* Date box */}
          <div className="border-2 border-dashed border-gold/50 bg-gold/10 rounded-xl p-4 text-center mb-6">
            <p className="text-gold font-semibold text-base md:text-lg">
              {dateString || "Pazar - Saat 20:00 (GMT+3)"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-base"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                E-posta
              </label>
              <input
                type="email"
                placeholder="email@adresiniz.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-base"
              />
            </div>

            {/* Bonus hediye checkbox — kullanıcı işaretlemediği sürece
                telefon istemiyoruz. İşaretlerse telefon alanı açılır ve
                zorunlu olur. Default unchecked → daha az sürtünme,
                conversion artar. SMS dili yok, "VIP hediye + özel
                teklifler" angle'ı. */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={wantsBonus}
                onChange={(e) => {
                  setWantsBonus(e.target.checked);
                  // Checkbox kapatılırsa telefon alanını da temizle ki
                  // kullanıcı yanlışlıkla göndermesin
                  if (!e.target.checked) {
                    setFormData((prev) => ({ ...prev, phone: "" }));
                  }
                }}
                className="mt-0.5 w-5 h-5 rounded border-2 border-gold/60 bg-white/5 text-gold focus:ring-2 focus:ring-gold/40 cursor-pointer accent-gold flex-shrink-0"
              />
              <span className="text-white text-sm leading-snug">
                🎁 Sadece üyelere <strong>özel tekliflerden</strong> haberdar
                olmak istiyorum
              </span>
            </label>

            {/* Telefon alanı — yalnızca checkbox işaretliyse görünür */}
            {wantsBonus && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Telefon
                </label>
                {/* react-phone-number-input — ülke dropdown'ında bayrak + E.164 formatı.
                    Default ülke TR, kullanıcı dropdown'dan başka ülke seçince otomatik
                    ülke kodu + maskeleme uygular. Çıktı: "+905XX..." E.164 formatında. */}
                <PhoneInput
                  international
                  defaultCountry="TR"
                  countryCallingCodeEditable={false}
                  placeholder="5XX XXX XX XX"
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: value || "",
                    }))
                  }
                  className="zk-phone-input flex items-center w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white focus-within:border-gold focus-within:ring-1 focus-within:ring-gold transition-colors text-base [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-white [&_.PhoneInputInput]:placeholder-white/40 [&_.PhoneInputInput]:ml-2 [&_.PhoneInputCountryIcon]:shadow-none"
                />
                <p className="text-white/40 text-[11px] mt-2 leading-relaxed">
                  Numaranı yalnızca üyelere özel sınırlı teklifleri
                  göndermek için kullanacağız. İstediğin zaman
                  ayrılabilirsin.
                </p>
              </div>
            )}

            {errorMsg && (
              <p className="text-danger text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="zk-btn-cta w-full py-4 md:py-5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-bold text-xl md:text-2xl rounded-xl hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Kaydediliyor...
                </span>
              ) : (
                "Yerimi Ayırt"
              )}
            </button>
          </form>

          <p className="text-white/30 text-[10px] leading-relaxed text-center mt-6">
            Bilgilerinizi göndererek, AI Scale&apos;in size e-posta yoluyla
            etkinlik hatırlatmaları ve bilgilendirme mesajları göndermesine
            onay vermiş olursunuz. Gizlilik Politikamız ve Kullanım
            Koşullarımız geçerlidir. İstediğiniz zaman abonelikten
            çıkabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
