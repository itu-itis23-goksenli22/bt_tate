"use client";

import { useState, FormEvent } from "react";

export default function WebinarFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to GoHighLevel in background
      const ghlFormData = new FormData();
      ghlFormData.append('firstName', formData.firstName);
      ghlFormData.append('lastName', formData.lastName);
      ghlFormData.append('email', formData.email);
      ghlFormData.append('phone', formData.phone);

      // Submit to GoHighLevel (fire and forget)
      fetch('https://api.leadconnectorhq.com/widget/form/84Is6fx7guuS4EeNPxf2', {
        method: 'POST',
        body: ghlFormData,
        mode: 'no-cors'
      }).catch(err => console.log('GHL submission error (expected):', err));

      // Redirect immediately with user data
      const params = new URLSearchParams({
        name: formData.firstName,
        email: formData.email
      });
      window.location.href = `/webinarkayit?${params.toString()}`;
    } catch (error) {
      console.error('Form submission error:', error);
      // Still redirect even if there's an error
      window.location.href = `/webinarkayit?name=${formData.firstName}`;
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

        {/* Form Container */}
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
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="+90 5XX XXX XX XX"
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
