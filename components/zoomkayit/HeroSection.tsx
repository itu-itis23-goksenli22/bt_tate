export default function HeroSection() {
  return (
    <section className="relative pt-6 pb-2 px-4">
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
            Sınırlı Kontenjan Canlı Etkinlik
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
          On Yılın{" "}
          <span className="zk-text-gold-gradient">En Büyük Fırsatı</span>{" "}
          Şu An Yaşanıyor —{" "}
          <em className="not-italic">Çoğu Kişinin Haberi Yok…</em>
        </h1>

        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-2">
          Pazar gecesi canlı yayında, AI ile basit işler yaparak nasıl tam
          zamanlı gelir kurabileceğini adım adım göstereceğim. Aşağıdan
          yerini ayır.
        </p>
      </div>
    </section>
  );
}
