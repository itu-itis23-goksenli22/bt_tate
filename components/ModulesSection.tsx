"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ModulesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const modules = [
    {
      title: "E-Commerce Mastery",
      description: "Online mağaza kur, günde $1000+ sat",
      icon: "🛒",
    },
    {
      title: "Copywriting",
      description: "Kelimelerle para kazan. Her sektörde geçerli.",
      icon: "✍️",
    },
    {
      title: "Freelancing",
      description: "Dijital becerilerini sat, dünyadan müşteri bul",
      icon: "💼",
    },
    {
      title: "Amazon FBA",
      description: "Amazon'un altyapısını kullan, ürün sat",
      icon: "📦",
    },
    {
      title: "Crypto Trading",
      description: "Dijital para ile zengin ol",
      icon: "₿",
    },
    {
      title: "Content Creation",
      description: "Sosyal medyadan para kazan, marka ol",
      icon: "📱",
    },
  ];

  return (
    <section id="moduller" className="py-12 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gold/20 border border-accent/50 rounded-full mb-6">
            <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">
              Para Kazanma Yolları
            </span>
          </div>
          <h2 className="section-title">
            6 YÜKSEK GELİRLİ <span className="text-accent-light">BECERİ</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Birini seç. Uygula. Zengin ol.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`card-glass group hover:scale-105 hover:shadow-xl hover:shadow-gold/10 cursor-pointer scroll-animate ${
                isVisible ? "visible animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image placeholder */}
              <div className="relative aspect-video bg-primary rounded-lg overflow-hidden mb-4 border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark group-hover:from-gold/20 group-hover:to-primary transition-all">
                  <div className="text-5xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    {module.icon}
                  </div>
                </div>
              </div>

              {/* Module info */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-light transition-colors">
                {module.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {module.description}
              </p>

              {/* Module badge */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/30">20+ Ders</span>
                  <span className="text-accent-light">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="bg-primary-light/50 border border-accent/20 rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Hepsine <span className="text-accent-light">Sınırsız Erişim</span>
          </h3>
          <p className="text-white/70">
            6 yüksek gelirli beceri. Tek üyelik. Birden fazla gelir kaynağı oluştur.
          </p>
        </div>
      </div>
    </section>
  );
}
