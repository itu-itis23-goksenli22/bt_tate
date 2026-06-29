// /canli — WebinarKit "just-in-time" CANLI webinar funnel.
// /katil tasarımının birebir kopyası, TEK fark: kayıt formu yerine WebinarKit
// embed formu (Webinar ID 6a41a845d47c4bb5a2f75f76).
//   - Zoom YOK. Kayıt → WebinarKit otomatik session atar + hosted watch
//     ("webinar başlıyor") sayfasına yönlendirir.
//   - Meta Pixel PageView layout'tan otomatik fire eder.
//   - Supabase/email/CAPI → WebinarKit webhook → /api/webinarkit-register.
//   - Canlı algısı: "her gün canlı / birazdan başlıyor" dili, 19:00 sabit
//     tarih kullanılmaz (WebinarKit sayacı bir sonraki seansa sayar).

import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeroSection from "@/components/zoomkayit/HeroSection";
import WebinarKitEmbed from "@/components/canli/WebinarKitEmbed";

const CANLI_HEADLINE = (
  <>
    Kod Bilmeden{" "}
    <span className="zk-text-gold-gradient">Yapay Zeka</span> ile Gelir
    Getiren Bir Startup Kur, İşletmelere Sistem Sat ya da{" "}
    <em className="not-italic zk-text-gold-gradient">İşini 10X Büyüt</em>
  </>
);
const CANLI_SUBHEADLINE = (
  <>
    Teknik ekip ve büyük sermaye olmadan, fikrini 30 günde yayında çalışan
    bir yazılıma çevir — ister kendi startup&apos;ın olarak büyüt, ister
    işletmelere sistem satıp gelir elde et, ister kendi işine entegre edip
    rakiplerini geç.
  </>
);

export const metadata: Metadata = {
  title:
    "AI Scale | Canlı Yapay Zeka Semineri — Birazdan Başlıyor",
  description:
    "Kod bilmeden, teknik ekip ve büyük sermaye olmadan fikrini 30 günde yayında çalışan bir yazılıma çevir. Canlı yayın birazdan başlıyor — hemen yerini ayırt.",
  openGraph: {
    title: "AI Scale | Canlı Yapay Zeka Semineri",
    description:
      "Kod bilmeden, teknik ekip olmadan — fikrini 30 günde yayında çalışan yazılıma çevir. %100 ücretsiz canlı yayın birazdan başlıyor.",
    type: "website",
  },
};

const EarlyOpportunitySection = dynamic(
  () => import("@/components/zoomkayit/EarlyOpportunitySection")
);
const DiscoverSection = dynamic(
  () => import("@/components/zoomkayit/DiscoverSection")
);
const BonusSection = dynamic(
  () => import("@/components/zoomkayit/BonusSection")
);
const Footer = dynamic(
  () => import("@/components/zoomkayit/Footer")
);

// Canlı algısı veren küçük "🔴 CANLI" rozeti + form bloğu.
function LiveBadge() {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
      </span>
      <span className="text-red-500 font-bold text-sm md:text-base uppercase tracking-wide">
        Canlı Yayın Birazdan Başlıyor
      </span>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: "Bu seminer gerçekten canlı mı?",
    a: "Evet — yayın belirli aralıklarla canlı olarak başlıyor. Kaydolduğunuzda bir sonraki canlı seansa katılım hakkı kazanırsınız ve geri sayım bittiğinde doğrudan yayına yönlendirilirsiniz.",
  },
  {
    q: "Kaydolduktan sonra ne olacak?",
    a: "Kayıt formunu doldurduğunuzda hemen canlı yayın odasına yönlendirilirsiniz. Ayrıca e-posta ve telefonunuza hatırlatma gönderilir, böylece yayını kaçırmazsınız.",
  },
  {
    q: "Katılmak için bir şey indirmem gerekiyor mu?",
    a: "Hayır. Yayın doğrudan tarayıcınızda açılır — herhangi bir program kurmanıza gerek yoktur. Telefon, tablet veya bilgisayardan katılabilirsiniz.",
  },
  {
    q: "Seminer ücretli mi?",
    a: "Hayır, %100 ücretsiz. Sadece adınızı, e-postanızı ve telefon numaranızı girerek yerinizi ayırtmanız yeterli.",
  },
];

function CanliFAQ() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Sıkça Sorulan <span className="zk-text-gold-gradient">Sorular</span>
        </h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group bg-[#1a1a1a] border border-white/10 rounded-xl p-5"
            >
              <summary className="flex items-center justify-between cursor-pointer text-white font-semibold text-base md:text-lg list-none">
                {item.q}
                <span className="text-gold group-open:rotate-45 transition-transform text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-white/70 text-sm md:text-base leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CanliPage() {
  return (
    <main className="min-h-screen bg-black text-white font-display">
      {/* Hero + Registration (WebinarKit embed) */}
      <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <HeroSection compact headline={CANLI_HEADLINE} subheadline={CANLI_SUBHEADLINE} />

        <p className="text-center text-gold font-semibold text-[13px] md:text-base mb-2 mt-1 px-4">
          Hemen Kaydolun & $500 Değerinde Bonus Paketi Alın
        </p>

        <div id="kayit-form" className="px-4 scroll-mt-20">
          <LiveBadge />
          <WebinarKitEmbed />
        </div>

        {/* Webinar info badges — Zoom değil, canlı yayın */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 mb-8 px-4">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Canlı Yayın
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

      <EarlyOpportunitySection />
      <DiscoverSection />
      <BonusSection />

      {/* Second CTA — forma kaydır (embed tek sefer, duplicate ID olmasın) */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Yapay Zeka Devrimi Başladı.
            <br />
            <span className="zk-text-gold-gradient">Siz de Yerinizi Alın.</span>
          </h2>
          <a
            href="#kayit-form"
            className="zk-btn-cta inline-block w-full max-w-md py-4 md:py-5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-bold text-xl md:text-2xl rounded-xl hover:brightness-110 transition-all"
          >
            CANLI YAYINDA YERİMİ AYIRT →
          </a>
        </div>
      </section>

      <CanliFAQ />
      <Footer />
    </main>
  );
}
