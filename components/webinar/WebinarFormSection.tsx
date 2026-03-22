"use client";

import { useState } from "react";
import { setAdvancedMatching, trackCompleteRegistration } from "@/lib/meta-pixel";

export default function WebinarFormSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const phone = "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; joinUrl?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/zoom-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        // Advanced Matching — send user data to Meta Pixel
        setAdvancedMatching({ em: email, fn: firstName, ln: lastName });
        trackCompleteRegistration({
          content_name: "Webinar Kayıt",
          status: "completed",
          value: 0,
          currency: "TRY",
        });
        setResult({ success: true, message: data.message, joinUrl: data.joinUrl });
        setFirstName("");
        setLastName("");
        setEmail("");
        // phone cleared
      } else {
        setResult({ success: false, message: data.error || "Bir hata oluştu." });
      }
    } catch {
      setResult({ success: false, message: "Bağlantı hatası. Lütfen tekrar deneyin." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="webinar-form" className="py-10 md:py-20 px-4 bg-primary">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-12">
          <p className="text-accent text-sm md:text-base uppercase tracking-widest font-semibold mb-4">
            2025&apos;te Başarılı Bir Online İş Kurmak İsteyen Herkes İçin
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Bugün Adım Atarsanız, Sadece 30 Gün İçinde Kendi Başarılı Yapay Zeka İşinizi Kurabilirsiniz
          </h2>

          {/* Webinar Badge */}
          <div className="mb-4 md:mb-8">
            <div className="inline-block bg-accent/20 border-2 border-accent rounded-2xl px-6 py-3">
              <p className="text-accent text-lg md:text-xl font-bold uppercase tracking-wider">
                Yapay Zeka Ajans Modeli:
              </p>
              <p className="text-white text-base md:text-lg uppercase tracking-widest mt-1">
                Ücretsiz Semineri
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-white/60 text-sm md:text-base mb-4 md:mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            <p>Kayıt olduktan hemen sonra bonus paketinize erişin</p>
          </div>

          {/* Bonus Info */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 md:p-6 max-w-3xl mx-auto mb-4 md:mb-8">
            <div className="text-3xl md:text-4xl mb-2 md:mb-3">🎁</div>
            <div className="text-white font-bold text-xl md:text-2xl mb-2">500$ Değerinde Bonus Paket</div>
            <div className="text-accent font-bold text-lg md:text-xl mb-2 md:mb-3">YAPAY ZEKA BAŞLANGIÇ PAKETİ</div>
            <div className="text-white/90 font-semibold text-base md:text-lg">Kayıt Olana Hediye</div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="card-glass p-4 md:p-12">
          <div className="max-w-2xl mx-auto">
            {result?.success ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-3">{result.message}</h3>
                <p className="text-white/70 mb-6">Email adresinize katılım bilgileri gönderildi.</p>
                {result.joinUrl && (
                  <a
                    href={result.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-lg px-8 py-4 inline-block"
                  >
                    Webinara Katıl →
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-white/80 text-sm font-medium mb-2">
                      Adınız
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Adınız"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-white/80 text-sm font-medium mb-2">
                      Soyadınız
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Soyadınız"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                      Email Adresiniz
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                </div>

                {result && !result.success && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                    {result.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-4 shadow-glow-strong hover:shadow-glow-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Kaydediliyor..." : "Ücretsiz Kayıt Ol →"}
                </button>
              </form>
            )}
          </div>

          {/* Trust Badges */}
          <div className="mt-6 md:mt-8 flex items-center justify-center gap-6 flex-wrap text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>SSL Güvenli</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Spam Yok</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>Anında Bonus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
