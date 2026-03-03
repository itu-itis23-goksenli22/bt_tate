"use client";

export default function HeaderBar() {
  return (
    <header className="relative bg-black py-6 md:py-8 overflow-hidden">
      {/* Sparkle background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide flex items-center justify-center gap-2 md:gap-3 mb-3">
          <span className="text-3xl md:text-4xl">🚀</span>
          AI SCALE APP COMMUNITY
        </h1>
        <p className="text-white/70 text-sm md:text-base">
          Sorularınız mı var? <span className="font-bold text-white">AI Otomasyon ile İşletmeleri Dönüştürün</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.8; transform: scale(1); }
        }
      `}</style>
    </header>
  );
}
