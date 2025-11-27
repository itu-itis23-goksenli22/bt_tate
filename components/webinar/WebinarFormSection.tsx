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
    <section id="webinar-form" className="py-20 px-4 bg-gradient-to-b from-primary to-primary-light">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-accent/20 border border-accent text-accent px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 animate-pulse">
            🎁 500$ DEĞERİNDE HEDİYE PAKETİ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ücretsiz Yerinizi <span className="text-accent">Ayırtın</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Webinarımıza kaydolun ve anında 500$ değerinde AI araçları ve şablonlara erişim kazanın
          </p>

          {/* Gift Items */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-white font-semibold text-sm">ChatGPT Prompts Kitaplığı</div>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-white font-semibold text-sm">Midjourney Şablon Paketi</div>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="text-3xl mb-2">💼</div>
              <div className="text-white font-semibold text-sm">Freelance Başlangıç Kiti</div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="card-glass p-8 md:p-12 max-w-3xl mx-auto">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Kayıt Formu</h3>
            <p className="text-white/70">Bilgilerinizi girin ve seminere katılın</p>
          </div>

          {/* GoHighLevel Form Embed */}
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/84Is6fx7guuS4EeNPxf2"
              style={{
                width: '100%',
                height: '520px',
                border: 'none',
                borderRadius: '10px'
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

          {/* Trust Badges */}
          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Güvenli Kayıt</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Spam Yok</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Anında Erişim</span>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-white/80 font-semibold mb-4">
            ⭐⭐⭐⭐⭐ 5,000+ kişi webinarımıza katıldı
          </p>
          <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
            <span>✓ Kredi kartı gerektirmez</span>
            <span className="hidden md:inline">•</span>
            <span>✓ 100% Ücretsiz</span>
            <span className="hidden md:inline">•</span>
            <span>✓ İstediğiniz zaman ayrılabilirsiniz</span>
          </div>
        </div>
      </div>
    </section>
  );
}
