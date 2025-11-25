"use client";

import { CHECKOUT_URL } from "@/lib/constants";
import { useState } from "react";

export default function WealthMethodsSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const methods = [
    {
      title: "AI Otomasyonlu Ajans",
      description: "Sınırlı teknik bilgiyle bile AI sistemleri kurmayı öğrenin. Sistemi online şirketlere satın veya kendi AI'nız tarafından yönetilen bir online şirket kurun.",
      icon: "🤖",
      color: "from-blue-500/20 to-cyan-500/20",
      videoUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2018.09.51.mp4"
    },
    {
      title: "Kripto Yatırımları",
      description: "Kripto para kampüsünde gerçek zamanlı bilgiye, profesörlere ve 2,000+ öğrenciye bağlanın. Trendleri belirleyin ve coin fiyatlarını etkileyen faktörleri öğrenin.",
      icon: "₿",
      color: "from-blue-500/20 to-cyan-500/20",
      videoUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2018.13.43.mp4"
    },
    {
      title: "Copywriting",
      description: "Kelimeler sizin savaşçılarınız ve yazdığınız her harf bir strateji. Copywriting sanatında ustalaşın ve fikirleri kâra çevirin.",
      icon: "✍️",
      color: "from-green-500/20 to-emerald-500/20",
      videoUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2018.16.48.mp4"
    },
    {
      title: "E-Ticaret",
      description: "Online satış dünyasının sırlarını keşfedin. E-ticaret işinizi kurma ve ölçeklendirme stratejilerini öğrenin.",
      icon: "🛒",
      color: "from-purple-500/20 to-pink-500/20",
      videoUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2018.15.53.mp4"
    },
    {
      title: "Freelancing",
      description: "Kendi patronunuz olun. Freelancing ile global pazarda yeteneklerinizi paraya çevirmeyi öğrenin.",
      icon: "💼",
      color: "from-red-500/20 to-rose-500/20",
      videoUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2018.20.01.mp4"
    },
    {
      title: "İş Ustalığı",
      description: "İş dünyasında liderlik, operasyonları ölçeklendirme ve daha fazla para kazanma sanatını öğrenin.",
      icon: "👔",
      color: "from-blue-500/20 to-cyan-500/20",
      videoUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2019.36.02.mp4"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
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
            <div
              key={index}
              className="card-trw group cursor-pointer"
              onClick={() => method.videoUrl && setSelectedVideo(method.videoUrl)}
            >
              {/* Video Thumbnail with Play Button */}
              <div className={`relative aspect-video bg-gradient-to-br ${method.color} rounded-xl mb-4 overflow-hidden`}>
                {/* Video Element for Thumbnail */}
                {method.videoUrl ? (
                  <>
                    <video
                      src={`${method.videoUrl}#t=0.1`}
                      className="absolute inset-0 w-full h-full object-cover"
                      preload="none"
                      muted
                      playsInline
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all flex items-center justify-center">
                      <div className="w-16 h-16 bg-accent/90 group-hover:bg-accent rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">{method.icon}</div>
                  </div>
                )}
                {/* Campus Label */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
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
            <span className="text-accent font-semibold">10+</span> zenginlik yaratma yöntemine erişim
          </p>
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary text-lg px-12 py-4 shadow-glow-strong">
              AI Scale App'e Katıl →
            </button>
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-primary rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-primary/80 hover:bg-accent backdrop-blur-sm rounded-full flex items-center justify-center transition-all group"
              aria-label="Kapat"
            >
              <svg
                className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-full"
              controlsList="nodownload"
            >
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
