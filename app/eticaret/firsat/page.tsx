import dynamic from "next/dynamic";
import type { Metadata } from "next";
import EticaretHeaderBar from "@/components/eticaret-firsat/HeaderBar";
import EticaretPricingCard from "@/components/eticaret-firsat/PricingCard";
import EticaretValueStack from "@/components/eticaret-firsat/ValueStack";

export const metadata: Metadata = {
  title: "Dijital Akademi E-Ticaret - Şimdi Katılın | ₺9,900",
  description:
    "Dijital Akademi ile e-ticaret yolculuğunuza bugün başlayın. Amazon FBA, Shopify, ETSY ve AI otomasyonu.",
  openGraph: {
    title: "Dijital Akademi E-Ticaret - Şimdi Katılın",
    description:
      "Dijital Akademi ile e-ticaret yolculuğunuza bugün başlayın.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Dijital Akademi E-Ticaret",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital Akademi E-Ticaret - Şimdi Katılın",
    description:
      "Dijital Akademi ile e-ticaret yolculuğunuza bugün başlayın.",
    images: ["/twitter-image.png"],
  },
};

// Lazy load below-the-fold components
const EticaretReviewsSection = dynamic(
  () => import("@/components/eticaret-firsat/ReviewsSection")
);
const EticaretFAQSection = dynamic(
  () => import("@/components/eticaret-firsat/FAQSection")
);
const EticaretBottomCTA = dynamic(
  () => import("@/components/eticaret-firsat/BottomCTA")
);
const FooterDisclaimer = dynamic(
  () => import("@/components/basarilikayit/FooterDisclaimer")
);
const EticaretCampusSection = dynamic(
  () => import("@/components/eticaret-firsat/CampusSection")
);
const EticaretChatWidget = dynamic(
  () => import("@/components/eticaret-firsat/ChatWidget")
);
const VerticalVideos = dynamic(
  () => import("@/components/basarilikayit/VerticalVideos")
);
const CountdownTimer = dynamic(
  () => import("@/components/basarilikayit/CountdownTimer")
);
const ViewContentTracker = dynamic(
  () => import("@/components/eticaret-firsat/ViewContentTracker")
);
const EticaretIbanSection = dynamic(
  () => import("@/components/eticaret-firsat/IbanSection")
);

export default function EticaretFirsatPage() {
  return (
    <main className="min-h-screen relative" style={{
      backgroundImage: `url('/arkaplansite.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <ViewContentTracker />
      <CountdownTimer />
      <EticaretHeaderBar />

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
            <EticaretPricingCard />
            <EticaretValueStack />
          </div>
        </div>
      </section>

      {/* Vertical Video Testimonials */}
      <VerticalVideos />

      {/* Mid-page CTA */}
      <section className="py-1 md:py-2 bg-primary text-center px-4">
        <a
          href="https://buy.stripe.com/aFa5kEdWMc5LcZbgC43wQ0o"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block animate-pulse-gold rounded-full"
        >
          <div className="relative text-lg md:text-xl font-bold px-10 md:px-16 py-4 md:py-5 bg-gradient-to-r from-yellow-500 via-gold to-yellow-500 text-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-shadow duration-300">
            YERİMİ AYIRT
          </div>
        </a>
      </section>

      <EticaretCampusSection />
      <EticaretReviewsSection />

      {/* Pre-FAQ CTA */}
      <section className="py-1 md:py-2 bg-primary text-center px-4">
        <a
          href="https://buy.stripe.com/aFa5kEdWMc5LcZbgC43wQ0o"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block animate-pulse-gold rounded-full"
        >
          <div className="relative text-lg md:text-xl font-bold px-10 md:px-16 py-4 md:py-5 bg-gradient-to-r from-yellow-500 via-gold to-yellow-500 text-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-shadow duration-300">
            YERİMİ AYIRT
          </div>
        </a>
      </section>

      <EticaretFAQSection />
      <EticaretBottomCTA />

      <EticaretIbanSection />

      <FooterDisclaimer />
      <EticaretChatWidget />
    </main>
  );
}
