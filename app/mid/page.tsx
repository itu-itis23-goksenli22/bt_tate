import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsSection from "@/components/WhatIsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Scale App - %75 İndirim Fırsatı | ₺9,000",
  description: "Yapay zeka ile zenginlik yaratmayı öğrenin. 6 para kazandıran beceri modülü, canlı eğitimler ve 7/24 destek. %75 indirimle şimdi başlayın!",
  openGraph: {
    title: "AI Scale App - %75 İndirim Fırsatı | ₺9,000",
    description: "Yapay zeka ile zenginlik yaratmayı öğrenin. 6 para kazandıran beceri modülü, canlı eğitimler ve 7/24 destek.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AI Scale App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Scale App - %75 İndirim Fırsatı | ₺9,000",
    description: "Yapay zeka ile zenginlik yaratmayı öğrenin. 6 para kazandıran beceri modülü, canlı eğitimler ve 7/24 destek.",
    images: ["/twitter-image.png"],
  },
};

// Lazy load below-the-fold components
const DualVideoSection = dynamic(() => import("@/components/DualVideoSection"));
const KendineSorSection = dynamic(() => import("@/components/KendineSorSection"));
const LockInYearSection = dynamic(() => import("@/components/LockInYearSection"));
const PreparedToWorkSection = dynamic(() => import("@/components/PreparedToWorkSection"));
const CurriculumSection = dynamic(() => import("@/components/CurriculumSection"));
const ExitPlanSection = dynamic(() => import("@/components/ExitPlanSection"));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const WealthMethodsSection = dynamic(() => import("@/components/WealthMethodsSection"));
const ToolsSection = dynamic(() => import("@/components/ToolsSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const MidSoldOutPlansSection = dynamic(() => import("@/components/MidSoldOutPlansSection"));
const PriceIncreaseSection = dynamic(() => import("@/components/PriceIncreaseSection"));
const MidPricingSection = dynamic(() => import("@/components/MidPricingSection"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackToTop = dynamic(() => import("@/components/BackToTop"));
const LiveNotifications = dynamic(() => import("@/components/LiveNotifications"));

export default function MidPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhatIsSection />
      <DualVideoSection />
      <KendineSorSection />
      <LockInYearSection />
      <PreparedToWorkSection />
      <CurriculumSection />
      <ExitPlanSection />
      <TrustBadges />
      <TestimonialsSection />
      <WealthMethodsSection />
      <ToolsSection />
      <FAQSection />
      <MidSoldOutPlansSection />
      <PriceIncreaseSection />
      <MidPricingSection />
      <Footer />
      <BackToTop />
      <LiveNotifications />
    </main>
  );
}
