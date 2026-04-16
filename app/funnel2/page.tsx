import type { Metadata } from "next";
import { Suspense } from "react";
import FunnelContent from "./FunnelContent";

export const metadata: Metadata = {
  title: "Funnel. — Online Koçlar İçin Instagram Sistemi",
  description:
    "Türkiye'de 100+ koçun aylık 100.000 TL'ye ölçeklenmek için kullandığı sistemin aynısı. 7 günde kuralım.",
  robots: { index: false, follow: false },
};

export default function FunnelPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#EFE7D2] flex items-center justify-center">
          <div className="text-[#1A2A1F] text-[11px] tracking-[0.3em] uppercase font-mono">
            Yükleniyor
          </div>
        </main>
      }
    >
      <FunnelContent />
    </Suspense>
  );
}
