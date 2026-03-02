"use client";

export default function WebinarHeroSection() {
  const scrollToForm = () => {
    document.getElementById('webinar-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="relative md:min-h-screen flex items-center justify-center pt-32 pb-8 md:pt-48 md:pb-20 px-2 md:px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-light" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Program name */}
        <div className="mb-2 md:mb-4">
          <p className="text-accent text-xs md:text-base uppercase tracking-widest font-semibold">
            ÜCRETSIZ WEBINAR - TRENİ KAÇIRMAYIN
          </p>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-12 leading-tight">
          <span className="text-white block">Yapay Zeka ile İlk</span>
          <span className="text-accent block mt-2">10,000$ Kazanın</span>
        </h1>

        {/* YouTube Video */}
        <div className="max-w-5xl mx-auto mb-4 md:mb-8">
          <div className="relative aspect-video bg-primary-light/50 rounded-2xl md:rounded-3xl overflow-hidden border border-accent/30 shadow-glow-strong">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/qQbl1YPaI7k?start=335"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Video caption overlay - pointer-events-none to allow video controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 pointer-events-none">
              <p className="text-white/80 text-sm uppercase tracking-wider">CANLI EĞİTİM & SORU-CEVAP</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-6 md:mb-16">
          <button
            onClick={scrollToForm}
            className="btn-primary text-lg px-12 py-4 shadow-glow-strong hover:shadow-glow-hover"
          >
            Ücretsiz Kayıt Ol →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:flex md:items-center md:justify-center md:gap-8 max-w-lg md:max-w-none mx-auto">
          {/* Live Training */}
          <div className="flex flex-col md:flex-row items-center md:space-x-3 px-3 py-3 md:px-6 bg-accent/10 rounded-2xl md:rounded-full border border-accent/20">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/20 flex items-center justify-center mb-1 md:mb-0">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">60 Dakika</p>
              <p className="text-white font-semibold text-xs md:text-base">Canlı Eğitim</p>
            </div>
          </div>

          {/* Free */}
          <div className="flex flex-col md:flex-row items-center md:space-x-3 px-3 py-3 md:px-6 bg-accent/10 rounded-2xl md:rounded-full border border-accent/20">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/20 flex items-center justify-center mb-1 md:mb-0">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">%100</p>
              <p className="text-white font-semibold text-xs md:text-base">Ücretsiz</p>
            </div>
          </div>

          {/* Bonus */}
          <div className="flex flex-col md:flex-row items-center md:space-x-3 px-3 py-3 md:px-6 bg-accent/10 rounded-2xl md:rounded-full border border-accent/20">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/20 flex items-center justify-center mb-1 md:mb-0">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">$500 Değer</p>
              <p className="text-white font-semibold text-xs md:text-base">Bonus Paket</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
