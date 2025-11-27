import Navbar from "@/components/Navbar";
import WebinarHeroSection from "@/components/webinar/WebinarHeroSection";
import WebinarCountdownBanner from "@/components/webinar/WebinarCountdownBanner";
import WebinarBenefitsSection from "@/components/webinar/WebinarBenefitsSection";
import WebinarFormSection from "@/components/webinar/WebinarFormSection";
import WebinarFAQSection from "@/components/webinar/WebinarFAQSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "🔥 DOLU DOLU AI SEMİNERİ - SON KAYITLAR!",
  description: "Yapay zeka ile para kazanmayı öğrenin. Ücretsiz webinarımıza katılın ve AI ile gelir elde etmeye başlayın.",
};

export default function WebinarPage() {
  return (
    <main className="min-h-screen">
      <WebinarCountdownBanner />
      <Navbar />
      <WebinarHeroSection />
      <WebinarBenefitsSection />
      <WebinarFormSection />
      <WebinarFAQSection />
      <Footer />
    </main>
  );
}
