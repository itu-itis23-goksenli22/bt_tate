"use client";

import { useState, FormEvent, useEffect, useRef } from "react";

export default function WebinarFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [displayPhone, setDisplayPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Format phone number for display: 5555555555 -> 555 555 55 55
  const formatPhoneDisplay = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 8) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    setFormData({...formData, phone: digitsOnly});
    setDisplayPhone(formatPhoneDisplay(digitsOnly));
  };

  useEffect(() => {
    // Load the GoHighLevel form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Listen for form submission success from iframe
    const handleMessage = (event: MessageEvent) => {
      console.log('PostMessage received:', event.data);

      if (event.data) {
        const data = event.data;
        const dataStr = JSON.stringify(data).toLowerCase();

        // Check if message contains success-related keywords
        if (
          dataStr.includes('success') ||
          dataStr.includes('submit') ||
          dataStr.includes('thank') ||
          dataStr.includes('complete') ||
          data.type === 'hsFormCallback' ||
          data.type === 'form-submitted' ||
          data.success === true
        ) {
          console.log('Form submission detected! Redirecting...');
          const params = new URLSearchParams({
            name: formData.firstName,
            email: formData.email
          });
          window.location.href = `/webinarkayit?${params.toString()}`;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      window.removeEventListener('message', handleMessage);
    };
  }, [formData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Form submission started with data:', formData);

    // Wait for iframe to be fully loaded
    if (!iframeLoaded) {
      console.log('Waiting for iframe to load...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    try {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) {
        console.error('Iframe not available');
        throw new Error('Iframe not available');
      }

      // Try to access iframe and fill form fields
      try {
        const iframeDoc = iframe.contentWindow.document;
        console.log('Successfully accessed iframe document');

        // Find form inputs with multiple selectors
        const firstNameInput = iframeDoc.querySelector('input[name="firstName"], input[name="first_name"], input[id*="first"], input[placeholder*="First"], input[placeholder*="İsim"], input[placeholder*="isim"]') as HTMLInputElement;
        const lastNameInput = iframeDoc.querySelector('input[name="lastName"], input[name="last_name"], input[id*="last"], input[placeholder*="Last"], input[placeholder*="Soyisim"], input[placeholder*="soyisim"]') as HTMLInputElement;
        const emailInput = iframeDoc.querySelector('input[type="email"], input[name="email"], input[id*="email"]') as HTMLInputElement;
        const phoneInput = iframeDoc.querySelector('input[type="tel"], input[name="phone"], input[name="telefon"], input[id*="phone"], input[id*="tel"]') as HTMLInputElement;

        console.log('Found inputs:', {
          firstName: !!firstNameInput,
          lastName: !!lastNameInput,
          email: !!emailInput,
          phone: !!phoneInput
        });

        // Fill and trigger input events for each field
        if (firstNameInput) {
          firstNameInput.value = formData.firstName;
          firstNameInput.dispatchEvent(new Event('input', { bubbles: true }));
          firstNameInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('Filled firstName:', formData.firstName);
        }

        if (lastNameInput) {
          lastNameInput.value = formData.lastName;
          lastNameInput.dispatchEvent(new Event('input', { bubbles: true }));
          lastNameInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('Filled lastName:', formData.lastName);
        }

        if (emailInput) {
          emailInput.value = formData.email;
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));
          emailInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('Filled email:', formData.email);
        }

        if (phoneInput) {
          phoneInput.value = formData.phone; // Raw digits only
          phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
          phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('Filled phone:', formData.phone);
        }

        // Wait a moment for the form to process the values
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find and click submit button
        const submitBtn = iframeDoc.querySelector('button[type="submit"], input[type="submit"], button[class*="submit"], button[class*="btn"]') as HTMLButtonElement;

        if (submitBtn) {
          console.log('Found submit button, clicking...');
          submitBtn.click();
          console.log('Submit button clicked successfully');
        } else {
          console.error('Submit button not found in iframe');
          throw new Error('Submit button not found');
        }

      } catch (crossOriginError) {
        // Cross-origin restriction - this is expected for GoHighLevel forms
        console.log('Cross-origin restriction detected:', crossOriginError);
        console.log('Attempting postMessage communication...');

        // Try postMessage approach
        iframe.contentWindow.postMessage({
          type: 'ghl-form-submit',
          formData: formData
        }, '*');

        console.log('PostMessage sent to iframe');

        // Wait for potential success message, then redirect
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Redirecting to success page...');
        const params = new URLSearchParams({
          name: formData.firstName,
          email: formData.email
        });
        window.location.href = `/webinarkayit?${params.toString()}`;
      }

    } catch (error) {
      console.error('Form submission error:', error);
      // Always redirect to success page as fallback
      const params = new URLSearchParams({
        name: formData.firstName,
        email: formData.email
      });
      window.location.href = `/webinarkayit?${params.toString()}`;
    }
  };

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

          {/* Bonus Info */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 max-w-3xl mx-auto mb-8">
            <div className="text-4xl mb-3">🎁</div>
            <div className="text-white font-bold text-2xl mb-2">500$ Değerinde Bonus Paket</div>
            <div className="text-accent font-bold text-xl mb-3">YAPAY ZEKA BAŞLANGIÇ PAKETİ</div>
            <div className="text-white/90 font-semibold text-lg">Kayıt Olana Hediye</div>
          </div>
        </div>

        {/* Hidden GoHighLevel iframe - for actual submission */}
        <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
          <iframe
            ref={iframeRef}
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
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Form Container - Custom UI */}
        <div className="card-glass p-8 md:p-12">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-white font-semibold mb-2">
                İsim *
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="İsminiz"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-white font-semibold mb-2">
                Soyisim *
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="Soyisminiz"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                E-posta *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Lütfen geçerli bir e-posta adresi girin (örn: ornek@gmail.com)"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white font-semibold mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={displayPhone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="5XX XXX XX XX"
                pattern="[0-9\s]{13}"
                title="Lütfen geçerli bir telefon numarası girin (10 rakam)"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full text-lg py-4 shadow-glow-strong hover:shadow-glow-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Kaydediliyor...' : 'Ücretsiz Kayıt Ol →'}
            </button>
          </form>

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
