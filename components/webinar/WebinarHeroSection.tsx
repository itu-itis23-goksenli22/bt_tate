"use client";

export default function WebinarHeroSection() {
  const scrollToForm = () => {
    document.getElementById('webinar-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-48 pb-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-light" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8">
          <span className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-full text-base md:text-xl font-black uppercase tracking-wider animate-pulse shadow-2xl">
            🔥 SADECE 47 KİŞİLİK KONTENJAN KALDI! 🔥
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
          <span className="text-white block">YAPAY ZEKA İLE</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-400 to-accent block mt-3 animate-pulse">
            İLK 10,000$'INIZI KAZANIN!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-4xl text-white font-bold mb-4 max-w-4xl mx-auto">
          2025'te Ev Konforundan 6 Haneli Gelire Ulaşmanın
        </p>
        <p className="text-xl md:text-3xl text-accent font-bold mb-10 max-w-4xl mx-auto">
          GIZLI FORMÜLÜ! 🚀
        </p>

        {/* Value props */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-14">
          <div className="flex items-center gap-3 bg-accent/20 border-2 border-accent px-6 py-4 rounded-full">
            <span className="text-3xl">⚡</span>
            <span className="text-base md:text-xl font-bold text-white">CANLI EĞİTİM</span>
          </div>
          <div className="flex items-center gap-3 bg-accent/20 border-2 border-accent px-6 py-4 rounded-full">
            <span className="text-3xl">💰</span>
            <span className="text-base md:text-xl font-bold text-white">KANIT SONUÇLAR</span>
          </div>
          <div className="flex items-center gap-3 bg-accent/20 border-2 border-accent px-6 py-4 rounded-full">
            <span className="text-3xl">🎁</span>
            <span className="text-base md:text-xl font-bold text-white">500$ BONUS</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <button
            onClick={scrollToForm}
            className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 text-white text-2xl md:text-3xl font-black uppercase px-16 py-8 rounded-2xl shadow-2xl hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105 animate-pulse"
          >
            🎯 HEMEN YERİMİ KAPTIR! 🎯
          </button>
          <p className="text-white/80 text-lg md:text-xl font-bold mt-6">
            ⚠️ SON 2 SAATTE 23 KİŞİ KAYIT OLDU!
          </p>
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
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
            <div className="text-5xl md:text-6xl font-black text-accent mb-3">15,000+</div>
            <div className="text-lg md:text-xl text-white font-bold uppercase">BAŞARILI ÖĞRENCK</div>
            <div className="text-sm text-white/60 mt-2">💰 Ortalama $5K/ay kazanıyor</div>
          </div>
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
            <div className="text-5xl md:text-6xl font-black text-accent mb-3">120 DK</div>
            <div className="text-lg md:text-xl text-white font-bold uppercase">CANLI EĞİTİM</div>
            <div className="text-sm text-white/60 mt-2">🎓 Soru-cevap + bonus içerik</div>
          </div>
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
            <div className="text-5xl md:text-6xl font-black text-accent mb-3">$0</div>
            <div className="text-lg md:text-xl text-white font-bold uppercase">100% ÜCRETSİZ</div>
            <div className="text-sm text-white/60 mt-2">💳 Kredi kartı gerektirmez</div>
          </div>
        </div>
      </div>
    </section>
  );
}
