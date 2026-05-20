"use client";

// /kayitbasarili — Ticket-stub coupon stili sayfa (Devin Jatho "Walmart Fast-Track" pattern)
//
// Tasarım:
//   - Dış arka plan: koyu lacivert (#0a1429)
//   - İç kart: beyaz, 5px dashed lacivert kenarlık (kupon perforasyon hissi)
//   - Altın metin (#C19D44) + sarı highlight blokları (#FFD200)
//   - Embed Stripe Checkout altta, koyu lacivert mini-section içinde
//   - Decline link (thank you page'e yönlendiren) en altta
//
// variant prop:
//   "default" → ana sayfa (/) flow (video yok)
//   "vip"     → /vip-mastermind flow (headline altında YouTube videosu var)

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { setAdvancedMatching } from "@/lib/meta-pixel";
import VipEmbeddedCheckout from "@/components/VipEmbeddedCheckout";

const NAVY = "#0a1429";
const GOLD = "#C19D44";
const YELLOW = "#FFD200";

function getThankYouUrl(name: string, email: string) {
  const params = new URLSearchParams();
  if (name && name !== "Değerli Katılımcı") params.set("name", name);
  if (email) params.set("email", email);
  const qs = params.toString();
  return `/kayitbasarili/tesekkurler${qs ? `?${qs}` : ""}`;
}

interface KayitBasariliContentProps {
  variant?: "default" | "vip";
}

