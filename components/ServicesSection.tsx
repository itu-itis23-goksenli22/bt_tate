export default function ServicesSection() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-primary to-primary-light">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            HİZMETLER <span className="text-gold">PAZARI</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Becerilerinizi paraya dönüştürün ve müşteriler bulun
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Becerilerinizi Satın ve Müşteriler Kazanın
            </h3>
            <p className="text-white/70 leading-relaxed">
              Gerçek Dünya Hizmetler Pazarı, öğrendiğiniz becerileri hemen para kazanmaya
              dönüştürmenize olanak tanır. Topluluk içinde müşteriler bulun, hizmetlerinizi
              sergileyin ve işinizi büyütün.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Hizmet profilinizi oluşturun ve öne çıkın</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Topluluk içinden müşteriler bulun</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Güvenli ödeme sistemi</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-gold mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Değerlendirme ve geri bildirim sistemi</span>
              </li>
            </ul>
            <button className="btn-gold mt-6">
              Hizmet Oluştur
            </button>
          </div>

          {/* Image placeholder */}
          <div className="relative aspect-square bg-primary rounded-xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/50">
                  <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm">Hizmetler Pazarı görseli</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
