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
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="webinar-form" className="py-20 px-4 bg-primary">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm md:text-base uppercase tracking-widest font-semibold mb-4">
            2025'te Başarılı Bir Online İş Kurmak İsteyen Herkes İçin
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Bugün Adım Atarsanız, Sadece 30 Gün İçinde Kendi Başarılı Yapay Zeka İşinizi Kurabilirsiniz
          </h2>

          {/* Webinar Badge */}
          <div className="mb-8">
            <div className="inline-block bg-accent/20 border-2 border-accent rounded-2xl px-6 py-3">
              <p className="text-accent text-lg md:text-xl font-bold uppercase tracking-wider">
                Yapay Zeka Ajans Modeli:
              </p>
              <p className="text-white text-base md:text-lg uppercase tracking-widest mt-1">
                Ücretsiz Semineri
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-white/60 text-sm md:text-base mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            <p>Kayıt olduktan hemen sonra bonus paketinize erişin</p>
          </div>

          {/* Bonus Info */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 max-w-3xl mx-auto mb-8">
            <div className="text-4xl mb-3">🎁</div>
            <div className="text-white font-bold text-2xl mb-2">500$ Değerinde Bonus Paket</div>
            <div className="text-accent font-bold text-xl mb-3">YAPAY ZEKA BAŞLANGIÇ PAKETİ</div>
            <div className="text-white/90 font-semibold text-lg">Kayıt Olana Hediye</div>
          </div>
        </div>

        {/* GoHighLevel Form Embedding */}
        <div className="card-glass p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/84Is6fx7guuS4EeNPxf2"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '10px' }}
              id="inline-84Is6fx7guuS4EeNPxf2"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Webinar Kayıt AISCALEAPP.COM"
              data-height="491"
              data-layout-iframe-id="inline-84Is6fx7guuS4EeNPxf2"
              data-form-id="84Is6fx7guuS4EeNPxf2"
              title="Webinar Kayıt AISCALEAPP.COM"
            />
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-white/60 text-sm">
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
