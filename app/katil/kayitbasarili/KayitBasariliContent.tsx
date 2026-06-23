"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setAdvancedMatching } from "@/lib/meta-pixel";
import VipEmbeddedCheckout from "@/components/VipEmbeddedCheckout";

// MAIN VIP CTA artık Embedded Stripe Checkout (sayfa içi iframe).
// Eski yeşil "VIP Üyelere Şimdi Katıl" butonu (MainCheckoutCTA fonksiyonu hâlâ
// dosyada duruyor — geri dönmek gerekirse hazır) yerini sayfa içi ödeme formuna
// bıraktı. id="final-vip-cta" VipEmbeddedCheckout default ctaId'sinde — sayfanın
// üst/yan CTA butonları (scrollToFinalCTA) hâlâ buraya scroll eder.
//
// Fallback CHECKOUT_URL embed başarısız olursa (env yok / API hata) Payment Link.
const CHECKOUT_URL = "https://buy.stripe.com/cNi8wQ4mcb1HcZb71u3wQ0s";

const CTA_GRADIENT = "linear-gradient(271.63deg, #C19D44 -20%, #E8D48B 20%, #FDF3AD 50%, #E8D48B 80%, #C19D44 120%)";
const GREEN_GRADIENT = "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)";
const GOLD_BG_SUBTLE = "linear-gradient(223deg, rgba(170,129,60,0.14) 0%, rgba(170,129,60,0.10) 100%)";

function scrollToFinalCTA(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("final-vip-cta");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}

// /katil variant — thank-you URL'ini /katil altında tut, ana funnel'a karışma.
function getThankYouUrl(name: string, email: string) {
  const params = new URLSearchParams();
  if (name && name !== "Değerli Katılımcı") params.set("name", name);
  if (email) params.set("email", email);
  const qs = params.toString();
  return `/katil/kayitbasarili/tesekkurler${qs ? `?${qs}` : ""}`;
}

// variant:
//   "default" → ana sayfa (/) flow için (video yok)
//   "vip"     → /vip-mastermind flow için (tek video, "Kaydını Onaylamadan Önce:" altında)
interface KayitBasariliContentProps {
  variant?: "default" | "vip";
}

