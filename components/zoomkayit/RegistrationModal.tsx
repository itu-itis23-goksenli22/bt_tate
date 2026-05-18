"use client";

import { useState, useEffect } from "react";
import { setAdvancedMatching, trackCompleteRegistration, trackLead } from "@/lib/meta-pixel";

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
  // Budget tier — kullanıcı form içinde 4 seçenekten birini seçer:
  //   "0_3000"      → 0-3.000 TL    → unqualified, Skool
  //   "3000_7500"   → 3-7.500 TL    → unqualified, Skool
  //   "7500_15000"  → 7.5-15k TL    → qualified, Zoom + CompleteRegistration + Lead (value: 10)
  //   "15000_plus"  → 15k+ TL       → qualified, Zoom + CompleteRegistration + Lead (value: 15)
  type BudgetTier = "0_3000" | "3000_7500" | "7500_15000" | "15000_plus";
  const [budgetTier, setBudgetTier] = useState<BudgetTier | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dateString, setDateString] = useState("");

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
    if (!budgetTier) {
      setErrorMsg("Lütfen yatırım bütçeni seç.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0] || formData.name;
    const lastName = nameParts.slice(1).join(" ") || "-";

    // Advanced matching — gelecek event'ler için
    setAdvancedMatching({ em: formData.email, fn: firstName, ln: lastName });

    try {
      // Tek-fazlı: /api/qualify-lead her şeyi tek call'da yapar
      //   - Supabase'e kayıt (her tier için)
      //   - Low tier  → Skool'a yönlendir, Zoom yok, event yok
      //   - Mid tier  → Zoom + email + CompleteRegistration (value: 5)
      //   - High tier → Zoom + email + CompleteRegistration (value: 15)
      const res = await fetch("/api/qualify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName,
          lastName,
          phone: "",
          budgetTier,
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

      // Unqualified tier (0-3k veya 3-7.5k) → server redirectUrl Skool döner
      if (data.qualified === false) {
        const skoolUrl =
          data?.redirectUrl || "https://www.skool.com/aiscaleapp-9624/about";
        window.location.href = skoolUrl;
        return;
      }

      // Qualified tier (7.5-15k veya 15k+) → browser-side dedup events
      // Value server'dan random small value (0.01-0.99 TRY) — eski pattern
      const eventValue = data.eventValue ?? 0.5;

      // CompleteRegistration — server'la aynı eventId, dedup
      trackCompleteRegistration(
        {
          content_name: "Webinar Kayıt",
          status: "completed",
          value: eventValue,
          currency: "TRY",
        },
        data.eventId
      );

      // Lead — Meta "Maximize leads" optimization için, ayrı eventId
      trackLead(
        {
          content_name: "Webinar Kayıt",
          content_category: "webinar",
          value: eventValue,
          currency: "TRY",
        },
        data.leadEventId
      );

      // fbq flush için 200ms bekle, sonra kayitbasarili'ye yönlendir
      setTimeout(() => {
        window.location.href = `/kayitbasarili?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
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

            {/* Budget tier — kullanıcı 4 seçenekten birini seçer.
                qualified tiers (7.5-15k, 15k+) → Zoom + CompleteRegistration + Lead
                unqualified tiers (0-3k, 3-7.5k)   → Skool'a redirect, event yok */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Yatırım bütçen ne aralıkta?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {(
                  [
                    { value: "15000_plus", label: "15.000 TL üstü" },
                    { value: "7500_15000", label: "7.500 — 15.000 TL arası" },
                    { value: "3000_7500", label: "3.000 — 7.500 TL arası" },
                    { value: "0_3000", label: "0 — 3.000 TL arası" },
                  ] as { value: BudgetTier; label: string }[]
                ).map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setBudgetTier(tier.value)}
                    data-no-meta-autotrack
                    className={`px-4 py-3 rounded-xl text-left transition-all cursor-pointer text-sm md:text-base font-semibold ${
                      budgetTier === tier.value
                        ? "bg-gold/20 border-2 border-gold text-gold"
                        : "bg-white/5 border-2 border-white/15 text-white/80 hover:border-gold/40"
                    }`}
                  >
                    <span className="inline-block w-4 h-4 rounded-full border-2 mr-2 align-middle border-current">
                      {budgetTier === tier.value && (
                        <span className="block w-2 h-2 m-[2px] rounded-full bg-gold" />
                      )}
                    </span>
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <p className="text-danger text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !budgetTier}
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
