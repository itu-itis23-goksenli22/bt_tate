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
  // Budget tier — kullanıcı form içinde 3 seçenekten birini seçer.
  // Submit budget tier doluyken yapılır → /api/qualify-lead tek call'da hepsini hallediyor.
  const [budgetTier, setBudgetTier] = useState<"low" | "mid" | "high" | null>(null);
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

      // Low tier → server redirectUrl Skool döner, direkt git
      if (budgetTier === "low") {
        const skoolUrl =
          data?.redirectUrl || "https://www.skool.com/aiscaleapp-9624/about";
        window.location.href = skoolUrl;
        return;
      }

      // Mid/High tier → browser-side trackCompleteRegistration (dedup için aynı eventId)
      const tierValue = budgetTier === "high" ? 15 : 5;
      trackCompleteRegistration(
        {
          content_name: "Webinar Kayıt",
          status: "completed",
          value: tierValue,
          currency: "TRY",
        },
        data.eventId
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

            {/* Budget tier — kullanıcı 3 seçenekten birini seçmek zorunda.
                Seçim Meta CompleteRegistration value-based bidding sinyalini
                kalibre eder + low tier Zoom + event yok (Skool'a gider). */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Yatırım bütçen ne aralıkta?
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setBudgetTier("high")}
                  className={`px-4 py-3 rounded-xl text-left transition-all cursor-pointer text-sm md:text-base font-semibold ${
                    budgetTier === "high"
                      ? "bg-gold/20 border-2 border-gold text-gold"
                      : "bg-white/5 border-2 border-white/15 text-white/80 hover:border-gold/40"
                  }`}
                >
                  <span className="inline-block w-4 h-4 rounded-full border-2 mr-2 align-middle border-current">
                    {budgetTier === "high" && (
                      <span className="block w-2 h-2 m-[2px] rounded-full bg-gold" />
                    )}
                  </span>
                  10.000 TL üstü
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetTier("mid")}
                  className={`px-4 py-3 rounded-xl text-left transition-all cursor-pointer text-sm md:text-base font-semibold ${
                    budgetTier === "mid"
                      ? "bg-gold/20 border-2 border-gold text-gold"
                      : "bg-white/5 border-2 border-white/15 text-white/80 hover:border-gold/40"
                  }`}
                >
                  <span className="inline-block w-4 h-4 rounded-full border-2 mr-2 align-middle border-current">
                    {budgetTier === "mid" && (
                      <span className="block w-2 h-2 m-[2px] rounded-full bg-gold" />
                    )}
                  </span>
                  3.000 — 10.000 TL arası
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetTier("low")}
                  className={`px-4 py-3 rounded-xl text-left transition-all cursor-pointer text-sm md:text-base font-semibold ${
                    budgetTier === "low"
                      ? "bg-gold/20 border-2 border-gold text-gold"
                      : "bg-white/5 border-2 border-white/15 text-white/80 hover:border-gold/40"
                  }`}
                >
                  <span className="inline-block w-4 h-4 rounded-full border-2 mr-2 align-middle border-current">
                    {budgetTier === "low" && (
                      <span className="block w-2 h-2 m-[2px] rounded-full bg-gold" />
                    )}
                  </span>
                  0 — 3.000 TL arası
                </button>
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
