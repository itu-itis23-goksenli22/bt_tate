import type { Metadata } from "next";
import { Suspense } from "react";
import TesekkurlerContent from "./TesekkurlerContent";

export const metadata: Metadata = {
  title: "Kayıt Onayı - AI Semineri | AI Scale",
  description:
    "Webinar kaydınız onaylandı. Eğitim detaylarınızı kontrol edin!",
  robots: { index: false, follow: false },
};

export default function TesekkurlerPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </main>
      }
    >
      <TesekkurlerContent />
    </Suspense>
  );
}
