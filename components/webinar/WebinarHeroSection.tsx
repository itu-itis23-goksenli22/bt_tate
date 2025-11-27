"use client";

export default function WebinarHeroSection() {
  const scrollToForm = () => {
    document.getElementById('webinar-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-48 pb-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-light" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-block bg-accent/20 border border-accent text-accent px-6 py-2 rounded-full text-sm md:text-base font-bold uppercase tracking-wider animate-pulse">
            🎓 100% ÜCRETSİZ WEBİNAR
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white block">Yapay Zeka ile</span>
          <span className="text-accent block mt-2">Para Kazanmayı Öğrenin</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
          AI otomasyonu, freelancing ve e-ticaret ile sıfırdan gelir elde etmenin sırlarını öğrenin
        </p>

        {/* Value props */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12">
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm md:text-base font-semibold">Canlı Eğitim</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm md:text-base font-semibold">Pratik Stratejiler</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm md:text-base font-semibold">Soru-Cevap</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <button
            onClick={scrollToForm}
            className="btn-accent text-lg px-12 py-5 shadow-glow-strong hover:shadow-glow-hover text-xl font-bold uppercase"
          >
            ÜCRETSİZ YERİMİ AYIRT
          </button>
          <p className="text-white/60 text-sm mt-4">💳 Kredi kartı gerektirmez</p>
        </div>

        {/* YouTube Video */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-primary-light/50 rounded-3xl overflow-hidden border border-accent/30 shadow-glow-strong">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/qQbl1YPaI7k?start=335"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 flex items-center justify-center gap-8 md:gap-12 flex-wrap">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">5,000+</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Katılımcı</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/20"></div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">90 Dakika</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Canlı Eğitim</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/20"></div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">100%</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Ücretsiz</div>
          </div>
        </div>
      </div>
    </section>
  );
}
