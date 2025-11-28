import { Suspense } from "react";
import WebinarSuccessContent from "./WebinarSuccessContent";

export const metadata = {
  title: "🎉 Kayıt Başarılı - Ücretsiz AI Semineri",
  description: "Webinar kaydınız başarıyla tamamlandı. Bonus paketinizi hemen indirin!",
};

export default function WebinarKayitPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <WebinarSuccessContent />
    </Suspense>
  );
}
