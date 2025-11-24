import { Suspense } from "react";
import PurchaseSuccessContent from "./PurchaseSuccessContent";

export default function SatinAlmaPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <PurchaseSuccessContent />
    </Suspense>
  );
}
