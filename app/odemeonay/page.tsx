import type { Metadata } from "next";
import { Suspense } from "react";
import OdemeonayContent from "./OdemeonayContent";

export const metadata: Metadata = {
  title: "Odeme Onayı | AI Scale App",
  description: "Satın alma işleminiz başarıyla tamamlandı.",
  robots: { index: false, follow: false },
};

export default function OdemeonayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OdemeonayContent />
    </Suspense>
  );
}
