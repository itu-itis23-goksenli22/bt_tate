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
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-wider mb-3 font-bold">WEBİNARDA ÖĞRENECEKLERİNİZ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            90 Dakikada <span className="text-accent">Kariyerinizi Değiştirin</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Binlerce kişinin hayatını değiştiren stratejileri ücretsiz öğrenin
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-glass p-6 hover:border-accent/40 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {benefit.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="btn-accent text-lg px-12 py-5 shadow-glow-strong hover:shadow-glow-hover"
          >
            ÜCRETSİZ SEMINERE KATIL
          </button>
        </div>
      </div>
    </section>
  );
}
