"use client";

import { useEffect } from "react";

export default function WebinarFormSection() {
  useEffect(() => {
    // Load the GoHighLevel form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Listen for form submission success
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
        // Redirect to success page
        window.location.href = '/webinarkayit';
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <section id="webinar-form" className="py-20 px-4 bg-primary">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm md:text-base uppercase tracking-widest font-semibold mb-4">
            YERİNİZİ KAPTIN
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ücretsiz Seminere
            <br/>
            <span className="text-accent">Kayıt Olun</span>
          </h2>
          <div className="flex items-center justify-center space-x-2 text-white/60 text-sm md:text-base mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            <p>Kayıt olduktan hemen sonra bonus paketinize erişin</p>
          </div>

          {/* Bonus Items */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-white font-semibold text-sm">ChatGPT Prompts</div>
              <div className="text-accent text-xs">$150 Değer</div>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-white font-semibold text-sm">Midjourney Şablonları</div>
              <div className="text-accent text-xs">$200 Değer</div>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
              <div className="text-3xl mb-2">💼</div>
              <div className="text-white font-semibold text-sm">Freelance Başlangıç Kiti</div>
              <div className="text-accent text-xs">$150 Değer</div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="card-glass p-6 md:p-8">
          <div className="bg-white rounded-2xl overflow-hidden">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/84Is6fx7guuS4EeNPxf2"
              style={{
                width: '100%',
                height: '650px',
                border: 'none',
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
