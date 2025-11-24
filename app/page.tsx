import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SoldOutPlansSection from "@/components/SoldOutPlansSection";
import TrustBadges from "@/components/TrustBadges";
import WhatIsSection from "@/components/WhatIsSection";
import ModulesSection from "@/components/ModulesSection";
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
      <AnnouncementBanner />
      <Navbar />
      <HeroSection />
      <SoldOutPlansSection />
      <TrustBadges />
      <WhatIsSection />
      <ModulesSection />
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