export default function KayitBasariliContent({
  variant = "default",
}: KayitBasariliContentProps = {}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Değerli Katılımcı";
  const email = searchParams.get("email") || "";
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const thankYouUrl = getThankYouUrl(name, email);

  useEffect(() => {
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

    // Countdown timer — /katil her gün yenilenen seminer (sonraki 20:00 TR)
    const updateCountdown = () => {
      const nowMs = Date.now();
      const turkeyNow = new Date(new Date(nowMs).toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
      const target = new Date(turkeyNow);
      if (turkeyNow.getHours() >= 20) target.setDate(target.getDate() + 1);
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
        <div className="max-w-[680px] mx-auto px-4 pt-5 pb-8">
          {/* 1. BEKLE! Hero — VIP paketi tarif eden urgency bloğu */}
          <div className="text-center mb-8 mt-1">
            {/* BEKLE! */}
            <h1
              className="font-black tracking-tight leading-none mb-[14px]"
              style={{
                fontSize: "clamp(49px, 10.9vw, 87px)",
                color: "#C19D44",
                textShadow: "0 4px 24px rgba(193,157,68,0.25)",
              }}
            >
              BEKLE!
            </h1>

            {/* Seminer teaser video — her iki variant'ta (default + vip)
                göründüğü pozisyon. vip-mastermind/kayitbasarili ile aynı
                yer ve görsel. */}
            <div className="max-w-2xl mx-auto mb-8">
              <div
                className="relative w-full overflow-hidden rounded-xl border border-white/10"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/cIbDH0lWMc0"
                  title="AI Scale Seminer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Ana mesaj */}
            <p className="text-white text-[19px] md:text-[26px] font-bold leading-snug mb-6 max-w-2xl mx-auto">
              <span style={{ color: "#D5B356" }} className="whitespace-nowrap">
                $2.000+ değerindeki VIP paketi
              </span>
              ,{" "}
              <span className="underline decoration-[#C19D44] decoration-2 underline-offset-4">
                sadece bu sayfaya özel
              </span>{" "}
              olarak açtık.
            </p>

            {/* Highlight: $9.90 */}
            <p className="text-white text-[20px] md:text-[29px] font-extrabold leading-tight mb-8 max-w-2xl mx-auto">
              Ve seminere başlamadan, sana bunu{" "}
              <span
                className="inline-block px-3 py-1 rounded-[6px] text-black mx-1 align-middle"
                style={{ background: CTA_GRADIENT }}
              >
                SADECE $9.90
              </span>{" "}
              karşılığında veriyoruz.
            </p>

            {/* PRIMARY CTA — "veriyoruz" altında, $9.90 vurgusunun hemen ardından.
                #final-vip-cta'ya scroll eder (yeşil MainCheckoutCTA). */}
            <CTABlock thankYouUrl={thankYouUrl} />

            {/* Zoom bildirim önizlemesi — kayıt başarılı olduğunda kullanıcıya
                "şimdi e-postana şu mail gelecek" diyerek beklenti netleştirir.
                herlastcall.com/natural-born-yapper-c referans alındı,
                Türkçeleştirildi. /katil her gün yenilenen webinara uyarlandı. */}
            <div className="text-center mb-8 mt-8">
              <h2 className="font-extrabold text-white text-[22px] md:text-[30px] leading-tight mb-1">
                Şimdi Sana{" "}
                <span className="inline-flex items-center gap-1.5 align-middle">
                  <span className="inline-block w-7 h-7 md:w-9 md:h-9 rounded-md bg-[#2D8CFF] flex items-center justify-center align-middle">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 8.59l4.7-3.13A1 1 0 0120 6.3v11.4a1 1 0 01-1.3.85L14 15.4V8.6zM3 6h9a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </span>
                  <span className="text-[#2D8CFF]">Zoom</span>
                </span>{" "}
                Bildirim E-postası{" "}
                <span className="underline decoration-[#e85d5d] decoration-[3px] underline-offset-4 text-[#e85d5d]">
                  Gelecek.
                </span>
              </h2>
              <p className="text-white/60 text-[13px] md:text-[15px] mb-5">
                E-postanı kontrol et — birkaç dakika içinde bu mail düşecek.
              </p>

              {/* Mock e-posta kartı — beyaz arka plan, hafif rotate, gerçekçi */}
              <div className="max-w-md mx-auto">
                <div
                  className="bg-[#f7f5ef] rounded-2xl shadow-2xl text-left p-5 md:p-6"
                  style={{
                    transform: "rotate(-1.5deg)",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  <p className="text-[#1a1a1a] text-[14px] md:text-[15px] mb-3">
                    Merhaba <span className="bg-gray-300 text-transparent rounded px-1.5 select-none">[isminiz]</span>,
                  </p>
                  <p className="text-[#1a1a1a] text-[14px] md:text-[15px] mb-4">
                    Aşağıdaki toplantıya katılmak için davet edildiniz.
                  </p>

                  <div className="space-y-2 text-[13px] md:text-[14px] mb-4">
                    <div className="flex gap-3">
                      <span className="text-[#888] font-medium min-w-[55px]">Konu</span>
                      <span className="text-[#1a1a1a] font-semibold">
                        Yapay Zeka Servet Transferi: Canlı Seminer
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[#888] font-medium min-w-[55px]">Sunucu</span>
                      <span className="text-[#1a1a1a] font-semibold">
                        Baturalp Tunalı
                      </span>
                    </div>
                  </div>

                  <p className="text-[#1a1a1a] text-[13px] md:text-[14px] mb-4">
                    Seminere katılmak için aşağıdaki butona tıklayın.
                  </p>

                  <button
                    type="button"
                    className="block w-full py-3 px-6 bg-[#2D8CFF] text-white font-bold text-[15px] md:text-[16px] rounded-lg cursor-default"
                    tabIndex={-1}
                  >
                    Toplantıya Katıl
                  </button>
                </div>
                <p className="text-white/40 text-[11px] mt-4 italic">
                  ↑ Önizleme — gerçek e-postan birkaç dakika içinde gelecek.
                </p>
              </div>
            </div>

            {/* Paket içeriği — dashed altın kart, üstü çizgili fiyatlar,
                "$2,000+ Değer · Sadece $9.90" başlık, "Sizin Tek Seferlik
                Yatırımınız" alt satırı. (Eski yeşil ✅ ChecklistItem listesi
                kaldırıldı, daha şık alt section'daki tasarım buraya taşındı.) */}
            <div className="max-w-xl mx-auto mb-6 text-left">
              <div
                className="rounded-[9px] border border-dashed border-[#AA813C]/60 p-5 md:p-7"
                style={{ background: GOLD_BG_SUBTLE }}
              >
                <h3 className="text-[18px] md:text-[24px] font-extrabold text-center mb-5">
                  $2,000+ Değer{" "}
                  <span className="text-[#D5B356] italic underline">
                    Sadece $9.90
                  </span>
                </h3>
                <div className="border-t border-[#AA813C]/30 mb-4" />
                <div className="space-y-3">
                  <PricingRow label="Manychat Kurulum Rehberi" value="$497" />
                  <PricingRow label="AI Automation Kiti" value="$997" />
                  <PricingRow label="AI Destekli İş Ölçekleme" value="$500" />
                  <PricingRow label="Lifetime Replay Access" value="$97" />
                </div>
                <div className="border-t border-[#AA813C]/30 mt-5 pt-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white/60 text-[13px] md:text-[14px] font-semibold">
                      Toplam Değer:
                    </span>
                    <span className="text-white/50 text-[13px] md:text-[14px] font-bold line-through">
                      $2,000+
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#D5B356] font-bold text-[14px] md:text-[15px]">
                      Sizin Tek Seferlik Yatırımınız:
                    </span>
                    <span className="text-[#D5B356] font-extrabold text-[18px] md:text-[20px]">
                      Sadece $9.90
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-white text-[18px] md:text-[22px] font-semibold mb-3">
              Hepsi bu pakette, hepsi senin için hazır.
            </p>

            <p className="text-white/60 text-[14px] md:text-[16px] italic max-w-xl mx-auto">
              Hızlı davranırsan, sen daha seminere bile katılmadan elinde olacak.
            </p>
          </div>

          {/* (Eski PRIMARY CTA'yı $9.90 vurgusunun altına taşıdık — yukarıda.
              Bu konumda eskiden "Hayır teşekkürler" decline butonu vardı,
              user kararı ile kaldırıldı — tek decline butonu artık testimonials
              bitiminde "Gerçek Başarı Hikayeleri" üstünde duruyor.) */}

          {/* 3. Hazırlıklı vs Hazırlıksız karşılaştırması — Ecom Degree pattern */}
          <div className="my-10">
            {/* RED BOX — Hazırlıksız */}
            <div
              className="rounded-[12px] border-2 border-dashed border-[#e85d5d]/70 p-5 md:p-7"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,93,93,0.10) 0%, rgba(232,93,93,0.04) 100%)",
              }}
            >
              <h4 className="text-white font-extrabold text-[18px] md:text-[22px] leading-tight mb-5">
                Seminere{" "}
                <span className="text-[#e85d5d]">Tamamen Hazırlıksız</span>{" "}
                Geldiğinde Olanlar:
              </h4>
              <div className="space-y-4">
                <ConCheckItem text="Kafan karışır, nereden başlayacağını bilemezsin..." />
                <ConCheckItem text="Tüm seminer boyunca temelleri anlamaya çalışırken, hazırlanan herkes çoktan noktaları birleştirip bir sonraki hamlesini planlıyor olur..." />
                <ConCheckItem text="Bir not defteri dolusu dağınık fikir ve net olmayan bir aksiyon planıyla ayrılırsın..." />
                <ConCheckItem text="Üç hafta sonra, hâlâ TEK BİR adım bile atamamış olursun..." />
              </div>
            </div>

            {/* OR badge */}
            <div className="flex justify-center my-5">
              <span
                className="inline-block px-5 py-1.5 rounded-[6px] text-black font-extrabold text-[14px] tracking-wider"
                style={{ background: CTA_GRADIENT }}
              >
                YA DA...
              </span>
            </div>

            {/* GOLD BOX — Hazırlıklı */}
            <div
              className="rounded-[12px] border-2 border-dashed border-[#AA813C]/70 p-5 md:p-7"
              style={{ background: GOLD_BG_SUBTLE }}
            >
              <h4 className="text-white font-extrabold text-[18px] md:text-[22px] leading-tight mb-5">
                Seminere{" "}
                <span className="text-[#D5B356]">Hazırlıklı</span>{" "}
                Geldiğini Düşün:
              </h4>
              <div className="space-y-4">
                <ProCheckItem text="Seminerden çıkar çıkmaz HEMEN uygulamaya başlarsın." />
                <ProCheckItem text="Diğerleri başlangıç seviyesi soruları sorarken, sen gerçekten para kazandıran soruları soruyor olursun." />
                <ProCheckItem text="Yetişmeye çalışmıyorsun — stratejik düşünüyor, doğru hamleleri planlıyor olursun." />
                <ProCheckItem text="Yapay zekanın nasıl çalıştığını çoktan anlamış olarak içeri girersin." />
              </div>
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

          {/* VIP Button under countdown — embed forma scroll eder */}
          <div className="text-center mb-6">
            <a href="#final-vip-cta" onClick={scrollToFinalCTA}>
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

          {/* (Eski "🎯 Seminere Tam Hazırlıklı Katıl" ve "5X GUARANTEE"
              section'ları kaldırıldı — user kararı: page daha az yorucu
              olsun.) */}

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

          {/* (Eski 8. Second CTA Block kaldırıldı — bir önceki CTABlock'a
              çok yakındı, duplikasyon hissi veriyordu.) */}

          {/* (10. Pricing Card buradan kaldırıldı — aynı tasarım BEKLE
              hero'sunun içine, "veriyoruz" altına taşındı; iki kez aynı
              fiyat kartını göstermeye gerek yok.) */}

          {/* MAIN VIP CTA — Embedded Stripe Checkout, kompakt ticket-stub
              kupon kartı içinde. Sayfanın geri kalanı zaten BEKLE/value
              stack/comparison anlatıyor; burada SADECE kısa urgency vurgusu
              + sarı fiyat badge + Stripe iframe var, tekrar yok.

              Sayfanın diğer CTABlock'ları (scrollToFinalCTA) buraya scroll
              eder — VipEmbeddedCheckout default ctaId="final-vip-cta". */}
          <div className="my-14 -mx-2 sm:mx-0">
            <div
              className="max-w-2xl mx-auto bg-white px-2 md:px-6 py-6 md:py-8 shadow-2xl"
              style={{
                border: "5px dashed #0a1429",
                borderRadius: "6px",
              }}
            >
              {/* Kompakt urgency başlık */}
              <h3
                className="text-center font-extrabold leading-tight mb-2"
                style={{
                  color: "#0a1429",
                  fontSize: "clamp(20px, 4vw, 30px)",
                }}
              >
                <span
                  className="inline-block px-2 py-0.5 rounded"
                  style={{
                    background: "#FFD200",
                    boxShadow:
                      "0 0 0 3px #FFD200, 0 4px 16px -6px rgba(255,210,0,0.55)",
                  }}
                >
                  Bu Sayfadan Ayrıldığında
                </span>
              </h3>
              <p
                className="text-center font-bold mb-6"
                style={{
                  color: "#0a1429",
                  fontSize: "clamp(15px, 2.5vw, 18px)",
                }}
              >
                Bu teklif <strong>kalıcı olarak kaybolur.</strong>
              </p>

              {/* Lacivert mini-section — Stripe iframe ve trust signals */}
              <div
                className="rounded-xl px-1.5 md:px-5 py-5 md:py-6 -mx-1 md:-mx-3"
                style={{ background: "#0a1429" }}
              >
                {/* Stripe güvenlik notu — ödeme formunun hemen üstünde, belirgin */}
                <div className="flex items-center justify-center gap-2 mb-4 rounded-lg bg-emerald-500/10 border border-emerald-400/30 px-3 py-2.5">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-emerald-100 font-semibold text-[12px] md:text-[13.5px] leading-snug text-center">
                    Ödeme bilgileriniz Stripe üzerinden şifrelenerek işlenir. Kart bilgileriniz sunucularımıza ulaşmaz.
                  </span>
                </div>
                <VipEmbeddedCheckout
                  email={email || undefined}
                  name={name !== "Değerli Katılımcı" ? name : undefined}
                  source="aiscaleapp"
                  // Funnel tracking — iframe görününce InitiateCheckout,
                  // iframe'e ilk dokununca AddToCart fire eder. Browser
                  // pixel + CAPI dedup ile.
                  funnelTag="Katil Funnel Checkout"
                />
              </div>
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
            {/* 4 video — Yapay zekây + 3 yeni Shorts. Mobile: yatay
                kaydırılabilir snap; Desktop: 2x2 grid (md:grid-cols-2)
                veya 4 col (lg:grid-cols-4). */}
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { id: "sVSMnqWUvec", title: "Başarı Hikayesi 2" },
                { id: "NPNH0P4ZRT4", title: "Başarı Hikayesi 4" },
                { id: "A_wuadae_3o", title: "Başarı Hikayesi 3" },
                { id: "nWvImM9U2NQ", title: "Başarı Hikayesi — Yapay Zeka" },
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
            {/* Final CTA — yukarıdaki embed checkout'a scroll eder */}
            <a href="#final-vip-cta" onClick={scrollToFinalCTA} className="relative block rounded-[10px] overflow-hidden hover:brightness-105 hover:scale-[1.02] transition-all cursor-pointer animate-cta-attention"><span className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/3 z-10 animate-cta-shine" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }} />
              <div className="py-5 px-6 text-center" style={{ background: CTA_GRADIENT }}>
                <div className="text-black font-extrabold text-[18px] md:text-[24px] leading-tight">
                  EVET, $9.90 VIP&apos;e Katılmak İstiyorum →
                </div>
                <div className="text-black/65 text-[13px] mt-2 font-semibold">
                  Sadece $9.90 · Tek seferlik ödeme
                </div>
              </div>
            </a>
          </div>

          {/* Sayfa sonu decline kutusu — en altta ikinci çıkış kapısı */}
          <div className="mt-2 mb-10 px-2">
            <a
              href={thankYouUrl}
              className="block max-w-2xl mx-auto rounded-[10px] bg-[#1a1a1a] border border-white/15 hover:bg-[#222] hover:border-white/25 transition-all px-5 py-4 text-center cursor-pointer"
            >
              <div className="text-white/80 text-[14px] md:text-[15px] font-semibold">
                Hayır teşekkürler, VIP paketini almadan seminere katılacağım
              </div>
              <div className="text-white/40 text-[11px] md:text-[12px] mt-1 leading-snug">
                Bu teklifin sayfadan ayrıldığım anda sonsuza dek kaybolacağını
                ve bir daha asla göremeyeceğimi anlıyorum
              </div>
            </a>
          </div>

        </div>
      </main>
    </>
  );
}

/* ─── Sub-components ─── */

function MainCheckoutCTA() {
  return (
    <div className="my-6">
      {/* Tek asıl Stripe butonu — yeşil, sayfadaki tüm üst/alt butonlar buraya scroll eder.
          buy.stripe.com Payment Link'ine yeni sekmede yönlendirir. */}
      <a
        id="final-vip-cta"
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-[10px] overflow-hidden hover:brightness-110 transition-all shadow-lg shadow-emerald-500/30 scroll-mt-24"
      >
        <div className="py-5 px-6 text-center" style={{ background: GREEN_GRADIENT }}>
          <div className="text-white font-extrabold text-[18px] md:text-[24px] leading-tight">
            EVET, $9.90 VIP&apos;e Katılmak İstiyorum →
          </div>
          <div className="text-white/85 text-[13px] mt-2 font-semibold">
            Sadece $9.90 · Tek seferlik ödeme
          </div>
        </div>
      </a>
    </div>
  );
}

function CTABlock({ thankYouUrl: _thankYouUrl }: { thankYouUrl: string }) {
  return (
    <div className="my-6">
      {/* Üst CTA butonları: aşağıdaki embed checkout'a (#final-vip-cta) scroll eder */}
      <a href="#final-vip-cta" onClick={scrollToFinalCTA} className="relative block rounded-[10px] overflow-hidden hover:brightness-105 hover:scale-[1.02] transition-all cursor-pointer animate-cta-attention"><span className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/3 z-10 animate-cta-shine" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }} />
        <div className="py-5 px-6 text-center" style={{ background: CTA_GRADIENT }}>
          <div className="text-black font-extrabold text-[18px] md:text-[24px] leading-tight">
            EVET, $9.90 VIP&apos;e Katılmak İstiyorum →
          </div>
          <div className="text-black/65 text-[13px] mt-2 font-semibold">
            Sadece $9.90 · Tek seferlik ödeme
          </div>
        </div>
      </a>
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

function ChecklistItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3 py-2 border-b border-white/10 last:border-0">
      <span className="text-[#22c55e] text-[18px] md:text-[20px] flex-shrink-0 leading-none">
        ✅
      </span>
      <span className="flex-1 text-white text-[14px] md:text-[16px] font-semibold leading-snug">
        {title}
      </span>
      <span className="text-[#D5B356] text-[13px] md:text-[14px] font-bold whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}

function PricingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-white/75 text-[13px] md:text-[14px] inline-flex items-center gap-2">
        <span className="text-[15px] md:text-[17px] leading-none flex-shrink-0">
          ✅
        </span>
        <span>{label}</span>
      </span>
      <span className="text-white/45 text-[13px] md:text-[14px] font-semibold whitespace-nowrap">
        (Değer:{" "}
        <span className="line-through decoration-[1.5px]">{value}</span>)
      </span>
    </div>
  );
}

function ConCheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 w-6 h-6 rounded-[4px] bg-[#e85d5d]/15 border border-[#e85d5d]/50 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-[#e85d5d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed">{text}</p>
    </div>
  );
}

function ProCheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
        style={{ background: "linear-gradient(135deg, #C19D44 0%, #E8D48B 100%)" }}
      >
        <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-white/85 text-[14px] md:text-[15px] leading-relaxed">{text}</p>
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
