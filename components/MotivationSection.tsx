export default function MotivationSection() {
  return (
    <section className="py-12 px-4 bg-primary relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative aspect-square bg-primary-light rounded-xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-light to-primary">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/50">
                  <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm">Motivasyon görseli</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/20 border border-gold/50 rounded-full mb-4">
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                Soru kendinize
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              ÇALIŞMAYA <span className="text-gold">HAZIR MISINIZ?</span>
            </h2>

            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Başarı kolay değildir. Disiplin, azim ve çok çalışma gerektirir.
              Gerçek Dünya size araçları verir, ama onları kullanmak size kalmış.
            </p>

            <div className="bg-primary-light/50 border border-gold/20 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold text-gold">Ne Bekleniyor?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">→</span>
                  <span className="text-white/70">Günde en az 2-3 saat öğrenme ve uygulama</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">→</span>
                  <span className="text-white/70">%100 sorumluluk almak ve bahaneleri bırakmak</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">→</span>
                  <span className="text-white/70">Konfor alanınızdan çıkmak ve riskler almak</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">→</span>
                  <span className="text-white/70">Başarısızlıklardan ders çıkarmak ve devam etmek</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold p-6">
              <p className="text-white text-lg italic">
                "Rahat bir hayat zayıf erkekler yaratır. Zayıf erkekler zor zamanlar yaratır.
                Zor zamanlar güçlü erkekler yaratır. Güçlü erkekler rahat zamanlar yaratır."
              </p>
              <p className="text-gold mt-2 font-bold">- Andrew Tate</p>
            </div>

            <button className="btn-gold text-lg px-10 py-4">
              Evet, Hazırım!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
