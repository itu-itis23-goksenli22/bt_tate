"use client";

import { useEffect } from "react";

export default function EmailFormSection() {
  useEffect(() => {
    // Load GoHighLevel form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-primary-light to-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container-custom px-4">
        <div className="max-w-2xl mx-auto">
          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-accent-light">ÜCRETSİZ</span> SEMİNERE KATIL
            </h2>
            <p className="text-base md:text-lg text-white/70">
              AI ile para kazanmanın sırlarını öğren. İlk adımı at.
            </p>
          </div>

          {/* GoHighLevel Embedded Form - Compact */}
          <div className="max-w-xl mx-auto">
            <div className="bg-primary-light/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-accent/20 shadow-lg">
              <div className="relative w-full overflow-hidden rounded-xl">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/84Is6fx7guuS4EeNPxf2"
                  style={{
                    width: '100%',
                    height: '420px',
                    border: 'none',
                    borderRadius: '12px',
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
                  data-height="420"
                  data-layout-iframe-id="inline-84Is6fx7guuS4EeNPxf2"
                  data-form-id="84Is6fx7guuS4EeNPxf2"
                  title="Ücretsiz Webinar Kayıt Formu"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Trust elements */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent-light mb-1">10K+</div>
              <div className="text-xs text-white/60">Öğrenci</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-xl md:text-2xl font-bold text-accent-light mb-1">6+</div>
              <div className="text-xs text-white/60">Modül</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent-light mb-1">24/7</div>
              <div className="text-xs text-white/60">Destek</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
