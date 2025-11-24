import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SoldOutPlansSection from "@/components/SoldOutPlansSection";
import PriceIncreaseSection from "@/components/PriceIncreaseSection";
import ChoiceComparisonSection from "@/components/ChoiceComparisonSection";
import UrgencySection from "@/components/UrgencySection";
import WealthMethodsSection from "@/components/WealthMethodsSection";
import TrustBadges from "@/components/TrustBadges";
import WhatIsSection from "@/components/WhatIsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
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
      <SoldOutPlansSection />
      <PriceIncreaseSection />
      <ChoiceComparisonSection />
      <UrgencySection />
      <WealthMethodsSection />
      <TrustBadges />
      <WhatIsSection />
      <TestimonialsSection />
      <ToolsSection />
      <EmailFormSection />
      <FAQSection />
      <PricingSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
