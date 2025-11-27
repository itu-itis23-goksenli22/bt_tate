import { CHECKOUT_URL, trackCheckout } from "@/lib/constants";

export default function TwoPathsSection() {
  return (
    <section className="py-12 px-4 bg-primary relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light to-primary opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            ÖNÜNÜZDE <span className="text-accent">İKİ YOL VAR</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Hangisini seçeceğinize siz karar verin
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Path 1 - Without */}
          <div className="card-glass border-2 border-red-500/30 hover:border-red-500/50 transition-all">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full mb-4">
                <span className="text-red-400 font-bold uppercase text-sm">Eski Yol</span>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="relative aspect-video bg-primary-dark rounded-lg overflow-hidden mb-6 border border-red-500/20">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-primary-dark">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/50">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-white/40 text-sm">Görsel placeholder</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">
              Maaş Köleliği
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-white/70">9-5 iş hayatı ve sınırlı özgürlük</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-white/70">Sabit ve düşük gelir</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-white/70">Gelecek belirsizliği ve stres</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-white/70">Hayallerinizi ertelemek</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-white/70">Başkasının hayallerini yaşamak</span>
              </li>
            </ul>
          </div>

          {/* Path 2 - With */}
          <div className="card-glass border-2 border-accent/50 hover:border-accent transition-all">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-accent/20 border border-accent rounded-full mb-4">
                <span className="text-accent font-bold uppercase text-sm">Gerçek Dünya</span>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="relative aspect-video bg-primary-dark rounded-lg overflow-hidden mb-6 border border-accent/20">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary-dark">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-accent/20 rounded-lg flex items-center justify-center border border-accent">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white/40 text-sm">Görsel placeholder</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-accent mb-6 text-center">
              Finansal Özgürlük
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Tam kontrol ve özgürlük</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Sınırsız gelir potansiyeli</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Güvenli ve parlak gelecek</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Hayallerinizi gerçekleştirin</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">Kendi hayatınızın patronu olun</span>
              </li>
            </ul>

            <div className="mt-8">
              <a href={CHECKOUT_URL} onClick={trackCheckout} target="_blank" rel="noopener noreferrer" className="block">
                <button className="btn-accent w-full">
                  Bu Yolu Seçin
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-2xl text-white/70 mb-4">
            <span className="text-white font-bold">Seçim sizin.</span> Ama unutmayın, bugün seçim yapmazsanız,
            <span className="text-accent font-bold"> yarın için çok geç olabilir.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
