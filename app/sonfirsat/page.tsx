// /sonfirsat — /firsat'in 29.900 TL fiyat versiyonu.
//
// Farkları:
//   - Fiyat: ₺29.900 (üstü çizili "normal fiyat" ₺59.800)
//   - Paket içeriği: Claude Code + N8N vurgulu (eski "AI Scale App
//     eğitim programı" kaldırıldı, yerine "Claude Code Masterclass"
//     ve "N8N otomasyon stack'i" geldi)
//   - Stripe: EMBEDDED Checkout (sayfa içi iframe) — /katil/kayitbasarili
//     ile aynı VipEmbeddedCheckout component'ini priceVariant="sonfirsat"
//     ile kullanıyor. Backend STRIPE_SONFIRSAT_PRICE_ID env var'ını
//     okuyor (price_1Tc8wpIWawaEi3elIg14ABZX).
//   - ViewContent value=29900, content_name="Sonfirsat Sayfası"
//   - Tüm CTA butonları artık #sonfirsat-checkout anchor'ına scroll
//     ediyor (eski Payment Link yeni sekme açma davranışı kaldırıldı)
//
// Fallback URL: Embedded başarısız olursa (env eksik, API hata) eski
// Payment Link butonu gösterilir: SONFIRSAT_FALLBACK_URL.

import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeaderBar from "@/components/basarilikayit/HeaderBar";
import PricingCard from "@/components/basarilikayit/PricingCard";
import ValueStack from "@/components/basarilikayit/ValueStack";
import VipEmbeddedCheckout from "@/components/VipEmbeddedCheckout";

// /sonfirsat config — tek yerden değiştirilebilir
const SONFIRSAT_PRICE_FORMATTED = "29,900";
const SONFIRSAT_STRIKETHROUGH = "59,800";
const SONFIRSAT_VIEWCONTENT_VALUE = 29900;
const SONFIRSAT_CONTENT_NAME = "Sonfirsat Sayfası";
const SONFIRSAT_FUNNEL_TAG = "Sonfirsat Checkout";
// Embedded başarısız olursa açılacak Payment Link (29.900 TL ürün)
const SONFIRSAT_FALLBACK_URL =
  "https://buy.stripe.com/4gM6oI2e4c5L5wJdpS3wQ0v";
// PricingCard'daki butona ve mid-page/pre-FAQ CTA'larına verilecek
// anchor — embedded checkout section'ına scroll eder
const SONFIRSAT_CHECKOUT_ANCHOR = "#sonfirsat-checkout";

// Paket içeriği — Claude Code + N8N vurgulu, "eğitim programı" lafı yok
const SONFIRSAT_PACKAGE_ITEMS = [
  "<strong class='text-white'>Claude Code Masterclass</strong> + canlı topluluk erişimi",
  "<strong class='text-white'>N8N otomasyon stack'i</strong> + canlı mentörlük",
  "API entegrasyon toolkit'i + Ads stratejisi + Setter sistemi",
  "Tüm bonuslar + AI ajans kurulum kiti",
];

// ValueStack için /sonfirsat-özel feature listesi — "Eğitim Programı" yok
const SONFIRSAT_MAIN_FEATURES = [
  { name: "Claude Code Masterclass (9 Modül)", value: "₺8,000" },
  { name: "N8N & API Entegrasyon Toolkit", value: "₺5,000" },
  { name: "AI Otomasyon Sistemleri", value: "₺4,000" },
  { name: "B2B Satış Stratejileri", value: "₺3,500" },
  { name: "Canlı Topluluk & Mentörlük", value: "₺6,000" },
  { name: "Ads Stratejisi & Setter Sistemi", value: "₺3,500" },
];

// 3 üst kart — sol "Claude Code Masterclass" (eski "AI Otomasyon Eğitim
// Programı" yerine), orta highlight community, sağ "N8N & API"
const SONFIRSAT_TOP_CARDS = [
  {
    icon: "🤖",
    titleLines: ["Claude Code", "Masterclass"],
    sub: "9 Modül",
  },
  {
    icon: "🚀",
    titleLines: ["AI SCALE", "APP", "COMMUNITY"],
    highlight: true,
    blackText: true,
  },
  {
    icon: "⚙️",
    titleLines: ["N8N &", "API", "Toolkit"],
    sub: "Sınırsız",
  },
];

// "Başarı Hikayeleri" video grid — /katil/kayitbasarili'deki 4 video
const SONFIRSAT_VIDEOS = [
  { id: "nWvImM9U2NQ", title: "Başarı Hikayesi — Yapay Zeka" },
  { id: "sVSMnqWUvec", title: "Başarı Hikayesi 2" },
  { id: "A_wuadae_3o", title: "Başarı Hikayesi 3" },
  { id: "NPNH0P4ZRT4", title: "Başarı Hikayesi 4" },
];

export const metadata: Metadata = {
  title: "AI Scale App Community - Son Fırsat | ₺29,900",
  description:
    "AI Scale App Community ile AI otomasyon yolculuğunuza bugün başlayın. Claude Code, N8N ve B2B SaaS stratejileri.",
  openGraph: {
    title: "AI Scale App Community - Son Fırsat",
    description:
      "AI Scale App Community ile AI otomasyon yolculuğunuza bugün başlayın.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AI Scale App Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Scale App Community - Son Fırsat",
    description:
      "AI Scale App Community ile AI otomasyon yolculuğunuza bugün başlayın.",
    images: ["/twitter-image.png"],
  },
};

