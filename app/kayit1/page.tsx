import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeroSection from "@/components/zoomkayit/HeroSection";
import CountdownTimer from "@/components/zoomkayit/CountdownTimer";
import RegistrationForm from "@/components/zoomkayit/RegistrationForm";

export const metadata: Metadata = {
  title: "AI Scale | Ücretsiz AI Webinarı - Yapay Zeka ile İlk 10,000$ Kazanın",
  description:
    "Her gün 20:00'da canlı ücretsiz AI webinarına katılın. Yapay zeka ile online para kazanmanın kanıtlanmış yollarını öğrenin. Sınırlı kontenjan!",
  openGraph: {
    title: "AI Scale | Ücretsiz AI Webinarı",
    description:
      "Yapay Zeka ile İlk 10,000$ Kazanın - Ücretsiz Canlı Etkinlik",
    type: "website",
  },
};

const DiscoverSection = dynamic(
  () => import("@/components/zoomkayit/DiscoverSection")
);
const BonusSection = dynamic(
  () => import("@/components/zoomkayit/BonusSection")
);
const FAQSection = dynamic(
  () => import("@/components/zoomkayit/FAQSection")
);
const Footer = dynamic(
  () => import("@/components/zoomkayit/Footer")
);

export default function Kayit1Page() {
  return (
    <main className="min-h-screen bg-black text-white font-display">
      {/* Hero + Registration Section */}
      <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <HeroSection />

        {/* YouTube Video Embed */}
        <div className="max-w-2xl mx-auto px-4 mb-8">
          <div className="relative w-full overflow-hidden rounded-xl border border-white/10" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/qQbl1YPaI7k"
              title="AI Scale Webinar"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <CountdownTimer />

        {/* Register CTA text */}
        <p className="text-center text-gold font-semibold text-sm md:text-base mb-4 px-4">
          Hemen Kaydolun & $500 Değerinde Bonus Paketi Alın
        </p>

        <RegistrationForm />

        {/* Webinar info badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 mb-8 px-4">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            60 Dakika
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Canlı Zoom Webinar
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Canlı Soru-Cevap
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            %100 Ücretsiz
          </div>
        </div>
      </div>

      {/* Discover Section */}
      <DiscoverSection />

      {/* Bonus Section */}
      <BonusSection />

      {/* Second CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Yapay Zeka Devrimi Başladı.
            <br />
            <span className="zk-text-gold-gradient">
              Siz de Yerinizi Alın.
            </span>
          </h2>
          <CountdownTimer />
          <RegistrationForm />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
