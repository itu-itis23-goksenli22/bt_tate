"use client";

import { BASARILIKAYIT_CHECKOUT_MASTERCLASS } from "@/lib/constants";
import PaymentLogos from "../basarilikayit/PaymentLogos";

export default function EticaretBottomCTA() {
  return (
    <section className="py-16 md:py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <div className="text-5xl md:text-6xl mb-6">🛒</div>
        <h2 className="text-2xl md:text-3xl font-bold text-white italic uppercase tracking-wide mb-4">
          DİJİTAL AKADEMİ E-TİCARET&apos;E BUGÜN KATILIN
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-8">
          Bugün Kayıt Olun ve <span className="font-bold text-white">E-Ticaret Yolculuğunuza Hemen Başlayın!</span>
        </p>

        <a
          href={BASARILIKAYIT_CHECKOUT_MASTERCLASS}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-8"
        >
          <div className="btn-gold-solid text-lg md:text-xl px-10 md:px-16 py-4 md:py-5">
            YERİNİZİ ŞİMDİ AYIRIN
          </div>
        </a>

        <div className="mb-4">
          <PaymentLogos />
        </div>

        <p className="text-white/50 text-sm flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
          </svg>
          Güvenli Ödeme - %100 Korumalı & Güvenli
        </p>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.8; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
