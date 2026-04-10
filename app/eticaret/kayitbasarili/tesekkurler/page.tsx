import type { Metadata } from "next";
import { Suspense } from "react";
import EticaretTesekkurlerContent from "./EticaretTesekkurlerContent";

export const metadata: Metadata = {
  title: "Kayıt Onayı - Ücretsiz E-Ticaret Semineri | Dijital Akademi",
  description:
    "E-Ticaret webinar kaydınız onaylandı. Seminer detaylarınızı kontrol edin!",
  robots: { index: false, follow: false },
};

export default function EticaretTesekkurlerPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </main>
      }
    >
      <EticaretTesekkurlerContent />
    </Suspense>
  );
}
