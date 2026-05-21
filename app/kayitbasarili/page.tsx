import type { Metadata } from "next";
import { Suspense } from "react";
import KayitBasariliContent from "./KayitBasariliContent";

export const metadata: Metadata = {
  title: "Kayıt Başarılı - Ücretsiz AI Semineri | AI Scale",
  description:
    "Seminer kaydınız başarıyla tamamlandı. Bonus paketinizi hemen indirin!",
  robots: { index: false, follow: false },
};

export default function KayitBasariliPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </main>
      }
    >
      <KayitBasariliContent />
    </Suspense>
  );
}
