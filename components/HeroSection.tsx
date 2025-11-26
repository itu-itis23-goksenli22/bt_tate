"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CHECKOUT_URL } from "@/lib/constants";

export default function HeroSection() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.5 });

  const students = useCountUp({ end: 10000, duration: 2000, enabled: statsVisible });
  const modules = useCountUp({ end: 6, duration: 1500, enabled: statsVisible });

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-light" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Program name */}
        <div className="mb-4">
          <p className="text-accent text-sm md:text-base uppercase tracking-widest font-semibold">
            2026'da Başarılı Bir Online İş Kurmak İsteyen Herkes İçin
          </p>
        </div>

        {/* Main heading - The Real World style */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white block">Yapay Zeka ile Zenginlik Yaratmayı Öğrenin</span>
          <span className="text-accent block mt-2">AI SCALE APP</span>
        </h1>

        {/* Clock subtitle */}
        <div className="flex items-center justify-center space-x-2 text-white/60 text-sm md:text-base mb-12">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeWidth="2" d="M12 6v6l4 2" />
          </svg>
          <p>Saat işliyor, dünya dönüyor ve tek sabit olan durdurulamaz değişim.</p>
        </div>

        {/* YouTube Video - The Real World style */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="relative aspect-video bg-primary-light/50 rounded-3xl overflow-hidden border border-accent/30 shadow-glow-strong">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/qQbl1YPaI7k?start=335"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Video caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
              <p className="text-white/80 text-sm uppercase tracking-wider">AYNI DÜŞÜNCEDEKİ BİREYLERLE</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <button
            onClick={() => {
              document.getElementById('pricing-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="btn-primary text-lg px-12 py-4 shadow-glow-strong hover:shadow-glow-hover"
          >
            AI Scale App'e Katıl →
          </button>
        </div>

        {/* Stats - Simple 3 column flow */}
        <div ref={statsRef} className="flex items-center justify-center gap-8 flex-wrap">
          {/* Learning */}
          <div className="flex items-center space-x-3 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider">Dünya Klasında</p>
              <p className="text-white font-semibold">Öğrenme</p>
            </div>
          </div>

          <svg className="w-6 h-6 text-accent hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* Scale to 10k/Mo */}
          <div className="flex items-center space-x-3 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider">Sıfırdan Başla</p>
              <p className="text-white font-semibold">Ayda 10k'ya</p>
            </div>
          </div>

          <svg className="w-6 h-6 text-accent hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* Expert Advice */}
          <div className="flex items-center space-x-3 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider">Uzman Tavsiyesi</p>
              <p className="text-white font-semibold">Mentorlardan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
