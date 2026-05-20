// Embedded Stripe Checkout deneme sayfası — /kayitbasarili-embed-test
//
// Amaç:
//   - Stripe Embedded Checkout iframe'ini production'a sokmadan önce ayrı
//     bir route'ta deneme yap.
//   - "/kayitbasarili" (ana sayfa flow) bozulmaz, sadece bu sayfada test.
//   - Şimdilik en alta yerleştirildi; çalıştığı doğrulandıktan sonra
//     /kayitbasarili içine entegre edeceğiz.
//
// Gerekli env vars:
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  (Vercel'de set)
//   STRIPE_SECRET_KEY                   (Vercel'de set)
//   STRIPE_VIP_PRICE_ID                 (yeni \$19.00 Price ID — Stripe Dashboard)
//
// Bunlardan biri eksikse fallback olarak Payment Link butonu görünür.

import type { Metadata } from "next";
import VipEmbeddedCheckout from "@/components/VipEmbeddedCheckout";

export const metadata: Metadata = {
  title: "Embed Checkout Test | AI Scale",
  description: "Stripe Embedded Checkout deneme sayfası",
  robots: { index: false, follow: false },
};

export default function KayitBasariliEmbedTestPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c] text-white">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        {/* Başlık */}
        <div className="text-center mb-10">
          <h1
            className="font-black tracking-tight leading-none mb-4"
            style={{
              fontSize: "clamp(48px, 10vw, 80px)",
              color: "#C19D44",
              textShadow: "0 4px 24px rgba(193,157,68,0.25)",
            }}
          >
            EMBED TEST
          </h1>
          <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed">
            Bu sayfa sadece Stripe Embedded Checkout entegrasyonunu doğrulamak
            için kuruldu. Production akışları (
            <code className="text-[#D5B356]">/kayitbasarili</code>,{" "}
            <code className="text-[#D5B356]">/vip-mastermind/kayitbasarili</code>
            ) etkilenmiyor.
          </p>
        </div>

        {/* Açıklama */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-12">
          <h2 className="text-white font-semibold text-[18px] mb-3">
            Ne göreceksin?
          </h2>
          <ul className="text-white/70 text-[14px] leading-relaxed space-y-1.5">
            <li>
              ✅ <strong>Çalışıyorsa:</strong> Sayfanın altında doğrudan kart
              giriş formu (Stripe iframe). $19.00 USD ücretiyle.
            </li>
            <li>
              ⚠️ <strong>Env yoksa / hata olursa:</strong> Yeşil "VIP Üyelere
              Şimdi Katıl" butonu (eski Payment Link, yeni sekmede açılır).
            </li>
            <li>
              ⏳ <strong>Yükleniyor:</strong> Yeşil placeholder + spinner (max
              12 sn, sonra fallback'a düşer).
            </li>
          </ul>
        </div>

        {/* Embedded Checkout — sayfanın en altı */}
        <div className="mt-16">
          <h2 className="text-center text-[#D5B356] font-bold text-[20px] md:text-[24px] mb-2">
            ↓ Sayfa İçi Ödeme Formu ↓
          </h2>
          <p className="text-center text-white/50 text-[13px] mb-6">
            Test kartı: <code className="text-[#D5B356]">4242 4242 4242 4242</code>{" "}
            · herhangi gelecek tarih · herhangi CVC
          </p>
          <VipEmbeddedCheckout ctaId="embed-test-cta" source="aiscaleapp" />
        </div>
      </div>
    </main>
  );
}
