import { CHECKOUT_URL } from "@/lib/constants";

export default function PricingSection() {
  const packageInfo = {
    name: "AI SCALE Üyeliği",
    subtitle: "AI ile finansal özgürlüğe giden yolunuz",
    price: "$39",
    period: "/ay",
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
      "Sertifika programları",
      "Ömür boyu güncellemeler",
      "14 gün para iade garantisi",
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
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-2xl p-8 md:p-10 transition-all duration-300 bg-gradient-to-b from-accent/10 to-primary-light border-2 border-accent shadow-2xl shadow-glow">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-accent to-accent-dark px-6 py-2 rounded-full shadow-lg shadow-glow">
                <span className="text-white font-bold text-sm uppercase">En Popüler</span>
              </div>
            </div>

            {/* Package header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-accent-light">
                {packageInfo.name}
              </h3>
              <p className="text-white/40 text-sm mb-6">{packageInfo.subtitle}</p>
              <div className="flex items-end justify-center mb-2">
                <span className="text-4xl md:text-5xl font-bold text-accent-light">
                  {packageInfo.price}
                </span>
                <span className="text-white/40 text-xl mb-1 ml-1">{packageInfo.period}</span>
              </div>
              <p className="text-white/30 text-sm">İstediğiniz zaman iptal edin</p>
            </div>

            {/* Features list */}
            <ul className="space-y-3 mb-8 grid md:grid-cols-2 gap-x-4">
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

            {/* CTA Button */}
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block">
              <button className="w-full py-4 rounded-lg font-bold uppercase text-sm tracking-wider transition-all duration-300 transform hover:scale-105 bg-accent hover:bg-accent-light text-black shadow-lg shadow-accent/30">
                Şimdi Başla
              </button>
            </a>

            {/* Money back guarantee */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center text-accent-light text-sm">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                14 Gün Para İade Garantisi
              </div>
            </div>
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
