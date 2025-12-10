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
const SoldOutPlansSection = dynamic(() => import("@/components/SoldOutPlansSection"));
const PriceIncreaseSection = dynamic(() => import("@/components/PriceIncreaseSection"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackToTop = dynamic(() => import("@/components/BackToTop"));
const LiveNotifications = dynamic(() => import("@/components/LiveNotifications"));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar whatsappLink="https://wa.me/12084509523?text=Merhaba%2C%20AiscaleApp%20ayl%C4%B1k%20indirimli%20paketiyle%20hemen%20ba%C5%9Flamak%20istiyorum.%20Kay%C4%B1t%20i%C3%A7in%20yard%C4%B1mc%C4%B1%20olabilir%20misiniz%3F" />
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
      <SoldOutPlansSection />
      <PriceIncreaseSection />
      <PricingSection />
      <Footer />
      <BackToTop />
      <LiveNotifications />
    </main>
  );
}
