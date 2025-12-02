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
        {/* Program name */}
        <div className="mb-4">
          <p className="text-accent text-sm md:text-base uppercase tracking-widest font-semibold">
            ÜCRETSIZ WEBINAR - TRENİ KAÇIRMAYIN
          </p>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 leading-tight">
          <span className="text-white block">Yapay Zeka ile İlk</span>
          <span className="text-accent block mt-2">10,000$ Kazanın</span>
        </h1>

        {/* YouTube Video */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="relative aspect-video bg-primary-light/50 rounded-3xl overflow-hidden border border-accent/30 shadow-glow-strong">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/qQbl1YPaI7k?start=335"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Video caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
              <p className="text-white/80 text-sm uppercase tracking-wider">CANLI EĞİTİM & SORU-CEVAP</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <button
            onClick={scrollToForm}
            className="btn-primary text-lg px-12 py-4 shadow-glow-strong hover:shadow-glow-hover"
          >
            Ücretsiz Kayıt Ol →
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {/* Live Training */}
          <div className="flex items-center space-x-3 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider">60 Dakika</p>
              <p className="text-white font-semibold">Canlı Eğitim</p>
            </div>
          </div>

          <svg className="w-6 h-6 text-accent hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* Free */}
          <div className="flex items-center space-x-3 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider">%100</p>
              <p className="text-white font-semibold">Ücretsiz</p>
            </div>
          </div>

          <svg className="w-6 h-6 text-accent hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* Bonus */}
          <div className="flex items-center space-x-3 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider">$500 Değer</p>
              <p className="text-white font-semibold">Bonus Paket</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
