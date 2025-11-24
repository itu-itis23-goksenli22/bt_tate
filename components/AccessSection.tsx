export default function AccessSection() {
  const features = [
    {
      title: "STEP-BY-STEP KAMPANYALAR",
      items: [
        "Tüm modüllerde adım adım eğitim videoları",
        "Gerçek dünya örnekleri ve uygulamalı projeler",
        "İndirilebilir kaynaklar ve şablonlar",
        "Haftalık canlı eğitim seansları",
      ],
    },
    {
      title: "GERÇEK ZAMANLI YARDIM VE DESTEK",
      items: [
        "7/24 Discord topluluk desteği",
        "Uzman mentorlarla birebir görüşmeler",
        "Hızlı yanıt garantisi",
        "Özel danışmanlık hizmeti",
      ],
    },
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            ERİŞECEĞİNİZ <span className="text-gold">HİZMETLER</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Platformumuza katıldığınızda size sunulacak tüm kaynaklar ve destekler
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card-glass">
              {/* Image placeholder */}
              <div className="relative aspect-video bg-primary rounded-lg overflow-hidden mb-6 border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/50">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white/40 text-sm">Görsel placeholder</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gold mb-6 uppercase tracking-wide">
                {feature.title}
              </h3>
              <ul className="space-y-4">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg className="w-6 h-6 text-gold mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Video Kütüphanesi", desc: "1000+ eğitim videosu" },
            { title: "Canlı Webinarlar", desc: "Haftalık canlı oturumlar" },
            { title: "Özel Topluluk", desc: "200K+ aktif üye" },
            { title: "Sertifikalar", desc: "Tamamlama sertifikaları" },
          ].map((item, index) => (
            <div key={index} className="bg-primary-light/30 border border-white/5 rounded-lg p-6 text-center hover:border-gold/30 transition-all">
              <div className="w-12 h-12 bg-gold/10 rounded-full mx-auto mb-4 flex items-center justify-center border border-gold/30">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-white/40 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="btn-gold">
            Hemen Erişim Sağla
          </button>
        </div>
      </div>
    </section>
  );
}