export default function KayitBasariliContent({
  variant = "default",
}: KayitBasariliContentProps = {}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Değerli Katılımcı";
  const email = searchParams.get("email") || "";
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
  }, [email, name]);

  return (
    <main
      className="min-h-screen py-8 md:py-14 px-3 md:px-6"
      style={{ background: NAVY, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* TICKET STUB — beyaz kart, kesik dashed kenar */}
      <div
        className="max-w-3xl mx-auto bg-white px-6 md:px-12 py-10 md:py-14 shadow-2xl"
        style={{
          border: `5px dashed ${NAVY}`,
          borderRadius: "6px",
        }}
      >
        {/* PRE-HEADLINE */}
        <p
          className="text-center text-[15px] md:text-[18px] font-semibold mb-3"
          style={{ color: NAVY }}
        >
          Ama Çok Lafı Uzatmadan...
        </p>

        {/* HEADLINE — "Çünkü Bu Teklif KALICI OLARAK KAYBOLUYOR Bu Sayfadan Ayrıldığın Anda" */}
        <h2
          className="text-center font-extrabold leading-tight"
          style={{ color: NAVY, fontSize: "clamp(28px, 5.5vw, 48px)" }}
        >
          Çünkü Bu Teklif
        </h2>
        <h2
          className="text-center font-extrabold leading-tight mt-2"
          style={{ color: NAVY, fontSize: "clamp(28px, 5.5vw, 48px)" }}
        >
          <span
            className="inline-block px-3 md:px-4 py-1 rounded-md"
            style={{
              background: YELLOW,
              boxShadow: `0 0 0 4px ${YELLOW}, 0 6px 24px -8px rgba(255,210,0,0.6)`,
            }}
          >
            KALICI OLARAK KAYBOLUYOR
          </span>
        </h2>
        <h2
          className="text-center font-bold leading-tight mt-6"
          style={{ color: NAVY, fontSize: "clamp(20px, 4.5vw, 32px)" }}
        >
          <span
            className="inline pb-1"
            style={{ borderBottom: `4px solid ${YELLOW}` }}
          >
            Bu Sayfadan Ayrıldığın Anda
          </span>
        </h2>

        {/* VIP variant: webinar video — headline altında, body copy üstünde */}
        {variant === "vip" && (
          <div className="max-w-2xl mx-auto mt-10">
            <div
              className="relative w-full overflow-hidden rounded-xl border border-gray-200"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/qQbl1YPaI7k"
                title="AI Scale VIP Webinar"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* BODY COPY — kısa, urgency-driven paragraflar */}
        <div
          className="mt-10 space-y-5 text-[15px] md:text-[18px] leading-relaxed"
          style={{ color: NAVY }}
        >
          <p>
            Bu paket <em className="italic">özellikle</em> webinara
            hazırlanman için tasarlandı.
          </p>
          <p>
            Bu yüzden sadece şu an, az önce kaydolan kişilere açıyoruz.
          </p>
          <p>Sayfadan ayrıldıktan sonra geri dönüş yok.</p>
          <p>Sana email ile göndermeyeceğim.</p>
          <p>Webinardan sonra tekrar teklif etmeyeceğim.</p>
          <p className="font-semibold">Tek şansın bu.</p>
        </div>

        {/* PRODUCT BLOCK — büyük altın metin (görsel placeholder) */}
        <div className="mt-12 mb-8 text-center">
          <h3
            className="font-extrabold leading-none"
            style={{
              color: GOLD,
              fontSize: "clamp(40px, 9vw, 80px)",
              textShadow: `0 2px 12px rgba(193,157,68,0.3)`,
            }}
          >
            VIP Yapay Zeka
          </h3>
          <h3
            className="font-extrabold leading-none mt-2"
            style={{
              color: GOLD,
              fontSize: "clamp(40px, 9vw, 80px)",
              textShadow: `0 2px 12px rgba(193,157,68,0.3)`,
            }}
          >
            Paketi
          </h3>
        </div>

        {/* VALUE STACK — paket içeriği + değer dökümü */}
        <div className="my-10">
          <div
            className="space-y-3 text-[15px] md:text-[17px]"
            style={{ color: NAVY }}
          >
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="font-medium">Manychat Kurulum Rehberi</span>
              <span className="text-gray-500 whitespace-nowrap ml-2">
                Değer: $497
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="font-medium">AI Shopify Kurulum Rehberi</span>
              <span className="text-gray-500 whitespace-nowrap ml-2">
                Değer: $597
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="font-medium">
                Milyon Dolarlık AI Automation Kiti
              </span>
              <span className="text-gray-500 whitespace-nowrap ml-2">
                Değer: $997
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="font-medium">Ömür Boyu Tekrar İzleme</span>
              <span className="text-gray-500 whitespace-nowrap ml-2">
                Değer: $97
              </span>
            </div>
          </div>
        </div>

        {/* PRICE EMPHASIS */}
        <div className="text-center my-10">
          <p
            className="font-bold inline-block"
            style={{
              color: GOLD,
              fontSize: "clamp(20px, 3.5vw, 28px)",
              textDecoration: "line-through",
              textDecorationThickness: "2px",
              opacity: 0.85,
            }}
          >
            Toplam Değer: $2.000+
          </p>
          <div className="mt-3">
            <span
              className="inline-block px-5 md:px-8 py-2 md:py-3 rounded-md font-extrabold"
              style={{
                background: YELLOW,
                color: NAVY,
                fontSize: "clamp(28px, 5.5vw, 44px)",
                boxShadow: `0 0 0 4px ${YELLOW}, 0 8px 30px -10px rgba(255,210,0,0.7)`,
              }}
            >
              Bugün SADECE $9.90
            </span>
          </div>
        </div>

        {/* STRIPE EMBED — koyu lacivert mini-section */}
        <div
          className="rounded-xl px-4 md:px-6 py-6 md:py-8 -mx-2 md:-mx-4"
          style={{ background: NAVY }}
        >
          <h4
            className="text-center font-bold text-white mb-2"
            style={{ fontSize: "clamp(18px, 3.5vw, 24px)" }}
          >
            Yerini Şimdi Garantile
          </h4>
          <p className="text-center text-white/60 text-[13px] mb-6 px-2">
            Ödeme sayfa içinde, güvenli ve şifreli — yönlendirme yok.
          </p>
          <VipEmbeddedCheckout
            email={email || undefined}
            name={name !== "Değerli Katılımcı" ? name : undefined}
            source="aiscaleapp"
          />
        </div>

        {/* CLOSING */}
        <p
          className="text-center text-[14px] md:text-[15px] italic mt-10"
          style={{ color: NAVY, opacity: 0.7 }}
        >
          Hızlı davranırsan, sen daha seminere bile katılmadan elinde olacak.
        </p>

        {/* DECLINE LINK */}
        <div className="mt-8 text-center px-2">
          <a
            href={thankYouUrl}
            className="text-[12px] md:text-[13px] underline transition-colors leading-relaxed inline-block max-w-2xl"
            style={{ color: "rgba(10,20,41,0.45)" }}
          >
            Hayır teşekkürler, VIP paketini almadan webinara katılacağım. Bu
            teklifin sayfadan ayrıldığım anda sonsuza dek kaybolacağını ve bir
            daha asla göremeyeceğimi anlıyorum.
          </a>
        </div>
      </div>
    </main>
  );
}
