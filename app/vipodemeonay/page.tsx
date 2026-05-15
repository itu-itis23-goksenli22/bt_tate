import type { Metadata } from "next";
import { Suspense } from "react";
import VipOdemeonayContent from "./VipOdemeonayContent";

export const metadata: Metadata = {
  title: "VIP Üyeliğiniz Onaylandı | AI Scale",
  description:
    "VIP paketiniz hesabınıza tanımlandı. Yapay Zeka Başlangıç Paketinize hemen erişin.",
  robots: { index: false, follow: false },
};

export default function VipOdemeonayPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </main>
      }
    >
      <VipOdemeonayContent />
    </Suspense>
  );
}
