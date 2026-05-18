"use client";

import { useState, useEffect } from "react";
import { setAdvancedMatching, trackCompleteRegistration } from "@/lib/meta-pixel";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "budget-question" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dateString, setDateString] = useState("");
  // Form submit'ten sonra eventId + eventValue saklarız, budget question
  // sonrası CompleteRegistration fire ederken kullanırız.
  const [registrationData, setRegistrationData] = useState<{
    eventId: string;
    eventValue: number;
    firstName: string;
    lastName: string;
  } | null>(null);

  useEffect(() => {
    setDateString(getEventDateString());
  }, []);

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

    setStatus("loading");
    setErrorMsg("");

    try {
      // Use existing bt_tate zoom-register API
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || formData.name;
      const lastName = nameParts.slice(1).join(" ") || "-";

      const res = await fetch("/api/zoom-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName,
          lastName,
          phone: "",
          fbc: getCookie("_fbc"),
          fbp: getCookie("_fbp"),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Kayıt server'a kaydedildi (Zoom + email).
        // CompleteRegistration event'i HENÜZ ATILMAYACAK — kullanıcı bütçe
        // sorusuna "Evet" derse fire edilir (kalifiye lead), "Hayır" derse hiç
        // fire edilmez (Skool'a yönlenir). Bu sayede Meta CompleteRegistration
        // audience'ı sadece $10k+ niyetli kullanıcılarla beslenir.
        //
        // Advanced matching her durumda set edilir (gelecek event'ler için).
        setAdvancedMatching({ em: formData.email, fn: firstName, ln: lastName });
        setRegistrationData({
          eventId: data.eventId,
          eventValue: data.eventValue,
          firstName,
          lastName,
        });
        setStatus("budget-question");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  // Budget question — "Evet, 10k+ bütçem var" → kalifiye lead
  const handleQualified = async () => {
    if (!registrationData) return;
    setStatus("loading");

    // 1. Server-side CompleteRegistration fire et (CAPI)
    fetch("/api/fire-complete-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: registrationData.eventId,
        email: formData.email,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        value: registrationData.eventValue,
        sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        contentName: "Webinar Kayıt",
        fbc: getCookie("_fbc"),
        fbp: getCookie("_fbp"),
      }),
    }).catch(() => {
      // Non-blocking — redirect yine de devam etsin
    });

    // 2. Browser-side trackCompleteRegistration (dedup için aynı eventId)
    trackCompleteRegistration(
      {
        content_name: "Webinar Kayıt",
        status: "completed",
        value: registrationData.eventValue,
        currency: "TRY",
      },
      registrationData.eventId
    );

    // 3. fbq flush'ı için 200ms bekle, sonra kayitbasarili'ye yönlendir
    setTimeout(() => {
      window.location.href = `/kayitbasarili?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
    }, 200);
  };

  // "Hayır, henüz yok" → unqualified, Skool topluluğuna yönlendir.
  // CompleteRegistration event'i fire ETME — Meta audience'ı temiz kalır.
  const handleNotQualified = () => {
    window.location.href = "https://www.skool.com/aiscaleapp-9624/about";
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
          {status === "budget-question" ? (
            <div className="text-center py-4">
              {/* Kayıt onaylandı tick */}
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white/60 text-sm mb-1">Kaydın alındı ✓</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Son bir soru:
              </h3>
              <p className="text-white/80 text-lg md:text-xl mb-8 leading-snug">
                <span className="text-gold font-bold">10.000 TL</span> üstü
                yatırım bütçen var mı?
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <button
                  onClick={handleQualified}
                  className="flex-1 px-6 py-4 bg-gold text-black font-extrabold rounded-lg hover:brightness-110 transition-all cursor-pointer text-base shadow-lg shadow-gold/20"
                >
                  ✓ Evet, bütçem var
                </button>
                <button
                  onClick={handleNotQualified}
                  className="flex-1 px-6 py-4 bg-[#2a2a2a] text-white/70 font-semibold rounded-lg hover:bg-[#333] transition-all cursor-pointer text-base border border-white/10"
                >
                  Hayır, henüz yok
                </button>
              </div>

              <p className="text-white/30 text-xs mt-6 leading-relaxed">
                Cevabın seminer içeriğini sana göre kişiselleştirmemizi sağlar.
              </p>
            </div>
          ) : status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Kaydınız Tamamlandı!
              </h3>
              <p className="text-white/70 mb-2">
                Zoom webinar davetiyesi{" "}
                <strong className="text-gold">{formData.email}</strong> adresine
                gönderildi.
              </p>
              <p className="text-white/50 text-sm">
                {dateString ? `${dateString} - Görüşmek üzere!` : "Görüşmek üzere!"}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-gold text-black font-bold rounded-lg hover:brightness-110 transition-all cursor-pointer"
              >
                Tamam
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-1">
                &ldquo;Evet, Yerimi Ayırt&rdquo;
              </h2>
              <p className="text-xl md:text-2xl font-bold text-white text-center mb-6">
                Bu ÜCRETSİZ Webinar İçin!
              </p>

              {/* Date box */}
              <div className="border-2 border-dashed border-gold/50 bg-gold/10 rounded-xl p-4 text-center mb-8">
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

                {errorMsg && (
                  <p className="text-danger text-sm text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="zk-btn-cta w-full py-4 md:py-5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-bold text-xl md:text-2xl rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
