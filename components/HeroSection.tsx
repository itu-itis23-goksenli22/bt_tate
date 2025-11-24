"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HeroSection() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.5 });

  const students = useCountUp({ end: 10000, duration: 2000, enabled: statsVisible });
  const modules = useCountUp({ end: 6, duration: 1500, enabled: statsVisible });
  const support = "24/7";
  const success = useCountUp({ end: 100, duration: 2000, suffix: "%", enabled: statsVisible });

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/50 to-primary opacity-50" />

      <div className="relative z-10 container-custom text-center">
        {/* Small badge */}
        <div className="inline-block mb-6 px-6 py-2 bg-accent/10 border border-accent/40 rounded-full shadow-glow">
          <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">
            10,000+ Öğrenci Katıldı
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-bold mb-6 leading-tight">
          <span className="text-white block">AI SCALE</span>
          <span className="text-accent block mt-3 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">SİSTEM KURAN, SINIRLARI KALDIRIR</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
          Para kazanmanın gerçek yollarını öğren. Matrix'ten kaç.
        </p>

        {/* YouTube Video Embed */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="relative aspect-video bg-primary-light rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl shadow-glow">
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
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent-light mb-2 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">{students}+</div>
            <div className="text-white/40 text-sm uppercase tracking-wide">Öğrenci</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent-light mb-2 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">{modules}+</div>
            <div className="text-white/40 text-sm uppercase tracking-wide">Modül</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent-light mb-2 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">{support}</div>
            <div className="text-white/40 text-sm uppercase tracking-wide">Destek</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">{success}</div>
            <div className="text-white/40 text-sm uppercase tracking-wide">Başarı</div>
          </div>
        </div>
      </div>
    </section>
  );
}
