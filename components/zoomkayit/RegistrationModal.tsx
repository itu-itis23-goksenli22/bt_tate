"use client";

import { useState, useEffect } from "react";

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
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [countryCode, setCountryCode] = useState("+90");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
          phone: formData.phone.replace(/\D/g, "") ? `${countryCode}${formData.phone.replace(/\D/g, "")}` : "",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        // Redirect to VIP upsell page after 1.5s
        setTimeout(() => {
          window.location.href = `/kayitbasarili?name=${encodeURIComponent(formData.name)}`;
        }, 1500);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch {
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
          {status === "success" ? (
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

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <div className="flex">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-2 py-3.5 bg-white/10 border border-white/20 border-r-0 rounded-l-xl text-white text-base focus:outline-none focus:border-gold appearance-none cursor-pointer"
                      style={{ minWidth: "80px" }}
                    >
                      <option value="+90">🇹🇷 +90</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+31">🇳🇱 +31</option>
                      <option value="+46">🇸🇪 +46</option>
                      <option value="+43">🇦🇹 +43</option>
                      <option value="+32">🇧🇪 +32</option>
                      <option value="+994">🇦🇿 +994</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+61">🇦🇺 +61</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="5XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
                        let formatted = raw;
                        if (raw.length > 3 && raw.length <= 6) {
                          formatted = `${raw.slice(0, 3)} ${raw.slice(3)}`;
                        } else if (raw.length > 6 && raw.length <= 8) {
                          formatted = `${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6)}`;
                        } else if (raw.length > 8) {
                          formatted = `${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6, 8)} ${raw.slice(8)}`;
                        }
                        setFormData((prev) => ({
                          ...prev,
                          phone: formatted,
                        }));
                      }}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-r-xl text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-base"
                    />
                  </div>
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
