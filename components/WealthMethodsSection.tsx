"use client";

import { CHECKOUT_URL } from "@/lib/constants";

export default function WealthMethodsSection() {
  const methods = [
    {
      title: "AI Otomasyonlu Ajans",
      description: "Sınırlı teknik bilgiyle bile AI sistemleri kurmayı öğretiyoruz. Sistemi online şirketlere satın veya kendi AI'nız tarafından yönetilen bir online şirket kurun.",
      icon: "🤖",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Kripto Yatırım",
      description: "Kripto para kampüsünde gerçek zamanlı bilgiye, profesörlere ve 112,000+ öğrenciye erişim. Trendleri belirleyin ve coin fiyatlarını etkileyen faktörleri öğrenin.",
      icon: "₿",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "İçerik Üretimi",
      description: "Teknoloji çağında videoların ve landing page'lerin değeri gayrimenkulü aştı. Dijital varlıkları nasıl kullanacağınızı size öğreteceğiz.",
      icon: "🎬",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Copywriting",
      description: "Kelimeler sizin savaşçılarınız ve yazdığınız her harf bir strateji. Copywriting sanatında ustalaşın ve fikirleri kâra çevirin.",
      icon: "✍️",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Fitness",
      description: "Güçlü bir beden, güçlü bir zihin demektir. Gerçek Dünya Fitness kampüsü kişisel antrenörler ve yemek planları içerir. Sağlık zenginliktir.",
      icon: "💪",
      color: "from-red-500/20 to-rose-500/20"
    },
    {
      title: "İş Ustalığı",
      description: "Gerçek Dünya İş ustalığı ve diplomasi eğitimi liderlik, operasyonları ölçeklendirme, daha fazla para kazanma sanatı hakkında.",
      icon: "👔",
      color: "from-blue-500/20 to-cyan-500/20"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-wider mb-3">GERÇEK DÜNYA KAMPÜSLERI</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            10+ Zenginlik Yaratma Yöntemi
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            Finansal özgürlüğe giden yolunuzu seçin. Her kampüs milyoner profesörler tarafından adım adım rehberlik edilir.
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {methods.map((method, index) => (
            <div key={index} className="card-trw group cursor-pointer">
              {/* Video Placeholder with Play Button */}
              <div className={`relative aspect-video bg-gradient-to-br ${method.color} rounded-xl mb-4 overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">{method.icon}</div>
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent/90 group-hover:bg-accent rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Campus Label */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-primary/80 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-accent text-xs uppercase tracking-wider font-semibold">
                      {method.title.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{method.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-white/60 text-lg mb-6">
            <span className="text-accent font-semibold">12+</span> zenginlik yaratma yöntemine erişim
          </p>
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary text-lg px-12 py-4 shadow-glow-strong">
              Gerçek Dünyaya Katıl →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
