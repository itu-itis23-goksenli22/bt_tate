"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setAdvancedMatching } from "@/lib/meta-pixel";

const CHECKOUT_URL = "https://buy.stripe.com/cNi8wQ4mcb1HcZb71u3wQ0s";

const CTA_GRADIENT = "linear-gradient(271.63deg, #C19D44 -20%, #E8D48B 20%, #FDF3AD 50%, #E8D48B 80%, #C19D44 120%)";
const GOLD_BG_SUBTLE = "linear-gradient(223deg, rgba(170,129,60,0.14) 0%, rgba(170,129,60,0.10) 100%)";

function getThankYouUrl(name: string, email: string) {
  const params = new URLSearchParams();
  if (name && name !== "Değerli Katılımcı") params.set("name", name);
  if (email) params.set("email", email);
  const qs = params.toString();
  return `/kayitbasarili/tesekkurler${qs ? `?${qs}` : ""}`;
}

export default function EticaretKayitBasariliContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Değerli Katılımcı";
  const email = searchParams.get("email") || "";
  const [webinarDate, setWebinarDate] = useState("");
  const [webinarDay, setWebinarDay] = useState("");
  const [webinarFull, setWebinarFull] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const thankYouUrl = getThankYouUrl(name, email);

  useEffect(() => {
    const dayNames = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const now = new Date();
    const turkey = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
    const currentHour = turkey.getHours();
    const eventDate = new Date(turkey);
    if (currentHour >= 20) {
      eventDate.setDate(eventDate.getDate() + 1);
    }
    eventDate.setHours(20, 0, 0, 0);

    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    setWebinarDate(`${day}.${month}.${year}`);
    setWebinarDay(dayNames[eventDate.getDay()]);
    setWebinarFull(`${day}.${month} ${dayNames[eventDate.getDay()]} 20:00`);

    const regDay = String(turkey.getDate()).padStart(2, "0");
    const regMonth = String(turkey.getMonth() + 1).padStart(2, "0");
    const regYear = turkey.getFullYear();
    setRegistrationDate(`${regDay}.${regMonth}.${regYear}`);

    if (email) {
      const nameParts = name.split(" ");
      setAdvancedMatching({
        em: email,
        fn: nameParts[0] || "",
        ln: nameParts.slice(1).join(" ") || "",
      });
    }
    // Note: CompleteRegistration is already fired in RegistrationModal with
    // proper eventId for dedup. Do NOT fire again here to avoid duplicates.

    // Countdown timer
    const updateCountdown = () => {
      const nowMs = Date.now();
      const turkeyNow = new Date(new Date(nowMs).toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
      const target = new Date(turkeyNow);
      if (turkeyNow.getHours() >= 20) {
        target.setDate(target.getDate() + 1);
      }
      target.setHours(20, 0, 0, 0);

      const diff = target.getTime() - turkeyNow.getTime();
      if (diff <= 0) return;

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <main className="min-h-screen bg-[#0c0c0c] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* 1. Solid Gold Banner - Remind user of webinar time */}
        <div className="bg-[#C19D44] text-center py-3 px-4">
          <p className="text-black font-semibold text-[14px] md:text-[16px]">
            📅 Webinara şu saatte katılmayı unutmayın: {webinarFull || "..."}
          </p>
        </div>

        <div className="max-w-[680px] mx-auto px-4 py-8">
          {/* 2. Email Notification Banner */}
          <div className="mb-8 rounded-[9px] border-2 border-[#C19D44] p-5 md:p-6"
            style={{ background: GOLD_BG_SUBTLE }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-6 h-6 text-[#C19D44] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-[18px] md:text-[20px] font-bold text-[#C19D44]">
                Katılım Linkiniz E-posta Adresinize Gönderildi!
              </h2>
            </div>
            <p className="text-white/70 text-[14px] md:text-[15px] text-center leading-relaxed">
              E-posta adresinize bir <strong className="text-white">Zoom katılım linki</strong> gönderdik.{" "}
              <strong className="text-white">{webinarDate} {webinarDay} saat 20:00{"'"}da</strong>{" "}
              e-postanızdaki linke tıklayın, Zoom açılacak ve canlı seminere katılacaksınız.
              E-postayı bulamıyorsanız <strong className="text-white">spam/gereksiz</strong> klasörünü de kontrol edin.
            </p>
            {registrationDate && (
              <p className="text-white/40 text-[12px] text-center mt-3">
                Kayıt tarihiniz: {registrationDate}
              </p>
            )}
          </div>

          {/* 3. Main Heading */}
          <div className="text-center mb-6">
            <h1 className="text-[32px] md:text-[44px] font-extrabold leading-[1.12] mb-3">
              Aşağıdaki Videoyu İzleyenler{" "}
              <span className="block">Büyük Bir Avantaj Elde Ediyor...</span>
            </h1>
            <p className="text-white/40 text-[14px]">
              İşte Tek Seferlik <span className="italic font-semibold text-white/60">VIP Üye</span> Olma Fırsatınız
            </p>
          </div>

          {/* 3. Video Section */}
          <div className="mb-3">
            <p className="text-center text-[10px] text-white/25 uppercase tracking-[3px] mb-1">
              BU VİDEO HAYATINIZI DEĞİŞTİREBİLİR
            </p>
            <p className="text-center text-[#C19D44] text-[10px] font-bold uppercase tracking-[2px] mb-3">
              BUNU GERÇEKTEN PAS MI GEÇECEKSİNİZ!?
            </p>
            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/cIbDH0lWMc0"
                title="VIP Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="text-center mb-8 mt-6">
            <p className="text-white font-bold text-[16px] mb-4">Eğitim Başlamasına Kalan Süre:</p>
            <div className="flex justify-center items-center gap-3">
              <CountdownBox value={countdown.hours} label="Saat" />
              <span className="text-white/60 text-[28px] font-bold">:</span>
              <CountdownBox value={countdown.minutes} label="Dakika" />
              <span className="text-white/60 text-[28px] font-bold">:</span>
              <CountdownBox value={countdown.seconds} label="Saniye" />
            </div>
          </div>

          {/* VIP Button under video */}
          <div className="text-center mb-6">
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
              <button className="text-white font-bold text-[15px] px-7 py-2.5 rounded-md shadow-md hover:brightness-110 transition-all cursor-pointer inline-flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)" }}>
                💎 VIP Üye Ol ✅
              </button>
            </a>
          </div>

          {/* Social Proof Bar */}
          <div className="text-center mb-6 space-y-1.5">
            <p className="text-[#C19D44] text-[12px] font-semibold">
              ⚠️ VIP Kontenjanlar SINIRLI - AI Toolkit özel erişimi nedeniyle
            </p>
            <TrustpilotBadge />
          </div>

          {/* First CTA Block */}
          <CTABlock thankYouUrl={thankYouUrl} />

          {/* Seminere Hazırlık — VIP'i hazırlık olarak konumlandır */}
          <div className="my-10 rounded-[9px] border border-dashed border-[#AA813C]/40 p-6 md:p-8"
            style={{ background: GOLD_BG_SUBTLE }}>
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-center mb-2">
              🎯 Seminere Tam Hazırlıklı <span className="text-[#D5B356]">Katıl</span>
            </h2>
            <p className="text-white/50 text-[13px] text-center mb-6 max-w-lg mx-auto">
              VIP üyeler seminere hazırlanıp geldiği için çok daha fazla sonuç alıyor
            </p>
            <div className="space-y-5 max-w-lg mx-auto">
              <PrepItem text="Seminere gelmeden Manychat ve AI Shopify rehberlerini inceleyerek temel bilgileri öğren — seminerde ileri seviye taktiklere odaklanabilirsin" />
              <PrepItem text="Milyon dolarlık strateji kitinden başarılı iş modellerini analiz et — seminerde kendi planını oluşturmanı kolaylaştırır" />
              <PrepItem text="VIP üyeler seminerde birebir soru-cevap hakkına sahip — sorularını şimdiden hazırla" />
              <PrepItem text="Kayıtları sonsuza kadar izle — kaçırdığın detayları tekrar tekrar izleyerek uygulayabilirsin" />
            </div>
            <div className="text-center mt-6">
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                <button className="text-black font-bold text-[14px] px-6 py-2.5 rounded-md hover:brightness-110 transition-all cursor-pointer"
                  style={{ background: CTA_GRADIENT }}>
                  Tüm bunlar sadece $9.90 — Hemen Hazırlanmaya Başla →
                </button>
              </a>
            </div>
          </div>

          {/* 6. 5X Guarantee */}
          <div className="my-10 rounded-[9px] border border-dashed border-[#AA813C]/40 p-6 md:p-8 text-center"
            style={{ background: GOLD_BG_SUBTLE }}>
            <div className="inline-block mb-4">
              <div className="w-[90px] h-[90px] mx-auto rounded-full flex items-center justify-center border-[3px] border-[#AA813C]/50"
                style={{ background: CTA_GRADIENT }}>
                <div className="text-center leading-tight">
                  <div className="text-[22px] font-extrabold text-black">5X</div>
                  <div className="text-[7px] font-bold text-black/60 uppercase tracking-wider">GUARANTEE</div>
                  <div className="text-black/50 text-xs">✓</div>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-[14px] max-w-lg mx-auto leading-relaxed">
              Eğitimimize katılın ve VIP kaynaklarını kullanın. Eğer ödediğinizin en az 5 katı değer bulamadığınızı düşünürseniz,{" "}
              <a href="mailto:info@aiscale.app" className="text-blue-400 underline">info@aiscale.app</a>{" "}
              adresine yazmanız yeterli — paranızın tamamını iade ederiz, soru sormadan!
            </p>
            <p className="mt-4">
              <a href={thankYouUrl} className="text-white/30 text-[12px] underline italic hover:text-white/40 transition-colors">
                Hayır, ücretsiz webinara devam edeceğim
              </a>
            </p>
          </div>

          {/* 7. Social Proof - Entrepreneurs */}
          <div className="text-center my-8">
            <div className="flex justify-center -space-x-1 mb-2">
              {["bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-rose-600", "bg-amber-500", "bg-pink-600", "bg-indigo-600"].map((color, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${color} border-[1.5px] border-[#0c0c0c] flex items-center justify-center text-white text-[9px] font-bold`}>
                  {["E", "S", "B", "A", "K", "M", "T"][i]}
                </div>
              ))}
            </div>
            <p className="text-white/50 text-[12px]">
              <span className="font-bold text-white/70">60,000+</span> girişimci eğitimimize katıldı
            </p>
          </div>

          {/* 8. Second CTA Block */}
          <CTABlock thankYouUrl={thankYouUrl} />

          {/* 9. VIP Member Benefits */}
          <div className="my-10 rounded-[9px] border border-dashed border-[#AA813C]/40 p-6 md:p-10"
            style={{ background: GOLD_BG_SUBTLE }}>
            <h2 className="text-[26px] md:text-[34px] font-extrabold text-center leading-tight mb-1">
              VIP Üye Olarak Neler
            </h2>
            <h2 className="text-[26px] md:text-[34px] font-extrabold text-center mb-8">
              <span className="text-[#D5B356]">Elde Edeceksiniz</span>
            </h2>
            <div className="space-y-7">
              <BenefitItem
                title="Manychat Kurulum Rehberi ($497 Değerinde)"
                description="Instagram ve Messenger otomasyonlarınızı profesyonelce kurmanız için adım adım rehber. Müşterilerinize otomatik yanıt verin, satışlarınızı artırın."
              />
              <BenefitItem
                title="AI Shopify Kurulum Rehberi ($597 Değerinde)"
                description="Yapay zeka destekli araçlarla Shopify mağazanızı sıfırdan kurun. Ürün araştırmasından mağaza tasarımına kadar her adım detaylı anlatılıyor."
              />
              <BenefitItem
                title="Milyon Dolarlık AI Automation Kiti ($997 Değerinde)"
                description="Yılların deneme yanılmasını atlayın. Halihazırda milyonlarca dolar kazandıran işletmeleri inceleyerek aynı stratejileri kendi işinize uygulayın."
              />
              <BenefitItem
                title="Lifetime Replay Access ($97 Değerinde)"
                description="Etkinliğin bir dakikasını bile kaçırsanız... ya da tekrar izlemek isterseniz, kayıtlara SONSUZA KADAR erişim hakkınız var."
              />
            </div>
          </div>

          {/* 10. Pricing Card */}
          <div className="my-8">
            <div className="rounded-[9px] border border-dashed border-[#AA813C]/60 p-6 md:p-8"
              style={{ background: GOLD_BG_SUBTLE }}>
              <h3 className="text-[22px] md:text-[28px] font-extrabold text-center mb-6">
                $2,000+ Değer{" "}
                <span className="text-[#D5B356] italic underline">Sadece $9.90</span>
              </h3>
              <div className="border-t border-[#AA813C]/30 mb-5" />
              <div className="space-y-3">
                <PricingRow label="Manychat Kurulum Rehberi" value="$497" />
                <PricingRow label="AI Shopify Kurulum Rehberi" value="$597" />
                <PricingRow label="Milyon Dolarlık AI Automation Kiti" value="$997" />
                <PricingRow label="Lifetime Replay Access" value="$97" />
              </div>
              <div className="border-t border-[#AA813C]/30 mt-5 pt-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-[14px] font-semibold">Toplam Değer:</span>
                  <span className="text-white/60 text-[14px] font-bold">$2,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#D5B356] font-bold text-[15px]">Sizin Tek Seferlik Yatırımınız:</span>
                  <span className="text-[#D5B356] font-extrabold text-[20px]">Sadece $9.90</span>
                </div>
              </div>
            </div>
          </div>

          {/* 11. Third CTA Block */}
          <CTABlock thankYouUrl={thankYouUrl} />

          {/* 12. Testimonials */}
          <div className="my-10 text-center">
            <h2 className="text-[26px] md:text-[34px] font-extrabold mb-1">
              Diğer VIP Üyeler Ne
            </h2>
            <h2 className="text-[26px] md:text-[34px] font-extrabold mb-8">
              <span className="text-[#D5B356]">Diyor...</span>
            </h2>
            <div className="space-y-4 max-w-lg mx-auto">
              <TestimonialCard
                name="Elif K."
                role="AI Scale Topluluk Üyesi"
                text="Katıldığım en iyi eğitimlerden biriydi! Herkese tavsiye ederim."
                initial="E"
              />
              <TestimonialCard
                name="Burak D."
                role="AI Scale Topluluk Üyesi"
                text="VIP üyeliği almayı neredeyse pas geçiyordum ama çok iyi ki geçmedim. Birebir soru-cevap oturumu tam da ihtiyacım olan şeydi. Aldığım tek bir taktik bile ödediğimin 10 katını hak ediyordu."
                initial="B"
              />
            </div>
            <div className="mt-8">
              <TrustpilotBadge />
            </div>
          </div>

          {/* Başarı Hikayeleri — Gerçek Sonuçlar */}
          <div className="my-10">
            <h2 className="text-[26px] md:text-[34px] font-extrabold text-center mb-1">
              Gerçek <span className="text-[#D5B356]">Başarı Hikayeleri</span>
            </h2>
            <p className="text-white/40 text-[14px] text-center mb-6">
              AI Scale topluluğundan gerçek sonuçlar
            </p>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { id: "U17038k3dZs", title: "Başarı Hikayesi 1" },
                { id: "nWvImM9U2NQ", title: "Başarı Hikayesi 2" },
                { id: "24sobDc1m-8", title: "Başarı Hikayesi 3" },
              ].map((video) => (
                <div key={video.id} className="snap-center shrink-0 w-[70vw] sm:w-[55vw] md:w-auto md:shrink">
                  <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black" style={{ paddingBottom: "177.78%" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 13. Final Urgency CTA */}
          <div className="my-8 rounded-[9px] border border-dashed border-[#AA813C]/40 p-8 md:p-12 text-center"
            style={{ background: GOLD_BG_SUBTLE }}>
            <h2 className="text-[28px] md:text-[38px] font-extrabold mb-1">
              Bu Tek Seferlik Teklifi
            </h2>
            <h2 className="text-[28px] md:text-[38px] font-extrabold mb-3">
              <span className="text-[#D5B356]">Kaçırmayın</span>
            </h2>
            <p className="text-[#e85d5d] text-[13px] mb-6">
              Bu sayfa kapanacak ve bu teklifi bir daha göremeyeceksiniz.
            </p>
            {/* CTA buton + alt yazı tek blok */}
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block rounded-[10px] overflow-hidden hover:brightness-105 transition-all">
              <div className="py-5 px-6" style={{ background: CTA_GRADIENT }}>
                <div className="text-black font-extrabold text-[22px] md:text-[28px]">
                  VIP Üyelere Şimdi Katıl &raquo;
                </div>
                <div className="text-black/50 text-[13px] mt-1">
                  Yapay Zeka ile ilk adımını hemen at
                </div>
              </div>
            </a>
            <p className="text-white/40 text-[12px] mt-4">%100 Para İade Garantisi</p>
          </div>

          {/* Final No Thank You - Full width solid gray */}
          <NoThankYouButton href={thankYouUrl} />
        </div>
      </main>
    </>
  );
}

/* ─── Sub-components ─── */

function CTABlock({ thankYouUrl }: { thankYouUrl: string }) {
  return (
    <div className="my-6">
      {/* CTA buton + alt yazı tek blok */}
      <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block rounded-[10px] overflow-hidden hover:brightness-105 transition-all">
        <div className="py-5 px-6 text-center" style={{ background: CTA_GRADIENT }}>
          <div className="text-black font-extrabold text-[22px] md:text-[28px]">
            VIP Üyelere Şimdi Katıl &raquo;
          </div>
          <div className="text-black/50 text-[13px] mt-1">
            Yapay Zeka ile ilk adımını hemen at
          </div>
        </div>
      </a>

      {/* No Thank You - Full width solid gray */}
      <NoThankYouButton href={thankYouUrl} />
    </div>
  );
}

function NoThankYouButton({ href }: { href: string }) {
  return (
    <div className="mt-3">
      <a href={href} className="block bg-[#333] rounded-[10px] py-4 px-6 text-center hover:bg-[#3a3a3a] transition-colors">
        <div className="text-white/60 text-[14px] font-medium">Hayır Teşekkürler.</div>
        <div className="text-white/35 text-[12px] mt-0.5">
          &quot;Özel VIP Deneyimini&quot; kaçırmayı tercih ediyorum
        </div>
      </a>
    </div>
  );
}

function BenefitItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3 items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
      {/* Gold checkmark circle - emoji style */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C19D44]/25 border border-[#C19D44]/50 flex items-center justify-center mt-0.5">
        <svg className="w-4 h-4 text-[#C19D44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="text-[14px] md:text-[16px] font-bold text-white mb-1">{title}</h3>
        <p className="text-white/45 text-[13px] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function PricingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white/60 text-[14px]">{label}</span>
      <span className="text-white/50 text-[14px] font-semibold">(Değer: {value})</span>
    </div>
  );
}

function TestimonialCard({ name, role, text, initial }: { name: string; role: string; text: string; initial: string }) {
  return (
    <div className="rounded-[10px] bg-[#222] border border-white/5 p-6 text-left">
      <div className="flex items-center gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className="w-5 h-5 text-[#f5c518]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-white/70 text-[14px] mb-4 leading-relaxed">&quot;{text}&quot;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 font-bold text-[14px]">
          {initial}
        </div>
        <div>
          <p className="text-white/80 font-semibold text-[14px]">{name}</p>
          <p className="text-white/40 text-[12px]">{role}</p>
        </div>
      </div>
    </div>
  );
}

function PrepItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C19D44]/25 border border-[#C19D44]/50 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-[#C19D44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-white/70 text-[14px] leading-relaxed">{text}</p>
    </div>
  );
}

function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#AA813C]/40 rounded-lg px-4 py-3 min-w-[75px]">
      <div className="text-[#C19D44] text-[28px] md:text-[36px] font-extrabold leading-none">{value}</div>
      <div className="text-white/40 text-[11px] mt-1">{label}</div>
    </div>
  );
}

function TrustpilotBadge() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-[#00b67a] text-[16px]">★</span>
      <span className="text-white text-[14px] font-semibold">Trustpilot</span>
      <span className="text-[#00b67a] font-bold text-[14px]">1,500+</span>
      <div className="flex gap-[1px]">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="w-[20px] h-[20px] bg-[#00b67a] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        ))}
      </div>
      <span className="text-[#00b67a] text-[14px] font-semibold">Reviews</span>
    </div>
  );
}
