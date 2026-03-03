"use client";

import { BASARILIKAYIT_CHECKOUT_BASIC, BASARILIKAYIT_CHECKOUT_MASTERCLASS } from "@/lib/constants";
import PaymentLogos from "./PaymentLogos";

export default function PricingCard() {
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

        {/* Option 1: Basic Paket - ₺9,000 */}
        <a
          href={BASARILIKAYIT_CHECKOUT_BASIC}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4"
        >
          <div className="btn-gold-outline w-full text-center py-4 text-base md:text-lg">
            BASIC PAKET - ₺9,000
          </div>
        </a>

        {/* Option 2: Basic + Masterclass - ₺15,000 with MOST POPULAR badge */}
        <div className="relative mb-6">
          <div className="absolute -top-3 right-4 z-10">
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold text-black text-[10px] md:text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
              En Popüler
            </span>
          </div>
          <a
            href={BASARILIKAYIT_CHECKOUT_MASTERCLASS}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="btn-gold-solid w-full text-center py-4 text-base md:text-lg">
              BASIC + MASTERCLASS PAKETİ - ₺15,000
            </div>
          </a>
        </div>
      </div>

      {/* Package comparison */}
      <div className="text-center mb-6">
        <p className="text-gold italic font-bold text-sm tracking-wide mb-4">
          PAKETLER ARASINDAKI FARK
        </p>
        <div className="space-y-2 text-left">
          <div className="flex items-start gap-2">
            <span className="text-gold text-sm flex-shrink-0">✦</span>
            <p className="text-white/70 text-xs leading-relaxed">
              <span className="text-white font-semibold">Basic:</span> AI Scale App eğitim programı, topluluk erişimi, N8N & API toolkit, kaynak kiti
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold text-sm flex-shrink-0">✦</span>
            <p className="text-white/70 text-xs leading-relaxed">
              <span className="text-white font-semibold">Basic + Masterclass:</span> Tüm Basic içerik + AI Scale Masterclass, canlı mentörlük, Ads stratejisi, Setter eğitimi ve tüm bonuslar
            </p>
          </div>
        </div>
      </div>

      {/* Payment Logos */}
      <div className="mb-4">
        <PaymentLogos />
      </div>

      {/* Declined card notice */}
      <div className="text-center">
        <p className="text-white/40 text-xs leading-relaxed">
          İşleminiz ilk seferde gerçekleşmezse:
        </p>
        <p className="text-red-400 text-xs mt-1">
          Endişelenmeyin, muhtemelen sizin hatanız değil!
        </p>
        <p className="text-white/30 text-[11px] mt-1 leading-relaxed">
          Kartınızın arkasındaki numarayı arayarak kimliğinizi doğrulayın,
          kredi kartı şirketiniz bunu anında çözebilir.
        </p>
      </div>
    </div>
  );
}
