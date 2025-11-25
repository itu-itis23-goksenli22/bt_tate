"use client";

import { useState } from "react";
import VideoModal from "./VideoModal";

export default function WhatIsSection() {
  const [selectedVideo, setSelectedVideo] = useState<{title: string, url?: string} | null>(null);

  const videos = [
    {
      title: "Başarı Hikayesi #1",
      duration: "1 dakika",
      url: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2017.03.31.mp4"
    },
    {
      title: "Kendinin En İyi Versiyonu",
      duration: "1 dakika",
      url: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2017.03.59.mp4"
    },
    {
      title: "Başlama Motivasyonu",
      duration: "1 dakika",
      url: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2017.45.09%20(3).mp4"
    },
    {
      title: "Yapay Zeka Geçmiş ve Gelecek",
      duration: "1 dakika",
      url: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2017.45.09%20(4).mp4"
    },
    {
      title: "AI Scale App Platformumuz",
      duration: "1 dakika",
      url: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-24%20at%2017.45.09%20(5).mp4"
    },
  ];

  return (
    <section className="py-14 md:py-12 bg-gradient-to-b from-primary to-primary-light">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            AI SCALE APP <span className="text-accent-light">NEDİR?</span>
          </h2>
          <p className="text-lg md:text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Yapay zeka ile para kazanmanın yeni yolu. Gelecek burada başlıyor.
          </p>
        </div>

        {/* Video Carousel - Centered */}
        <div className="mb-12">
          <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-primary-light/30 to-primary/30 backdrop-blur-sm border border-white/5 p-8">
            {/* Gradient edges for scroll hint */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary-light/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary-light/80 to-transparent z-10 pointer-events-none"></div>

            {/* Left Arrow Button */}
            <button
              onClick={(e) => {
                const container = e.currentTarget.parentElement?.querySelector('.carousel-container');
                if (container) {
                  container.scrollBy({ left: -220, behavior: 'smooth' });
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={(e) => {
                const container = e.currentTarget.parentElement?.querySelector('.carousel-container');
                if (container) {
                  container.scrollBy({ left: 220, behavior: 'smooth' });
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-4 carousel-container">
              {videos.map((video, index) => (
                <div key={index} className="flex-shrink-0 w-[200px] snap-center group">
                  <button
                    className="w-full text-left"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative aspect-[9/16] bg-gradient-to-br from-primary-light to-primary rounded-2xl overflow-hidden border border-accent/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] hover:border-accent/60 cursor-pointer">
                      {/* Video thumbnail - if URL exists, show video with preload */}
                      {video.url ? (
                        <video
                          src={`${video.url}#t=0.1`}
                          className="absolute inset-0 w-full h-full object-cover"
                          preload="none"
                          muted
                          playsInline
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary"></div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-accent/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-accent/60 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                          <svg className="w-10 h-10 text-accent-light ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <div className="text-white font-bold text-sm mb-1">{video.title}</div>
                        <div className="text-white/60 text-xs">{video.duration}</div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-2 h-2 rounded-full bg-accent transition-all duration-300"></div>
              <div className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer"></div>
              <div className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer"></div>
              <div className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer"></div>
              <div className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer"></div>
            </div>
          </div>
        </div>

        {/* Text content - Below carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                1,000+ Öğrenci Zaten Kazanıyor
              </h3>
              <p className="text-white/70 leading-relaxed">
                Uzman mentorlar. Gerçek sonuçlar.
              </p>
              <p className="text-white/70 leading-relaxed">
                Yapay zeka ve dijital beceriler ile para kazanmanın sistemini öğren. Başka bir şey gerekmiyor.
              </p>
            </div>

            <div className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-accent-light mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/70">Her hafta canlı eğitimler</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-accent-light mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/70">Uzman mentorlardan grup eğitimleri</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-accent-light mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/70">Dünyadaki en iyi girişimcilerden haberler</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        videoTitle={selectedVideo?.title || ""}
        videoUrl={selectedVideo?.url}
      />
    </section>
  );
}
