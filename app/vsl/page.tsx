// /vsl — Application / Birebir Görüşme Talebi sayfası
//
// Trafik kaynağı: Instagram reklamları (cold audience).
// Amaç: ziyaretçi → Typeform qualification → kalifiyeler Calendly randevusu.
//
// Akış:
//   1. Hero (yeni "hemen görüşelim" angle, Webinar değil)
//   2. Typeform embed (sayfa içi inline form)
//   3. Discover Section (kısa AI değer önerisi)
//   4. Early Opportunity (FOMO chart, IG audience'a iyi push)
//   5. FAQ (objection handle)
//   6. Footer
//
// KALDIRILAN bölümler (webinar'a özel):
//   - CountdownTimer (sabit etkinlik yok)
//   - Webinar badges (60 dk, Canlı Zoom Semineri — yanlış mesaj)
//   - BonusSection ($500 paketi webinar'a bağlı)
//   - RegistrationForm/Modal (yerini Typeform aldı)
//
// TODO: Aşağıdaki 2 constant Typeform ve Calendly hazır olunca
// güncellenecek:
//   - VSL_TYPEFORM_ID = senin Typeform form ID'n (typeform.com/to/XXXXX
//     URL'inin XXXXX kısmı)
//   - Calendly URL'i Typeform Dashboard'da "Redirect to URL" alanına
//     yazılacak — bu sayfada DEĞİL, Typeform tarafında konfigüre edilir.

import dynamic from "next/dynamic";
import Script from "next/script";
import type { Metadata } from "next";
import HeroSection from "@/components/zoomkayit/HeroSection";

// TODO(typeform): Typeform form ID'ni buraya yapıştır. Format:
// https://YOURDOMAIN.typeform.com/to/XXXXXXXX — sadece XXXXXXXX kısmı.
const VSL_TYPEFORM_ID = "PLACEHOLDER_TYPEFORM_ID";

const VSL_EYEBROW = "%100 ÜCRETSİZ BİREBİR GÖRÜŞME";

const VSL_HEADLINE = (
  <>
    Yapay Zeka ile{" "}
    <span className="zk-text-gold-gradient">İşini 10X Büyütmek</span>{" "}
    ya da{" "}
    <em className="not-italic zk-text-gold-gradient">
      Sıfırdan Bir Sistem Kurmak
    </em>{" "}
    İster misin?
  </>
);

const VSL_SUBHEADLINE = (
  <>
    Aşağıdaki kısa formu doldur — ekibimiz uygun bulursa{" "}
    <strong className="text-white">birebir görüşmek için</strong> seninle
    iletişime geçecek. 30 dakikalık ücretsiz görüşmede sana özel yol
    haritası çıkarıyoruz.
  </>
);

export const metadata: Metadata = {
  title: "AI Scale | Birebir Görüşme Başvurusu — Yapay Zeka ile İşini Büyüt",
  description:
    "Yapay zeka ile işini 10x büyütmek veya sıfırdan sistem kurmak istiyor musun? Kısa formu doldur, ücretsiz birebir görüşme için randevu al.",
  openGraph: {
    title: "AI Scale | Birebir Görüşme Başvurusu",
    description:
      "Yapay zeka ile işini büyüt — ücretsiz birebir görüşme. %100 kalifiye başvuru.",
    type: "website",
  },
  // Reklamdan gelen cold audience — search engine'lere kapat
  robots: { index: false, follow: false },
};

const EarlyOpportunitySection = dynamic(
  () => import("@/components/zoomkayit/EarlyOpportunitySection")
);
const DiscoverSection = dynamic(
  () => import("@/components/zoomkayit/DiscoverSection")
);
const FAQSection = dynamic(
  () => import("@/components/zoomkayit/FAQSection")
);
const Footer = dynamic(
  () => import("@/components/zoomkayit/Footer")
);

export default function VslPage() {
  return (
    <main className="min-h-screen bg-black text-white font-display">
      {/* Hero — webinar değil "birebir görüşme" angle */}
      <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <HeroSection
          eyebrow={VSL_EYEBROW}
          headline={VSL_HEADLINE}
          subheadline={VSL_SUBHEADLINE}
        />

        {/* CTA mini hint — Typeform'a scroll */}
        <p className="text-center text-gold font-semibold text-sm md:text-base mb-4 px-4">
          ↓ Sadece 2 dakika sürer · Hemen randevu açılır ↓
        </p>

        {/* Typeform embed section */}
        <section
          id="vsl-application"
          className="max-w-2xl mx-auto px-4 pb-12 scroll-mt-24"
        >
          {/* Card container — altın çerçeve, mevcut tasarım dili */}
          <div
            className="rounded-2xl p-[2px] shadow-[0_0_60px_-15px_rgba(193,157,68,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(193,157,68,0.6) 0%, rgba(232,212,139,0.3) 50%, rgba(193,157,68,0.6) 100%)",
            }}
          >
            <div className="rounded-2xl bg-[#0a0a0a] p-2 md:p-3">
              {/* Typeform widget — sayfa içi iframe.
                  Yükseklik 600px; mobilde scroll'u Typeform kendisi yönetir.
                  TODO: VSL_TYPEFORM_ID gerçek ID ile değiştir. */}
              <div
                data-tf-live={VSL_TYPEFORM_ID}
                style={{ width: "100%", height: "600px" }}
              />
            </div>
          </div>

          {/* Trust signals — Typeform altında */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-white/50 text-sm">
            <span className="inline-flex items-center gap-1">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              %100 Ücretsiz
            </span>
            <span className="inline-flex items-center gap-1">
              <svg
                className="w-4 h-4 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Sadece 2 Dakika
            </span>
            <span className="inline-flex items-center gap-1">
              <svg
                className="w-4 h-4 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Anında Randevu
            </span>
          </div>
        </section>

        {/* Typeform loader script — sayfada bir kez yüklenir.
            data-tf-live attribute'lu div'leri Typeform JS otomatik
            inflate eder. next/script Script component'i hydration-safe. */}
        <Script
          src="//embed.typeform.com/next/embed.js"
          strategy="afterInteractive"
        />
      </div>

      {/* Discover — AI değer önerisi (cold audience trust building) */}
      <DiscoverSection />

      {/* Second CTA — Typeform'a scroll */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Hemen{" "}
            <span className="zk-text-gold-gradient">Randevu Al</span> —
            <br />
            Ücretsiz Birebir Görüşelim.
          </h2>
          <a
            href="#vsl-application"
            className="zk-btn-cta inline-block w-full max-w-md py-5 md:py-6 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-extrabold text-xl md:text-2xl lg:text-3xl rounded-xl hover:brightness-110 transition-all cursor-pointer"
          >
            RANDEVU BAŞVURUSU YAP →
          </a>
        </div>
      </section>

      {/* FAQ — objection handle */}
      <FAQSection />

      {/* Early Opportunity — final FOMO push */}
      <EarlyOpportunitySection />

      <Footer />
    </main>
  );
}
