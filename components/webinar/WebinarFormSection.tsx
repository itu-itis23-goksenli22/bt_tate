"use client";

import { useEffect } from "react";

export default function WebinarFormSection() {
  useEffect(() => {
    // Load the GoHighLevel form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="webinar-form" className="py-28 px-4 bg-gradient-to-b from-primary via-accent/5 to-primary-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black px-10 py-4 rounded-full text-xl md:text-2xl font-black uppercase mb-10 animate-pulse shadow-2xl">
            🎁 ANINDA 500$ DEĞERİNDE HEDİYE PAKETİ! 🎁
          </div>

          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              SON ADIM!
            </span>
          </h2>

          <p className="text-3xl md:text-4xl text-white font-bold mb-6 max-w-4xl mx-auto">
            Formu Doldur ve <span className="text-accent">YERİNİ HEMEN KAPTIR!</span>
          </p>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12">
            ⚡ Kayıt olduktan 5 saniye içinde bonuslarına erişeceksin!
          </p>

          {/* Gift Items - Bigger */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent rounded-2xl p-8 transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">📚</div>
              <div className="text-white font-black text-xl mb-2">ChatGPT Prompts</div>
              <div className="text-accent font-bold">$150 Değer</div>
            </div>
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent rounded-2xl p-8 transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">🎨</div>
              <div className="text-white font-black text-xl mb-2">Midjourney Şablonları</div>
              <div className="text-accent font-bold">$200 Değer</div>
            </div>
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent rounded-2xl p-8 transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">💼</div>
              <div className="text-white font-black text-xl mb-2">Freelance Başlangıç Kiti</div>
              <div className="text-accent font-bold">$150 Değer</div>
            </div>
          </div>
        </div>

        {/* Form Container - BIGGER */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-4 border-accent rounded-3xl p-8 md:p-12 shadow-2xl shadow-accent/30">
            <div className="mb-8 text-center bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl py-6">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                ⚡ HIZLI KAYIT FORMU ⚡
              </h3>
              <p className="text-white/90 text-lg md:text-xl font-bold">30 saniye içinde tamamla ve yerine sahip ol!</p>
            </div>

            {/* GoHighLevel Form Embed - BIGGER */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/84Is6fx7guuS4EeNPxf2"
                style={{
                  width: '100%',
                  height: '650px',
                  border: 'none',
                  borderRadius: '16px'
                }}
                id="inline-84Is6fx7guuS4EeNPxf2"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="WEBINAR - Copy"
                data-height="491"
                data-layout-iframe-id="inline-84Is6fx7guuS4EeNPxf2"
                data-form-id="84Is6fx7guuS4EeNPxf2"
                title="WEBINAR - Copy"
              />
            </div>

          {/* Trust Badges - Bigger */}
          <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-3 bg-accent/20 px-6 py-3 rounded-full">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold text-lg">🔒 SSL Güvenli</span>
            </div>
            <div className="flex items-center gap-3 bg-accent/20 px-6 py-3 rounded-full">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold text-lg">✅ Spam Yok</span>
            </div>
            <div className="flex items-center gap-3 bg-accent/20 px-6 py-3 rounded-full">
              <span className="text-white font-bold text-lg">⚡ Anında Bonus</span>
            </div>
          </div>
        </div>

        {/* Social Proof - BIGGER */}
        <div className="mt-16 text-center bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 border-2 border-accent/40 rounded-3xl py-12 px-6">
          <div className="text-5xl mb-6">⭐⭐⭐⭐⭐</div>
          <p className="text-white text-2xl md:text-3xl font-black mb-6">
            15,247 KİŞİ KAYIT OLDU!
          </p>
          <p className="text-accent text-xl md:text-2xl font-bold mb-8">
            🔥 SON 24 SAATTE 1,523 YENİ KAYIT!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white text-lg md:text-xl font-semibold">
            <span>✅ Kredi Kartı Yok</span>
            <span className="hidden md:inline text-accent">•</span>
            <span>✅ %100 Ücretsiz</span>
            <span className="hidden md:inline text-accent">•</span>
            <span>✅ Anında Erişim</span>
          </div>
        </div>
      </div>
    </section>
  );
}
