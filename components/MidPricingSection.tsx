"use client";

import { CHECKOUT_URL, trackCheckout } from "@/lib/constants";

export default function MidPricingSection() {
  const packageInfo = {
    name: "FETIH PLANI",
    subtitle: "Elit Eğitim",
    price: "₺9,000",
    originalPrice: "₺30,000",
    features: [
      "6 Para Kazandıran Beceri Modülü",
      "Sınırsız video kütüphanesi erişimi",
      "Canlı grup eğitimleri",
      "7/24 topluluk desteği",
      "Hizmetler pazarı erişimi",
      "Haftalık canlı webinarlar",
      "Özel eğitim materyalleri",
      "Networking etkinlikleri",
      "İlerleme takip sistemi",
    ],
  };

  return (
    <section id="paketler" className="py-12 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="section-title">
            ÜYELİK <span className="text-accent-light">PAKETİ</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Başarıya giden yolculuğunuza bugün başlayın
          </p>
        </div>

        {/* Single Pricing Card */}
        <div id="pricing-card" className="max-w-2xl mx-auto">
          <div className="relative rounded-2xl p-8 md:p-10 transition-all duration-300 bg-gradient-to-b from-accent/10 to-primary-light border-2 border-accent shadow-2xl shadow-glow">
            {/* Package header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                {packageInfo.name}
              </h3>
              <p className="text-white/60 text-sm mb-6">{packageInfo.subtitle}</p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-2xl text-white/40 line-through">
                  {packageInfo.originalPrice}
                </span>
                <span className="text-4xl md:text-5xl font-bold text-accent-light">
                  {packageInfo.price}
                </span>
              </div>
              <p className="text-white/40 text-sm mb-2">Tam finansal özgürlük sistemi</p>
            </div>

            {/* Features list */}
            <ul className="mb-8 grid md:grid-cols-2 gap-4">
              {packageInfo.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-accent-light mr-2 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white/70 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Gift Notification Badge */}
            <div className="mb-4 relative">
              <div className="bg-gradient-to-r from-gold via-gold-light to-gold p-0.5 rounded-lg">
                <div className="bg-primary-dark rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4zm10 15H4v-2h16v2zm0-5H4V9h5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2h5v5z"/>
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-gold font-bold text-xs uppercase tracking-wide">Özel Hediye</p>
                      <p className="text-white text-sm font-semibold">5,000$ Değerinde AI Başlangıç Paketi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              onClick={trackCheckout}
            >
              <button className="btn-primary w-full text-lg py-4 shadow-glow-strong hover:shadow-glow-hover">
                HEMEN BAŞLA →
              </button>
            </a>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-white/40 text-sm">
            Tüm ödemeler güvenli bir şekilde işlenir. 256-bit SSL şifreleme ile korunur.
          </p>
        </div>
      </div>
    </section>
  );
}
