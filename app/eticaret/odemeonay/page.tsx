import type { Metadata } from "next";
import { Suspense } from "react";
import EticaretOdemeonayContent from "./EticaretOdemeonayContent";

export const metadata: Metadata = {
  title: "Odeme Onayı | Dijital Akademi",
  description: "Satın alma işleminiz başarıyla tamamlandı.",
  robots: { index: false, follow: false },
};

export default function EticaretOdemeonayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <EticaretOdemeonayContent />
    </Suspense>
  );
}
