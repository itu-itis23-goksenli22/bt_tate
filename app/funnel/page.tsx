import type { Metadata } from "next";
import { Suspense } from "react";
import FunnelContent from "./FunnelContent";

export const metadata: Metadata = {
  title: "Instagram Funnel | Online Koçlar & Danışmanlar | AI Scale Funnel",
  description:
    "7 gün içinde Instagram'ından aylık 100.000 TL kazandıracak funnel kurma sistemini öğren. Online koçlar, danışmanlar ve işletmeler için.",
  robots: { index: false, follow: false }, // ad traffic only
};

export default function FunnelPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
        </main>
      }
    >
      <FunnelContent />
    </Suspense>
  );
}
