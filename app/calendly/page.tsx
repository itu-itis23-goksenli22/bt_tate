import type { Metadata } from "next";
import { Suspense } from "react";
import CalendlyContent from "./CalendlyContent";

export const metadata: Metadata = {
  title: "Strateji Görüşmesi | AI Scale App",
  description:
    "Topluluk üyeliğin aktif. Şimdi sıra bire bir strateji görüşmesinde — 90 günlük AI yol haritanı ekibimle birlikte çıkar.",
  robots: { index: false, follow: false },
};

export default function CalendlyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CalendlyContent />
    </Suspense>
  );
}
