// VIP Mastermind kayıt başarılı sayfası — /vip-mastermind form submit sonrası
// buraya yönlendirilir. İçerik /kayitbasarili ile aynı KayitBasariliContent
// component'inden gelir, sadece `variant="vip"` ile çağrılır:
//   → BEKLE! hero + VIP paketi içerikleri aynen
//   → Üst videosu YOK (default flow'da da yok)
//   → "Hızlı davranırsan..." altında TEK video gösterilir (sadece bu variant'ta)

import type { Metadata } from "next";
import { Suspense } from "react";
import KayitBasariliContent from "@/app/kayitbasarili/KayitBasariliContent";

export const metadata: Metadata = {
  title: "Kayıt Başarılı - VIP Mastermind | AI Scale",
  description:
    "VIP Mastermind kaydınız başarıyla tamamlandı. Bonus paketinizi hemen indirin!",
  robots: { index: false, follow: false },
};

export default function VipMastermindKayitBasariliPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </main>
      }
    >
      <KayitBasariliContent variant="vip" />
    </Suspense>
  );
}
