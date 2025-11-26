"use client";

import { useState } from "react";

export default function DualVideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<{title: string, youtubeId: string} | null>(null);

  const videos = [
    {
      title: "AI Otomasyon Ajansı",
      description: "Sınırlı teknik bilgiyle bile AI sistemleri kurmayı öğrenin. Online bir şekilde şirketlere satın veya kendi AI'nız tarafından yönetilen bir iş kurun.",
      youtubeId: "9GkjN-Jk6lw",
    },
    {
      title: "Dijital Dönüşüm",
      description: "Yapay zeka ile dijital dönüşümü gerçekleştirin. İşletmenizi geleceğe taşıyın ve rekabette öne çıkın.",
      youtubeId: "kVHJfmtY_00",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with CTA */}
        <div className="text-center mb-16">
          <button
            onClick={() => {
              document.getElementById('pricing-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="btn-primary text-lg px-12 py-4 shadow-glow-strong hover:shadow-glow-hover"
          >
            AI Scale App'e Katıl →
          </button>
        </div>

        {/* Two Video Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => {
                if (video.youtubeId) {
                  setSelectedVideo(video);
                }
              }}
            >
              <div className="relative aspect-video bg-gradient-to-br from-primary-light to-primary-dark rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-glow hover:border-accent/60">
                {/* YouTube Thumbnail */}
                {video.youtubeId ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                      }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-accent/80 group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-accent/50">
                        <svg className="w-10 h-10 text-accent-light ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  // Placeholder when no video ID
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-accent/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-white/40 text-sm">Video Yakında</p>
                    </div>
                  </div>
                )}

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-white/70 text-sm">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-primary rounded-2xl overflow-hidden shadow-2xl"
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

            {/* YouTube Player */}
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
