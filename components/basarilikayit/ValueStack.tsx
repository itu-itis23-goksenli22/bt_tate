"use client";

interface MainFeature {
  name: string;
  value: string;
}

interface TopCard {
  icon: string;
  // Title satır satır (manuel break) — örn. ["AI Otomasyon", "Eğitim", "Programı"]
  titleLines: string[];
  sub?: string; // örn. "9 Modül"
  highlight?: boolean; // true → gold card (orta kart)
  blackText?: boolean; // highlight kartında siyah metin
}

const DEFAULT_MAIN_FEATURES: MainFeature[] = [
  { name: "AI Otomasyon Eğitim Programı (9 Modül)", value: "₺8,000" },
  { name: "N8N & API Entegrasyon Toolkit", value: "₺5,000" },
  { name: "Claude Code Masterclass", value: "₺4,000" },
  { name: "B2B Satış Stratejileri Eğitimi", value: "₺3,500" },
  { name: "Canlı Topluluk & Mentörlük", value: "₺6,000" },
  { name: "Ads Stratejisi Eğitimi", value: "₺3,500" },
];

const DEFAULT_TOP_CARDS: TopCard[] = [
  { icon: "🤖", titleLines: ["AI Otomasyon", "Eğitim", "Programı"], sub: "9 Modül" },
  {
    icon: "🚀",
    titleLines: ["AI SCALE", "APP", "COMMUNITY"],
    highlight: true,
    blackText: true,
  },
  { icon: "⚙️", titleLines: ["N8N &", "API", "Toolkit"], sub: "Sınırsız" },
];

const campuses = [
  { icon: "🤖", name: "N8N ile Yapay Zeka", modules: 11, lessons: "100+" },
  { icon: "📦", name: "E-Commerce & Amazon FBA", modules: 6, lessons: "50+" },
  { icon: "₿", name: "Kripto Para Yatırımı", modules: 11, lessons: "50+" },
  { icon: "🛍️", name: "ETSY", modules: 9, lessons: "45+" },
  { icon: "🏪", name: "Shopify Dropshipping", modules: 7, lessons: "40+" },
];

const bonuses = [
  "AI Prompt Kütüphanesi",
  "Hazır N8N Workflow Şablonları",
  "B2B Müşteri Edinme Rehberi",
  "SaaS Fiyatlandırma Stratejileri",
  "AI Chatbot Şablonları",
  "Setter Eğitimi",
  "Kaynak Kiti (50+ Araç)",
  "Haftalık Canlı Q&A",
  "Özel Discord/Slack Kanalı",
  "AI Ajans Kurulum Rehberi",
];

interface ValueStackProps {
  priceFormatted?: string;
  strikethroughPrice?: string;
  // Variant'lar için opsiyonel — default firsat content'i korunur
  mainFeatures?: MainFeature[];
  topCards?: TopCard[];
}

export default function ValueStack({
  priceFormatted = "15,000",
  strikethroughPrice = "42,000",
  mainFeatures = DEFAULT_MAIN_FEATURES,
  topCards = DEFAULT_TOP_CARDS,
}: ValueStackProps = {}) {
  return (
    <div className="flex flex-col items-center">
      {/* Product mockup images */}
      <div className="relative w-full max-w-md mx-auto mb-6">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {topCards.map((card, i) => (
            <div
              key={i}
              className={
                card.highlight
                  ? "bg-gradient-to-br from-gold-dark to-gold rounded-lg p-3 text-center border border-gold/30 transform scale-105"
                  : "bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-3 text-center border border-blue-700/30"
              }
            >
              <div
                className={
                  card.blackText
                    ? "text-black text-[10px] font-bold mb-1"
                    : "text-gold text-[10px] font-bold mb-1"
                }
              >
                {card.icon}
              </div>
              <p
                className={
                  card.blackText
                    ? "text-black text-[9px] font-bold leading-tight"
                    : "text-white text-[9px] font-bold leading-tight"
                }
              >
                {card.titleLines.map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < card.titleLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
              {card.sub && (
                <p
                  className={
                    card.blackText
                      ? "text-black/80 text-[8px] mt-1"
                      : "text-gold text-[8px] mt-1"
                  }
                >
                  {card.sub}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-2 text-center border border-blue-700/30">
            <p className="text-white text-[8px] font-bold">Claude Code<br/>Masterclass</p>
          </div>
          <div className="col-span-1" />
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-2 text-center border border-blue-700/30">
            <p className="text-white text-[8px] font-bold">B2B Satış<br/>Stratejileri</p>
          </div>
        </div>
      </div>

      {/* Pricing display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-danger/90 rounded-lg px-6 py-2 mb-2">
          <span className="text-white font-bold text-3xl md:text-5xl line-through decoration-2">
            ₺{strikethroughPrice}
          </span>
        </div>
        <h3 className="text-white font-bold text-3xl md:text-4xl mt-2">
          SADECE <span className="text-gold">₺{priceFormatted}!</span>
        </h3>
      </div>

      {/* Main features with green checkmarks */}
      <div className="w-full space-y-3 mb-8">
        {mainFeatures.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <svg className="w-6 h-6 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#22c55e"/>
              <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white text-sm md:text-base">
              {feature.name} <span className="text-gold font-semibold">({feature.value} Değerinde~)</span>
            </span>
          </div>
        ))}
      </div>

      {/* 5 Campus summary */}
      <div className="w-full mb-8">
        <p className="text-gold italic font-bold text-sm tracking-wide mb-4 text-center">
          5 KAMPÜS • 200+ DERS
        </p>
        <div className="space-y-2">
          {campuses.map((campus, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2.5 border border-white/10">
              <span className="text-xl flex-shrink-0">{campus.icon}</span>
              <span className="text-white text-sm font-medium flex-1">{campus.name}</span>
              <span className="text-gold text-xs font-semibold">{campus.modules} modül • {campus.lessons} ders</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bonus items with gift icons */}
      <div className="w-full space-y-3">
        {bonuses.map((bonus, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-gold text-lg flex-shrink-0">🎁</span>
            <span className="text-white text-sm md:text-base">
              <span className="font-bold">Bonus #{index + 1}:</span> {bonus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
