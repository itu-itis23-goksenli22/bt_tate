import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SoldOutPlansSection from "@/components/SoldOutPlansSection";
import PriceIncreaseSection from "@/components/PriceIncreaseSection";
import KendineSorSection from "@/components/KendineSorSection";
import WealthMethodsSection from "@/components/WealthMethodsSection";
import LockInYearSection from "@/components/LockInYearSection";
import PreparedToWorkSection from "@/components/PreparedToWorkSection";
import ExitPlanSection from "@/components/ExitPlanSection";
import TrustBadges from "@/components/TrustBadges";
import WhatIsSection from "@/components/WhatIsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BiographySection from "@/components/BiographySection";
import ToolsSection from "@/components/ToolsSection";
import EmailFormSection from "@/components/EmailFormSection";
import FAQSection from "@/components/FAQSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhatIsSection />
      <BiographySection />
      <KendineSorSection />
      <LockInYearSection />
      <PreparedToWorkSection />
      <ExitPlanSection />
      <TrustBadges />
      <TestimonialsSection />
      <WealthMethodsSection />
      <ToolsSection />
      <EmailFormSection />
      <FAQSection />
      <SoldOutPlansSection />
      <PriceIncreaseSection />
      <PricingSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
