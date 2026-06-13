// /katil — Paralel funnel variant'ı.
// Ana funnel ile aynı sayfa yapısı, ama:
//   - Farklı webinar (her gün yenilenen 20:00 — Zoom ID 81497341331)
//   - Form redirect → /katil/kayitbasarili
//   - Meta CAPI content_name → "Katil Funnel Webinar" (analytics ayrımı)
//   - Aynı pixel, aynı Stripe ürünü, aynı CompleteRegistration / Purchase
//     event'leri (sadece content_name farklı olduğu için audience'lar
//     Meta dashboard'da custom conversion ile ayırt edilebilir)

import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeroSection from "@/components/zoomkayit/HeroSection";
import CountdownTimer from "@/components/zoomkayit/CountdownTimer";
import RegistrationForm from "@/components/zoomkayit/RegistrationForm";

// /katil variant config — TEK YERDEN değiştirilebilir.
const KATIL_WEBINAR_ID = "81497341331";
const KATIL_SUCCESS_PATH = "/katil/kayitbasarili";
const KATIL_CONTENT_NAME = "Katil Funnel Webinar";
const KATIL_CTA_TEXT = "ÜCRETSİZ YERİMİ AYIRT";

// /katil headline blok'u — 3 farklı audience'a aynı anda hitap eden
// "founder / agency / business owner" angle'ı. Michael Supina feedback'i
// sonrası genişletildi: artık sadece "ilk gelir" odaklı değil, business
// owner ve agency hedefini de kapsıyor.
const KATIL_HEADLINE = (
  <>
    Kod Bilmeden{" "}
    <span className="zk-text-gold-gradient">Yapay Zeka</span> ile Gelir
    Getiren Bir Startup Kur, İşletmelere Sistem Sat ya da{" "}
    <em className="not-italic zk-text-gold-gradient">İşini 10X Büyüt</em>
  </>
);
const KATIL_SUBHEADLINE = (
  <>
    Teknik ekip ve büyük sermaye olmadan, fikrini 30 günde yayında çalışan
    bir yazılıma çevir — ister kendi startup&apos;ın olarak büyüt, ister
    işletmelere sistem satıp gelir elde et, ister kendi işine entegre edip
    rakiplerini geç.
  </>
);

export const metadata: Metadata = {
  title:
    "AI Scale | Yapay Zeka ile Startup Kur, Sistem Sat veya İşini 10X Büyüt",
  description:
    "Kod bilmeden, teknik ekip ve büyük sermaye olmadan fikrini 30 günde yayında çalışan bir yazılıma çevir. Startup kur, işletmelere sistem sat, ya da kendi işini 10X büyüt. Her gün canlı, saat 20:00.",
  openGraph: {
    title: "AI Scale | Yapay Zeka ile Startup Kur veya İşini 10X Büyüt",
    description:
      "Kod bilmeden, teknik ekip olmadan — fikrini 30 günde yayında çalışan yazılıma çevir. %100 ücretsiz canlı etkinlik.",
    type: "website",
  },
};

const EarlyOpportunitySection = dynamic(
  () => import("@/components/zoomkayit/EarlyOpportunitySection")
);
const DiscoverSection = dynamic(
  () => import("@/components/zoomkayit/DiscoverSection")
);
const BonusSection = dynamic(
  () => import("@/components/zoomkayit/BonusSection")
);
const FAQSection = dynamic(
  () => import("@/components/zoomkayit/FAQSection")
);
const Footer = dynamic(
  () => import("@/components/zoomkayit/Footer")
);

export default function KatilPage() {
  return (
    <main className="min-h-screen bg-black text-white font-display">
      {/* Hero + Registration Section */}
      <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <HeroSection headline={KATIL_HEADLINE} subheadline={KATIL_SUBHEADLINE} />

        {/* Her gün yenilenen seminer. Başlık sabit "Akşam saat 20:00'de...",
            sayaç bir sonraki 20:00'a (bugün/yarın) rolling sayar. */}
        <CountdownTimer
          headlineText="Akşam saat 20:00'de Canlı Seminer Başlıyor..."
          hideDays
        />

        {/* Register CTA text */}
        <p className="text-center text-gold font-semibold text-sm md:text-base mb-4 px-4">
          Hemen Kaydolun & $500 Değerinde Bonus Paketi Alın
        </p>

        <RegistrationForm
          eventType="Lead"
          webinarId={KATIL_WEBINAR_ID}
          successPath={KATIL_SUCCESS_PATH}
          contentName={KATIL_CONTENT_NAME}
          startDate={{ year: 2026, month: 6, day: 13 }}
          ctaText={KATIL_CTA_TEXT}
        />

        {/* Webinar info badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 mb-8 px-4">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            60 Dakika
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Canlı Zoom Semineri
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Canlı Soru-Cevap
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            %100 Ücretsiz
          </div>
        </div>
      </div>

      {/* Discover Section */}
      <DiscoverSection />

      {/* Bonus Section */}
      <BonusSection />

      {/* Second CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Yapay Zeka Devrimi Başladı.
            <br />
            <span className="zk-text-gold-gradient">
              Siz de Yerinizi Alın.
            </span>
          </h2>
          <CountdownTimer
            headlineText="Akşam saat 20:00'de Canlı Seminer Başlıyor..."
            hideDays
          />
          <RegistrationForm
            eventType="Lead"
            webinarId={KATIL_WEBINAR_ID}
            successPath={KATIL_SUCCESS_PATH}
            contentName={KATIL_CONTENT_NAME}
            startDate={{ year: 2026, month: 6, day: 13 }}
            ctaText={KATIL_CTA_TEXT}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* For Once In Your Life You Are Early — chart + Facebook analogy
          (sayfanın en altında, footer'dan hemen önce — final FOMO push) */}
      <EarlyOpportunitySection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
