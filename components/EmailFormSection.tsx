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
    <section className="py-16 md:py-20 bg-gradient-to-b from-primary-light to-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="text-center mb-10">
            <h2 className="section-title mb-6">
              <span className="text-accent-light">ÜCRETSİZ</span> SEMİNERE KATIL
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-4">
              AI ile para kazanmanın sırlarını öğren. İlk adımı at.
            </p>
            <p className="text-sm md:text-base text-white/60">
              Formu doldur, ücretsiz seminere hemen katıl.
            </p>
          </div>

          {/* GoHighLevel Embedded Form */}
          <div className="max-w-2xl mx-auto">
            <div className="card-glass !p-0 overflow-hidden">
              <div className="relative w-full" style={{ minHeight: '550px' }}>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/84Is6fx7guuS4EeNPxf2"
                  style={{
                    width: '100%',
                    height: '550px',
                    border: 'none',
                    borderRadius: '10px',
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
                  data-height="508"
                  data-layout-iframe-id="inline-84Is6fx7guuS4EeNPxf2"
                  data-form-id="84Is6fx7guuS4EeNPxf2"
                  title="Ücretsiz Webinar Kayıt Formu"
                />
              </div>
            </div>
          </div>

          {/* Trust elements */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-light mb-1">10K+</div>
              <div className="text-xs md:text-sm text-white/60">Öğrenci</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-accent-light mb-1">6+</div>
              <div className="text-xs md:text-sm text-white/60">Modül</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-light mb-1">24/7</div>
              <div className="text-xs md:text-sm text-white/60">Destek</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
