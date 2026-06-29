// /canli/kayitbasarili — WebinarKit canlı funnel thank-you sayfası.
// Kayıt /canli'de olur → WebinarKit "Custom thank you page link" buraya
// yönlendirir (token query param ile). Bu sayfa geri sayım gösterir + süre
// dolunca OTOMATİK watch room'a yönlendirir (WebinarKit thank-you embed yapar).
//
// ANA ODAK = embed (seminere katılma). Dikkat dağıtacak satış/teklif YOK
// ($9.90 VIP burada değil — o watch room Offers'ta). Embed'in altında, sadece
// "yayın başlamadan izleyebilirsin" çerçevesiyle karşılama videosu + gerçek
// başarı hikayeleri. Zoom YOK.

import type { Metadata } from "next";
import WebinarKitThankYou from "@/components/canli/WebinarKitThankYou";

export const metadata: Metadata = {
  title: "Kaydın Alındı | Canlı Yayın Birazdan Başlıyor — AI Scale",
  description:
    "Kaydın başarıyla alındı. Canlı yayın birazdan başlıyor — bu sayfada kal, otomatik olarak yayına alınacaksın.",
  robots: { index: false, follow: false },
};

// Seminere başlamadan izlenebilecek karşılama videosu (16:9).
const WELCOME_VIDEO = "cIbDH0lWMc0";

// Gerçek başarı hikayeleri (dikey Shorts, 9:16).
const STORY_VIDEOS = [
  { id: "sVSMnqWUvec", title: "Başarı Hikayesi 1" },
  { id: "NPNH0P4ZRT4", title: "Başarı Hikayesi 2" },
  { id: "A_wuadae_3o", title: "Başarı Hikayesi 3" },
  { id: "nWvImM9U2NQ", title: "Başarı Hikayesi 4" },
];

export default function CanliKayitBasariliPage() {
  return (
    <main className="min-h-screen bg-black text-white font-display">
      <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black min-h-screen flex flex-col items-center px-4 py-12 md:py-16">
        {/* Onay başlığı */}
        <div className="text-center mb-8 max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Kaydın <span className="zk-text-gold-gradient">Alındı!</span>
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-red-500 font-bold text-sm md:text-base uppercase tracking-wide">
              Canlı Yayın Birazdan Başlıyor
            </span>
          </div>

          <p className="text-white text-lg md:text-xl leading-relaxed font-semibold mb-4">
            Yapman gereken tek şey: <span className="zk-text-gold-gradient">bu sayfada bekle.</span>
          </p>
          {/* Otomatik giriş — büyük ve belirgin (en kritik mesaj) */}
          <div className="rounded-2xl border-2 border-gold/40 bg-gold/[0.08] px-5 py-4 md:px-7 md:py-5">
            <p className="text-white text-xl md:text-3xl leading-snug font-extrabold">
              Sayaç sıfırlanınca canlı yayına{" "}
              <span className="zk-text-gold-gradient">otomatik gireceksin</span>
            </p>
            <p className="text-white/70 text-base md:text-lg font-semibold mt-1.5">
              Hiçbir yere tıklamana gerek yok.
            </p>
          </div>
        </div>

        {/* E-posta bilgisi — basit, herkesin anlayacağı dille */}
        <div className="w-full max-w-[560px] mb-5 flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
          <span className="text-xl leading-6">📧</span>
          <p className="text-white/75 text-sm leading-relaxed">
            <strong className="text-white">Katılım linkini e-postana da gönderdik.</strong>{" "}
            Sayfayı yanlışlıkla kapatırsan, e-postandaki linke tıklayıp geri
            dönebilirsin. <span className="text-white/50">(Gelmediyse Spam / Önemsiz klasörüne bak.)</span>
          </p>
        </div>

        {/* ANA ODAK — WebinarKit thank-you embed (vurgulanmış: altın çerçeve + glow) */}
        <div className="w-full max-w-[560px] mx-auto">
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-4 py-1.5 text-gold font-bold text-xs md:text-sm uppercase tracking-wide">
              👇 Canlı yayına buradan gireceksin
            </span>
          </div>
          <div
            className="rounded-[20px] p-[2px]"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #fbbf24, #fcd34d)",
              boxShadow: "0 0 60px rgba(251,191,36,0.35)",
            }}
          >
            <div className="rounded-[18px] bg-black p-2">
              <WebinarKitThankYou />
            </div>
          </div>
        </div>

        {/* Karşılama videosu — "seminere başlamadan izle" */}
        <div className="w-full max-w-2xl mt-16">
          <h2 className="text-center text-lg md:text-2xl font-bold text-white mb-2">
            Seminerde <span className="zk-text-gold-gradient">Görüşmek Üzere</span> 👋
          </h2>
          <p className="text-center text-white/50 text-sm mb-5">
            Yayın başlamadan, istersen bu kısa videoyu izle.
          </p>
          <div
            className="relative w-full overflow-hidden rounded-xl border border-white/10"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${WELCOME_VIDEO}`}
              title="AI Scale Seminer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Başarı hikayeleri — "yayın başlamadan izleyebilirsin" */}
        <div className="w-full max-w-5xl mt-16">
          <h2 className="text-center text-xl md:text-3xl font-extrabold mb-1">
            Gerçek <span className="zk-text-gold-gradient">Başarı Hikayeleri</span>
          </h2>
          <p className="text-center text-white/50 text-sm mb-6">
            Yayın başlamadan izleyebilirsin — AI Scale topluluğundan gerçek sonuçlar.
          </p>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {STORY_VIDEOS.map((video) => (
              <div key={video.id} className="snap-center shrink-0 w-[70vw] sm:w-[55vw] md:w-auto md:shrink">
                <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black" style={{ paddingBottom: "177.78%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-xs text-center mt-12 max-w-md">
          Yayın birkaç dakika içinde başlıyor. Sayaç sıfırlandığında doğrudan
          canlı yayına yönlendirileceksin.
        </p>
      </div>
    </main>
  );
}
