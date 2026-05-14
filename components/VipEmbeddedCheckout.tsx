"use client";

// VIP $9.90 Embedded Stripe Checkout — eager-mount versiyonu
//
// Sayfa açılır açılmaz Stripe Checkout Session yaratır ve iframe'i mount eder.
// Kullanıcı butona tıklamak zorunda değil — form direkt orada görünür (Ecom
// Degree pattern). Webhook (/api/stripe-webhook) checkout.session.completed
// alır ve VIPUpsell custom event'i Meta'ya gönderir.
//
// Production-safe: API 503/500 dönerse veya pk yoksa eski yeşil Payment Link
// butonu fallback olarak gösterilir.

import { useEffect, useRef, useState } from "react";
import { loadStripe, type Stripe as StripeJs } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const FALLBACK_CHECKOUT_URL =
  "https://buy.stripe.com/cNi8wQ4mcb1HcZb71u3wQ0s";
const GREEN_GRADIENT =
  "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)";

let stripePromise: Promise<StripeJs | null> | null = null;
function getStripePromise() {
  if (stripePromise) return stripePromise;
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!pk) return null;
  stripePromise = loadStripe(pk);
  return stripePromise;
}

interface Props {
  email?: string;
  name?: string;
  source?: "aiscaleapp" | "dijitalakademi";
}

export default function VipEmbeddedCheckout({
  email,
  name,
  source = "aiscaleapp",
}: Props) {
  // Durum makinesi:
  //   'loading'  → /api/create-checkout-session POST atılıyor (initial state)
  //   'ready'    → clientSecret geldi, EmbeddedCheckout mount edilir
  //   'fallback' → API 503/500 veya pk yok veya timeout → eski Payment Link butonu
  const hasPublishableKey = Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const [state, setState] = useState<"loading" | "ready" | "fallback">(
    hasPublishableKey ? "loading" : "fallback"
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const startedRef = useRef(false);

  // DEBUG — console.warn çünkü next.config.js prod'da console.log siliyor
  // eslint-disable-next-line no-console
  console.warn("[VipEmbed] render", {
    state,
    hasPublishableKey,
    pkPrefix:
      (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "").slice(0, 12),
    hasClientSecret: Boolean(clientSecret),
  });

  // GÖRSEL DEBUG — kırmızı çerçeveli debug paneli (geçici, sorun bulunca silinecek)
  const DebugBanner = (
    <div
      style={{
        background: "#ff3b3b",
        color: "white",
        padding: "12px",
        margin: "8px 0",
        border: "3px solid yellow",
        fontWeight: "bold",
        fontSize: "14px",
        textAlign: "center",
        zIndex: 9999,
        position: "relative",
      }}
    >
      🔍 EMBED DEBUG → state: <code>{state}</code> | hasPK:{" "}
      {String(hasPublishableKey)} | hasCS:{" "}
      {String(Boolean(clientSecret))} | pkPrefix:{" "}
      <code>
        {(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "(none)").slice(
          0,
          12
        )}
      </code>
    </div>
  );

  useEffect(() => {
    if (!hasPublishableKey) return;
    if (startedRef.current) return;
    startedRef.current = true;

    // Timeout — 12 saniyede session gelmezse fallback'a düş
    const timeoutId = setTimeout(() => {
      if (!startedRef.current) return;
      console.warn("Stripe session fetch timed out, falling back");
      setState((prev) => (prev === "loading" ? "fallback" : prev));
    }, 12000);

    (async () => {
      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, source }),
        });

        if (!res.ok) {
          console.warn(
            `Embedded checkout endpoint returned ${res.status}, falling back`
          );
          setState("fallback");
          return;
        }

        const data = (await res.json()) as { clientSecret?: string };
        if (!data.clientSecret) {
          setState("fallback");
          return;
        }

        setClientSecret(data.clientSecret);
        setState("ready");
      } catch (err) {
        console.warn("Embedded checkout fetch failed:", err);
        setState("fallback");
      } finally {
        clearTimeout(timeoutId);
      }
    })();

    return () => clearTimeout(timeoutId);
  }, [hasPublishableKey, email, name, source]);

  // Durum: ready → Stripe iframe mount et
  if (state === "ready" && clientSecret) {
    const promise = getStripePromise();
    if (!promise) {
      return (
        <>
          {DebugBanner}
          <FallbackButton />
        </>
      );
    }
    return (
      <>
        {DebugBanner}
        <div id="final-vip-cta" className="my-6 scroll-mt-24">
          <div className="rounded-[10px] overflow-hidden bg-white shadow-lg shadow-emerald-500/20">
            <EmbeddedCheckoutProvider
              stripe={promise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </>
    );
  }

  // Durum: fallback → eski yeşil Payment Link butonu (yeni sekmede)
  if (state === "fallback") {
    return (
      <>
        {DebugBanner}
        <FallbackButton />
      </>
    );
  }

  // Durum: loading (initial) — yeşil placeholder
  return (
    <>
      {DebugBanner}
      <div
        id="final-vip-cta"
        className="my-6 rounded-[10px] py-10 px-6 text-center scroll-mt-24 shadow-lg shadow-emerald-500/30"
        style={{ background: GREEN_GRADIENT }}
      >
        <div className="text-white font-bold text-[18px] inline-flex items-center gap-3">
          <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          Güvenli ödeme formu yükleniyor...
        </div>
        <p className="text-white/70 text-[13px] mt-2">
          Bir saniye, kart bilgilerini girebilmen için form hazırlanıyor.
        </p>
      </div>
    </>
  );
}

function FallbackButton() {
  return (
    <div className="my-6">
      <a
        id="final-vip-cta"
        href={FALLBACK_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-[10px] overflow-hidden hover:brightness-110 transition-all shadow-lg shadow-emerald-500/30 scroll-mt-24"
      >
        <div
          className="py-5 px-6 text-center"
          style={{ background: GREEN_GRADIENT }}
        >
          <div className="text-white font-extrabold text-[22px] md:text-[28px]">
            VIP Üyelere Şimdi Katıl &raquo;
          </div>
          <div className="text-white/80 text-[13px] mt-1">
            Yapay Zeka ile ilk adımını hemen at
          </div>
        </div>
      </a>
    </div>
  );
}
