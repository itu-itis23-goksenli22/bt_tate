"use client";

import { useState } from "react";
import { BASARILIKAYIT_CHECKOUT_MASTERCLASS } from "@/lib/constants";
import PaymentLogos from "./PaymentLogos";

export default function PricingCard() {
  const [copied, setCopied] = useState(false);

  const copyIban = () => {
    navigator.clipboard.writeText("TR60 0010 3000 0000 0052 0583 71");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border-2 border-gold rounded-2xl p-6 md:p-8 bg-primary-light/30 backdrop-blur-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
          ⚡ <span className="italic">SINIRLI SÜRE FIRSATI</span> ⚡
        </h2>
        <p className="text-white/60 text-sm">
          Kontenjan Azalıyor ⏳
        </p>
      </div>

      {/* Investment Options */}
      <div className="text-center mb-6">
        <p className="text-gold italic font-bold text-sm md:text-base tracking-wide mb-4">
          YATIRIM SEÇENEKLERİNİZ
        </p>

        {/* Masterclass Paket - ₺15,000 */}
        <div className="relative mb-6">
          <a
            href={BASARILIKAYIT_CHECKOUT_MASTERCLASS}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="btn-gold-solid w-full text-center py-4 text-base md:text-lg">
              HEMEN KATIL - ₺15,000
            </div>
          </a>
          {/* Animated click hint below button */}
          <div
            className="flex items-center justify-center gap-2 mt-2 pointer-events-none"
            style={{ animation: "click-hint 1.8s ease-in-out infinite" }}
          >
            <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.5 1.5c.83 0 1.5.67 1.5 1.5v7.085l4.947-2.18a1.5 1.5 0 0 1 2.006.85l.052.148a1.5 1.5 0 0 1-.85 1.813L9.64 13.5H9v1.032l5.3 5.3a1.5 1.5 0 0 1 0 2.121l-.354.354a1.5 1.5 0 0 1-2.121 0L6 16.5V3c0-.83.67-1.5 1.5-1.5z"/>
            </svg>
            <span className="text-gold font-bold text-sm tracking-wide">
              TIKLA VE KAYIT OL
            </span>
            <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.5 1.5c.83 0 1.5.67 1.5 1.5v7.085l4.947-2.18a1.5 1.5 0 0 1 2.006.85l.052.148a1.5 1.5 0 0 1-.85 1.813L9.64 13.5H9v1.032l5.3 5.3a1.5 1.5 0 0 1 0 2.121l-.354.354a1.5 1.5 0 0 1-2.121 0L6 16.5V3c0-.83.67-1.5 1.5-1.5z"/>
            </svg>
          </div>
        </div>

        <style jsx>{`
          @keyframes click-hint {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.7; }
          }
        `}</style>
      </div>

      {/* Package contents */}
      <div className="text-center mb-6">
        <p className="text-gold italic font-bold text-sm tracking-wide mb-4">
          PAKET İÇERİĞİ
        </p>
        <div className="space-y-2 text-left">
          <div className="flex items-start gap-2">
            <span className="text-gold text-sm flex-shrink-0">✦</span>
            <p className="text-white/70 text-xs leading-relaxed">
              AI Scale App eğitim programı + topluluk erişimi
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold text-sm flex-shrink-0">✦</span>
            <p className="text-white/70 text-xs leading-relaxed">
              AI Scale Masterclass + canlı mentörlük
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold text-sm flex-shrink-0">✦</span>
            <p className="text-white/70 text-xs leading-relaxed">
              N8N & API toolkit + Ads stratejisi + Setter eğitimi
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold text-sm flex-shrink-0">✦</span>
            <p className="text-white/70 text-xs leading-relaxed">
              Tüm bonuslar + kaynak kiti
            </p>
          </div>
        </div>
      </div>

      {/* Payment Logos */}
      <div className="mb-4">
        <PaymentLogos />
      </div>

      {/* IBAN / Havale */}
      <div className="mt-5 pt-5 border-t border-white/10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-white/60 text-xs mb-3">
            🏦 Ödemede sıkıntı yaşıyorsanız, havale / EFT ile ödeyebilirsiniz
          </p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <p className="text-white font-mono text-sm font-semibold tracking-wide">
              TR60 0010 3000 0000 0052 0583 71
            </p>
            <button
              onClick={copyIban}
              className="text-white/40 hover:text-white transition-colors flex-shrink-0"
              title="IBAN Kopyala"
            >
              {copied ? (
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-white/50 text-xs mb-1">
            Baturalp Tunalı &middot; <span className="text-gold font-semibold">₺15,000</span>
          </p>
          <p className="text-white/40 text-[11px] mb-3">
            Açıklamaya adınızı ve telefon numaranızı yazın.
          </p>
          <a
            href="https://wa.me/12084509523?text=Merhaba%2C%20havale%20ile%20%C3%B6deme%20yapmak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp'tan Hemen Ulaşın
          </a>
        </div>
      </div>
    </div>
  );
}
