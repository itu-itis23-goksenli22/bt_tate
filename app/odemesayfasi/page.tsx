import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeaderBar from "@/components/basarilikayit/HeaderBar";
import PricingCard from "@/components/basarilikayit/PricingCard";
import ValueStack from "@/components/basarilikayit/ValueStack";

export const metadata: Metadata = {
  title: "AI Scale App Community - Şimdi Katılın | ₺9,000",
  description:
    "AI Scale App Community ile AI otomasyon yolculuğunuza bugün başlayın. Claude Code, N8N ve B2B SaaS stratejileri. 365 gün para iade garantisi.",
  openGraph: {
    title: "AI Scale App Community - Şimdi Katılın",
    description:
      "AI Scale App Community ile AI otomasyon yolculuğunuza bugün başlayın. 365 gün para iade garantisi.",
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
    title: "AI Scale App Community - Şimdi Katılın",
    description:
      "AI Scale App Community ile AI otomasyon yolculuğunuza bugün başlayın.",
    images: ["/twitter-image.png"],
  },
};

// Lazy load below-the-fold components
const GuaranteeSection = dynamic(
  () => import("@/components/basarilikayit/GuaranteeSection")
);
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

export default function BasarilikayitPage() {
  return (
    <main className="min-h-screen bg-primary">
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

      <CampusSection />
      <GuaranteeSection />
      <ReviewsSection />
      <FAQSection />
      <BottomCTA />
      <FooterDisclaimer />
      <ChatWidget />
    </main>
  );
}
