export default function KickstartSection() {
  return (
    <section className="py-12 px-4 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/20 border border-gold/50 rounded-full mb-4">
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                Şimdi Başla
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              ÇEVRİMİÇİ YOLCULUĞUNUZA <span className="text-gold">HIZLI BAŞLANGIÇ</span>
            </h2>

            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Gelecek yıl nerede olacaksınız? Bugün attığınız adımlar yarının başarısını belirler.
              Gerçek Dünya ile finansal özgürlüğe giden yolda ilk adımı bugün atın.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/50 mr-4 flex-shrink-0">
                  <span className="text-gold font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Kayıt Olun</h4>
                  <p className="text-white/40 text-sm">Dakikalar içinde hesabınızı oluşturun ve platforma erişin</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/50 mr-4 flex-shrink-0">
                  <span className="text-gold font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Modülü Seçin</h4>
                  <p className="text-white/40 text-sm">Size en uygun para kazandıran beceriyi seçin</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/50 mr-4 flex-shrink-0">
                  <span className="text-gold font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Öğrenin ve Uygulayın</h4>
                  <p className="text-white/40 text-sm">Adım adım eğitimleri takip edin ve hemen uygulamaya başlayın</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/50 mr-4 flex-shrink-0">
                  <span className="text-gold font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Para Kazanmaya Başlayın</h4>
                  <p className="text-white/40 text-sm">Öğrendiğiniz becerileri kullanarak ilk gelirinizi elde edin</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button className="btn-gold text-lg px-10 py-4">
                Yolculuğumu Başlat
              </button>
              <p className="text-white/30 text-sm mt-3">
                30 gün para iade garantisi • İstediğiniz zaman iptal edin
              </p>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative aspect-square bg-primary-light rounded-xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-light to-primary">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gold/20 rounded-lg flex items-center justify-center border border-gold/50">
                  <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm">Başarı grafiği görseli</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
