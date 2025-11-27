"use client";

export default function WebinarBenefitsSection() {
  const scrollToForm = () => {
    document.getElementById('webinar-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const benefits = [
    {
      icon: "🤖",
      title: "AI Otomasyonu",
      description: "ChatGPT, Midjourney ve diğer AI araçlarıyla gelir elde etmeyi öğrenin"
    },
    {
      icon: "💰",
      title: "Freelance Stratejiler",
      description: "Upwork ve Fiverr'da ilk müşterinizi bulmanın kanıtlanmış yöntemleri"
    },
    {
      icon: "🛒",
      title: "E-Ticaret Sırları",
      description: "Shopify ve Etsy ile kârlı online mağazalar kurmanın püf noktaları"
    },
    {
      icon: "📈",
      title: "Sosyal Medya Büyüme",
      description: "Instagram, TikTok ve YouTube'da organik olarak büyüme teknikleri"
    },
    {
      icon: "✍️",
      title: "Copywriting Temelleri",
      description: "Satış yapan içerikler yazmanın ve müşteri kazanmanın yolları"
    },
    {
      icon: "🎯",
      title: "İlk 1000$ Yol Haritası",
      description: "İlk gelirinizi elde etmek için adım adım aksiyon planı"
    }
  ];

  return (
    <section className="py-20 px-4 bg-primary-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-full text-base md:text-xl font-black uppercase mb-8 animate-pulse">
            ⚡ BU SEMİNERDE SADECE BUNLARI ÖĞRENMEYECEKSİNİZ! ⚡
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            120 DAKİKADA <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-400 to-accent">
              HAYATINIZ DEĞİŞECEK!
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 font-bold max-w-4xl mx-auto">
            🚀 2025'in EN ETKİLİ Para Kazanma Stratejileri 🚀
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-accent/10 to-primary border-2 border-accent/30 hover:border-accent rounded-2xl p-8 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 group transform hover:scale-105"
            >
              <div className="text-6xl md:text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-accent transition-colors">
                {benefit.title}
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary via-accent/10 to-primary border-2 border-accent rounded-3xl p-12">
          <p className="text-2xl md:text-3xl text-white font-bold mb-6">
            ⚠️ KONTENJAN HIZLA DOLMAKTA! ⚠️
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 text-white text-2xl md:text-3xl font-black uppercase px-16 py-8 rounded-2xl shadow-2xl hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105 mb-4"
          >
            🔥 SON FRSATI KAÇIRMA! 🔥
          </button>
          <p className="text-white/70 text-lg">💯 100% Ücretsiz • 💳 Kredi Kartı Gerektirmez</p>
        </div>
      </div>
    </section>
  );
}
