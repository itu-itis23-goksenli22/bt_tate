// Embedded Stripe Checkout deneme sayfası — /kayitbasarili-embed-test
//
// Devin Jatho "Walmart Fast-Track" tarzı ticket-stub kupon tasarımı:
//   - Dış arka plan: koyu lacivert
//   - İç beyaz kart: kalın dashed kenarlık (kupon perforasyonu efekti)
//   - Üstte uyarı/urgency başlığı (gold highlight'lar)
//   - Ortada ürün adı (görsel yerine şimdilik büyük altın metin)
//   - Fiyat vurgusu: "Gerçek Değer" üstü çizili + "Bugün SADECE $9.90" sarı vurgu
//   - Altta Stripe Embedded Checkout iframe (koyu mini-section içinde,
//     trust signals + altın gradient kenarlıkla)

import type { Metadata } from "next";
import VipEmbeddedCheckout from "@/components/VipEmbeddedCheckout";

export const metadata: Metadata = {
  title: "Özel Teklif | AI Scale",
  description: "Sadece bu sayfaya özel: VIP Paketi — $9.90",
  robots: { index: false, follow: false },
};

const NAVY = "#0a1429";
const GOLD = "#C19D44";
const YELLOW = "#FFD200";

export default function KayitBasariliEmbedTestPage() {
  return (
    <main
      className="min-h-screen py-8 md:py-14 px-3 md:px-6"
      style={{ background: NAVY }}
    >
      {/* TICKET STUB — beyaz kart, kesik dashed kenar */}
      <div
        className="max-w-3xl mx-auto bg-white px-6 md:px-12 py-10 md:py-14 shadow-2xl"
        style={{
          border: `5px dashed ${NAVY}`,
          borderRadius: "6px",
        }}
      >
        {/* PRE-HEADLINE */}
        <p
          className="text-center text-[15px] md:text-[18px] font-semibold mb-3"
          style={{ color: NAVY }}
        >
          Ama Çok Lafı Uzatmadan...
        </p>

        {/* HEADLINE — "Çünkü Bu Teklif KALICI OLARAK KAYBOLUYOR" */}
        <h2
          className="text-center font-extrabold leading-tight"
          style={{
            color: NAVY,
            fontSize: "clamp(28px, 5.5vw, 48px)",
          }}
        >
          Çünkü Bu Teklif
        </h2>
        <h2
          className="text-center font-extrabold leading-tight mt-2"
          style={{
            color: NAVY,
            fontSize: "clamp(28px, 5.5vw, 48px)",
          }}
        >
          <span
            className="inline-block px-3 md:px-4 py-1 rounded-md"
            style={{
              background: YELLOW,
              boxShadow: `0 0 0 4px ${YELLOW}, 0 6px 24px -8px rgba(255,210,0,0.6)`,
            }}
          >
            KALICI OLARAK KAYBOLUYOR
          </span>
        </h2>
        <h2
          className="text-center font-bold leading-tight mt-6"
          style={{
            color: NAVY,
            fontSize: "clamp(20px, 4.5vw, 32px)",
          }}
        >
          <span
            className="inline pb-1"
            style={{
              borderBottom: `4px solid ${YELLOW}`,
            }}
          >
            Bu Sayfadan Ayrıldığın Anda
          </span>
        </h2>

        {/* BODY COPY */}
        <div
          className="mt-10 space-y-5 text-[15px] md:text-[18px] leading-relaxed"
          style={{ color: NAVY }}
        >
          <p>
            Bu paket <em className="italic">özellikle</em> webinara hazırlanman
            için tasarlandı...
          </p>
          <p>
            Bu yüzden sadece şu an, az önce kaydolan kişilere açıyoruz.
          </p>
          <p>Sayfadan ayrıldıktan sonra geri dönüş yok.</p>
          <p>Sana email ile göndermeyeceğim...</p>
          <p>Webinardan sonra tekrar teklif etmeyeceğim...</p>
          <p className="font-semibold">Tek şansın bu.</p>
        </div>

        {/* PRODUCT BLOCK — görsel yerine büyük altın text placeholder */}
        <div className="mt-12 mb-8 text-center">
          <h3
            className="font-extrabold leading-none"
            style={{
              color: GOLD,
              fontSize: "clamp(40px, 9vw, 80px)",
              textShadow: `0 2px 12px rgba(193,157,68,0.3)`,
            }}
          >
            VIP Mastermind
          </h3>
          <h3
            className="font-extrabold leading-none mt-2"
            style={{
              color: GOLD,
              fontSize: "clamp(40px, 9vw, 80px)",
              textShadow: `0 2px 12px rgba(193,157,68,0.3)`,
            }}
          >
            Bundle
          </h3>
          <p className="text-[12px] italic text-gray-400 mt-4">
            [ Görsel buraya gelecek — şimdilik metin ]
          </p>
        </div>

        {/* PRICE EMPHASIS */}
        <div className="text-center my-10">
          <p
            className="font-bold inline-block"
            style={{
              color: GOLD,
              fontSize: "clamp(20px, 3.5vw, 28px)",
              textDecoration: "line-through",
              textDecorationThickness: "2px",
              opacity: 0.85,
            }}
          >
            Gerçek Değer: $2,000
          </p>
          <div className="mt-3">
            <span
              className="inline-block px-5 md:px-8 py-2 md:py-3 rounded-md font-extrabold"
              style={{
                background: YELLOW,
                color: NAVY,
                fontSize: "clamp(28px, 5.5vw, 44px)",
                boxShadow: `0 0 0 4px ${YELLOW}, 0 8px 30px -10px rgba(255,210,0,0.7)`,
              }}
            >
              Bugün SADECE $9.90
            </span>
          </div>
        </div>

        {/* STRIPE EMBED — koyu lacivert mini-section içinde */}
        <div
          className="rounded-xl px-4 md:px-6 py-6 md:py-8 -mx-2 md:-mx-4"
          style={{ background: NAVY }}
        >
          <h4
            className="text-center font-bold text-white mb-2"
            style={{ fontSize: "clamp(18px, 3.5vw, 24px)" }}
          >
            Yerini Şimdi Garantile
          </h4>
          <p className="text-center text-white/60 text-[13px] mb-6">
            Test kartı: <code className="text-[#FFD200]">4242 4242 4242 4242</code>
            {" · "}herhangi gelecek tarih{" · "}herhangi CVC
          </p>
          <VipEmbeddedCheckout ctaId="embed-ticket-cta" source="aiscaleapp" />
        </div>

        {/* CLOSING */}
        <p
          className="text-center text-[14px] md:text-[15px] italic mt-10"
          style={{ color: NAVY, opacity: 0.7 }}
        >
          Hızlı davranırsan, sen daha seminere bile katılmadan elinde olacak.
        </p>
      </div>

      {/* Test bilgisi — kupon dışında */}
      <p className="text-center text-white/30 text-[11px] mt-6">
        /kayitbasarili-embed-test · noindex · Devin Jatho ticket-stub style
      </p>
    </main>
  );
}
