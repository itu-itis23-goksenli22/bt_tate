import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SoldOutPlansSection from "@/components/SoldOutPlansSection";
import PriceIncreaseSection from "@/components/PriceIncreaseSection";
import ChoiceComparisonSection from "@/components/ChoiceComparisonSection";
import KendineSorSection from "@/components/KendineSorSection";
import WealthMethodsSection from "@/components/WealthMethodsSection";
import StudentsWinningSection from "@/components/StudentsWinningSection";
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
      <LockInYearSection />
      <KendineSorSection />
      <PreparedToWorkSection />
      <ExitPlanSection />
      <TrustBadges />
      <TestimonialsSection />
      <WealthMethodsSection />
      <StudentsWinningSection />
      <ToolsSection />
      <EmailFormSection />
      <FAQSection />
      <SoldOutPlansSection />
      <PriceIncreaseSection />
      <PricingSection />
      <ChoiceComparisonSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
