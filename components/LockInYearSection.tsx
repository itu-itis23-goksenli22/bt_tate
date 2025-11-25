"use client";

import Image from "next/image";
import { getStorageImageUrl } from "@/lib/images";

export default function LockInYearSection() {
  return (
    <section className="py-20 px-4 bg-primary relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-dark/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text content */}
          <div>
            {/* Subtitle */}
            <p className="text-accent text-sm uppercase tracking-widest mb-4">
              İHTİYACIN OLAN TEK ŞEY BİR YIL
            </p>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">Gelecek Yıl İçin</span>
              <br />
              <span className="text-white">Kilitle</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed mb-8">
              <p>
                Sadece bir yıllık odaklanmayla zengin olabilirsiniz...
              </p>

              <p>
                Ancak doğru iş modellerinde doğru bilgileri kullanarak odaklanırsanız.
              </p>

              <p>
                AI Scale App'de mentörleriniz size adım adım yolu gösterecek ve hedeflerinize mümkün olduğunca hızlı ulaşmanızı sağlayacak.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                document.getElementById('pricing-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="btn-primary text-lg px-10 py-4 shadow-glow-strong hover:shadow-glow-hover"
            >
              AI Scale App'e Katıl!
            </button>
          </div>

          {/* Right - Phone mockup with real image */}
          <div className="relative">
            <div className="relative aspect-[9/19.5] max-w-sm mx-auto bg-gradient-to-br from-primary-light to-primary-dark rounded-[3rem] border-8 border-primary-light shadow-2xl overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-primary-dark rounded-b-3xl z-10"></div>

              {/* Screen content - Real Dashboard Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={getStorageImageUrl("WhatsApp Image 2025-11-24 at 15.55.25.jpeg")}
                  alt="AI SCALE Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Screen content placeholder OLD */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary p-8 flex flex-col items-center justify-center hidden">
                {/* Placeholder for Supabase image */}
                <div className="w-full space-y-4">
                  <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent/40">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-white/10 rounded w-24 mb-2"></div>
                        <div className="h-2 bg-white/5 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/10 rounded"></div>
                      <div className="h-2 bg-white/10 rounded w-5/6"></div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent/40">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-white/10 rounded w-24 mb-2"></div>
                        <div className="h-2 bg-white/5 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/10 rounded"></div>
                      <div className="h-2 bg-white/10 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>

                {/* Image path indicator */}
                <p className="text-white/20 text-xs mt-8 text-center">
                  Görsel: lockinyear-phone.png
                </p>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-dark/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
