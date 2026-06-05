import type { Metadata } from "next";
import { Suspense } from "react";
import CalendlyContent from "./CalendlyContent";

export const metadata: Metadata = {
  title: "Onboarding Görüşmesi | AI Scale App",
  description:
    "120 günlük planın hazır. 30 dakikalık onboarding görüşmesinde ekibimle birlikte planını yürürlüğe sok.",
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
