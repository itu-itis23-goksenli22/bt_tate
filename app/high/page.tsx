import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsSection from "@/components/WhatIsSection";

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
const HighSoldOutPlansSection = dynamic(() => import("@/components/HighSoldOutPlansSection"));
const PriceIncreaseSection = dynamic(() => import("@/components/PriceIncreaseSection"));
const HighPricingSection = dynamic(() => import("@/components/HighPricingSection"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackToTop = dynamic(() => import("@/components/BackToTop"));
const LiveNotifications = dynamic(() => import("@/components/LiveNotifications"));

export default function HighPage() {
  return (
    <main className="min-h-screen">
      <Navbar whatsappLink="https://wa.me/12084509523?text=Merhaba%2C%20Pro%20paket%20i%C3%A7in%20ge%C3%A7erli%20%25%2050%20indirim%20f%C4%B1rsat%C4%B1n%C4%B1%20de%C4%9Ferlendirmek%20istiyorum.%20Kontenjan%20dolmadan%20yard%C4%B1mc%C4%B1%20olabilir%20misiniz%3F" />
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
      <HighSoldOutPlansSection />
      <PriceIncreaseSection />
      <HighPricingSection />
      <Footer />
      <BackToTop />
      <LiveNotifications />
    </main>
  );
}
