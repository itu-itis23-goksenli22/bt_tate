export default function HeroSection() {
  return (
    <section className="relative pt-6 pb-8 px-4">
      {/* Trustpilot-style badge */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center gap-1 bg-[#00B67A] px-3 py-1 rounded">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="text-white/80 text-sm font-medium">
          4.9/5 &bull; 500+ Olumlu Değerlendirme
        </span>
      </div>

      {/* Main headline */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-4">
          <span className="text-gold text-lg md:text-xl font-semibold tracking-wide uppercase">
            %100 Ücretsiz Canlı Etkinlik
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
          E-Ticaret ile{" "}
          <span className="zk-text-gold-gradient">Online Para Kazanmanın</span>{" "}
          Kanıtlanmış Sistemini Öğrenin...{" "}
          <em className="not-italic zk-text-gold-gradient">
            İlk 10,000$&apos;ınızı
          </em>{" "}
          Kazanın
        </h1>

        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Stok yok. Depo yok. Teknik bilgi gerekmiyor. Sadece siz, e-ticaret
          ve kanıtlanmış bir sistem.
        </p>

        {/* YouTube Video */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
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
      </div>
    </section>
  );
}
