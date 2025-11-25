import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsSection from "@/components/WhatIsSection";

// Lazy load below-the-fold components
const KendineSorSection = dynamic(() => import("@/components/KendineSorSection"));
const LockInYearSection = dynamic(() => import("@/components/LockInYearSection"));
const PreparedToWorkSection = dynamic(() => import("@/components/PreparedToWorkSection"));
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
const Chatbot = dynamic(() => import("@/components/Chatbot"));
const LiveNotifications = dynamic(() => import("@/components/LiveNotifications"));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhatIsSection />
      <KendineSorSection />
      <LockInYearSection />
      <PreparedToWorkSection />
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
      <Chatbot />
      <LiveNotifications />
    </main>
  );
}
