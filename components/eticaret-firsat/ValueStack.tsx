"use client";

const mainFeatures = [
  { name: "E-Commerce & Amazon FBA Eğitimi (6 Modül)", value: "₺6,000" },
  { name: "Shopify Dropshipping Eğitimi (7 Modül)", value: "₺5,000" },
  { name: "ETSY Mağaza Kurulum Eğitimi (9 Modül)", value: "₺4,500" },
  { name: "AI ile E-Ticaret Otomasyonu", value: "₺4,000" },
  { name: "Ads Stratejisi Eğitimi", value: "₺3,500" },
  { name: "Canlı Topluluk & Mentörlük", value: "₺5,000" },
];

const campuses = [
  { icon: "📦", name: "E-Commerce & Amazon FBA", modules: 6, lessons: "50+" },
  { icon: "🏪", name: "Shopify Dropshipping", modules: 7, lessons: "40+" },
  { icon: "🛍️", name: "ETSY", modules: 9, lessons: "45+" },
  { icon: "🤖", name: "N8N ile Yapay Zeka", modules: 11, lessons: "100+" },
  { icon: "₿", name: "Kripto Para Yatırımı", modules: 11, lessons: "50+" },
];

const bonuses = [
  "E-Ticaret Ürün Araştırma Rehberi",
  "Shopify Mağaza Kurulum Şablonları",
  "Amazon FBA Başlangıç Kiti",
  "AI ile Ürün Açıklaması Yazma Rehberi",
  "E-Ticaret Sosyal Medya Takvimi",
  "Hazır N8N Workflow Şablonları",
  "TikTok & Instagram Ads Stratejileri",
  "Haftalık Canlı Q&A",
  "Özel Discord/Slack Kanalı",
  "Tedarikçi Listesi (50+ Kaynak)",
];

export default function EticaretValueStack() {
  return (
    <div className="flex flex-col items-center">
      {/* Product mockup images */}
      <div className="relative w-full max-w-md mx-auto mb-6">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-3 text-center border border-blue-700/30">
            <div className="text-gold text-[10px] font-bold mb-1">📦</div>
            <p className="text-white text-[9px] font-bold leading-tight">E-Commerce<br/>&<br/>Amazon FBA</p>
            <p className="text-gold text-[8px] mt-1">6 Modül</p>
          </div>
          <div className="bg-gradient-to-br from-gold-dark to-gold rounded-lg p-3 text-center border border-gold/30 transform scale-105">
            <div className="text-black text-[10px] font-bold mb-1">🚀</div>
            <p className="text-black text-[9px] font-bold leading-tight">DİJİTAL<br/>AKADEMİ<br/>E-TİCARET</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-3 text-center border border-blue-700/30">
            <div className="text-gold text-[10px] font-bold mb-1">🏪</div>
            <p className="text-white text-[9px] font-bold leading-tight">Shopify<br/>Dropshipping</p>
            <p className="text-gold text-[8px] mt-1">7 Modül</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-2 text-center border border-blue-700/30">
            <p className="text-white text-[8px] font-bold">ETSY<br/>Mağaza Kurulum</p>
          </div>
          <div className="col-span-1" />
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-2 text-center border border-blue-700/30">
            <p className="text-white text-[8px] font-bold">AI E-Ticaret<br/>Otomasyonu</p>
          </div>
        </div>
      </div>

      {/* Pricing display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-danger/90 rounded-lg px-6 py-2 mb-2">
          <span className="text-white font-bold text-3xl md:text-5xl line-through decoration-2">
            ₺37,000
          </span>
        </div>
        <h3 className="text-white font-bold text-3xl md:text-4xl mt-2">
          SADECE <span className="text-gold">₺9,900!</span>
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
