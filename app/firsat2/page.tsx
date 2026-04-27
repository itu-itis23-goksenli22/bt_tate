import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeaderBar from "@/components/basarilikayit/HeaderBar";
import PricingCard from "@/components/firsat2/PricingCard";
import ValueStack from "@/components/firsat2/ValueStack";

export const metadata: Metadata = {
  title: "AI Scale App Community - Özel Fırsat | ₺2,900",
  description:
    "AI Scale App Community ile AI otomasyon yolculuğunuza bugün başlayın. Claude Code, N8N ve B2B SaaS stratejileri. Özel indirimli fiyat.",
  openGraph: {
    title: "AI Scale App Community - Özel Fırsat",
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
    title: "AI Scale App Community - Özel Fırsat",
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
  () => import("@/components/firsat2/IbanSection")
);

const FIRSAT2_CHECKOUT_URL = "https://buy.stripe.com/6oUbJ26uk6LrbV7etW3wQ0t";

export default function Firsat2Page() {
  return (
    <main className="min-h-screen bg-primary">
      <ViewContentTracker />
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
            {/* Left: Pricing Card */}
            <PricingCard />
            {/* Right: Value Stack */}
            <ValueStack />
          </div>
        </div>
      </section>

      {/* Vertical Video Testimonials */}
      <VerticalVideos />

      {/* Mid-page CTA */}
      <section className="py-1 md:py-2 bg-primary text-center px-4">
        <a
          href={FIRSAT2_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block animate-pulse-gold rounded-full"
        >
          <div className="relative text-lg md:text-xl font-bold px-10 md:px-16 py-4 md:py-5 bg-gradient-to-r from-yellow-500 via-gold to-yellow-500 text-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-shadow duration-300">
            YERİMİ AYIRT
          </div>
        </a>
      </section>

      <CampusSection />
      <ReviewsSection />

      {/* Pre-FAQ CTA */}
      <section className="py-1 md:py-2 bg-primary text-center px-4">
        <a
          href={FIRSAT2_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block animate-pulse-gold rounded-full"
        >
          <div className="relative text-lg md:text-xl font-bold px-10 md:px-16 py-4 md:py-5 bg-gradient-to-r from-yellow-500 via-gold to-yellow-500 text-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-shadow duration-300">
            YERİMİ AYIRT
          </div>
        </a>
      </section>

      <FAQSection />
      <BottomCTA />

      <IbanSection />

      <FooterDisclaimer />
      <ChatWidget />
    </main>
  );
}