// Lazy load below-the-fold components
const ReviewsSection = dynamic(
  () => import("@/components/basarilikayit/ReviewsSection")
);
const FAQSection = dynamic(
  () => import("@/components/basarilikayit/FAQSection")
);
const BottomCTA = dynamic(
  () => import("@/components/basarilikayit/BottomCTA")
);
const FooterDisclaimer = dynamic(
  () => import("@/components/basarilikayit/FooterDisclaimer")
);
const CampusSection = dynamic(
  () => import("@/components/basarilikayit/CampusSection")
);
const ChatWidget = dynamic(
  () => import("@/components/basarilikayit/ChatWidget")
);
const VerticalVideos = dynamic(
  () => import("@/components/basarilikayit/VerticalVideos")
);
const CountdownTimer = dynamic(
  () => import("@/components/basarilikayit/CountdownTimer")
);
const ViewContentTracker = dynamic(
  () => import("@/components/basarilikayit/ViewContentTracker")
);
const IbanSection = dynamic(
  () => import("@/components/basarilikayit/IbanSection")
);

export default function SonfirsatPage() {
  return (
    <main className="min-h-screen bg-primary">
      <ViewContentTracker
        value={SONFIRSAT_VIEWCONTENT_VALUE}
        contentName={SONFIRSAT_CONTENT_NAME}
      />
      <CountdownTimer />
      <HeaderBar />

      {/* Hero: Pricing + Value Stack */}
      <section className="py-10 md:py-16 bg-primary relative overflow-hidden">
        {/* Subtle sparkle background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                boxShadow: '0 0 2px rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Pricing Card — buton artık embedded checkout'a
                scroll eder (yeni sekme yerine) */}
            <PricingCard
              priceFormatted={SONFIRSAT_PRICE_FORMATTED}
              checkoutUrl={SONFIRSAT_CHECKOUT_ANCHOR}
              strikethroughPrice={SONFIRSAT_STRIKETHROUGH}
              packageItems={SONFIRSAT_PACKAGE_ITEMS}
            />
            {/* Right: Value Stack */}
            <ValueStack
              priceFormatted={SONFIRSAT_PRICE_FORMATTED}
              strikethroughPrice={SONFIRSAT_STRIKETHROUGH}
              mainFeatures={SONFIRSAT_MAIN_FEATURES}
              topCards={SONFIRSAT_TOP_CARDS}
            />
          </div>
        </div>
      </section>

      {/* Embedded Stripe Checkout — sayfa içi inline form
          /katil/kayitbasarili ile aynı pattern */}
      <section className="py-10 md:py-14 bg-primary px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
              Hemen <span className="text-gold">Katıl</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base">
              Ödeme formu sayfanın içinde — yönlendirme yok, hızlı ve güvenli.
            </p>
          </div>

          <VipEmbeddedCheckout
            ctaId="sonfirsat-checkout"
            source="aiscaleapp"
            priceVariant="sonfirsat"
            fallbackUrl={SONFIRSAT_FALLBACK_URL}
            funnelTag={SONFIRSAT_FUNNEL_TAG}
          />
        </div>
      </section>

      {/* Vertical Video Testimonials — /katil/kayitbasarili'deki 4 video grid */}
      <VerticalVideos videos={SONFIRSAT_VIDEOS} />

      {/* Mid-page CTA — artık embedded checkout'a scroll eder */}
      <section className="py-1 md:py-2 bg-primary text-center px-4">
        <a
          href={SONFIRSAT_CHECKOUT_ANCHOR}
          className="inline-block animate-pulse-gold rounded-full"
        >
          <div className="relative overflow-hidden text-lg md:text-xl font-bold px-10 md:px-16 py-4 md:py-5 bg-gradient-to-r from-yellow-500 via-gold to-yellow-500 text-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-[1.02] transition-all duration-300 animate-cta-attention">
            <span className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/3 z-10 animate-cta-shine" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }} />
            YERİMİ AYIRT
          </div>
        </a>
      </section>

      <CampusSection />
      <ReviewsSection />

      {/* Pre-FAQ CTA — artık embedded checkout'a scroll eder */}
      <section className="py-1 md:py-2 bg-primary text-center px-4">
        <a
          href={SONFIRSAT_CHECKOUT_ANCHOR}
          className="inline-block animate-pulse-gold rounded-full"
        >
          <div className="relative overflow-hidden text-lg md:text-xl font-bold px-10 md:px-16 py-4 md:py-5 bg-gradient-to-r from-yellow-500 via-gold to-yellow-500 text-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-[1.02] transition-all duration-300 animate-cta-attention">
            <span className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/3 z-10 animate-cta-shine" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }} />
            YERİMİ AYIRT
          </div>
        </a>
      </section>

      <FAQSection />
      <BottomCTA />

      <IbanSection priceFormatted={SONFIRSAT_PRICE_FORMATTED} />

      <FooterDisclaimer />
      <ChatWidget />
    </main>
  );
}
