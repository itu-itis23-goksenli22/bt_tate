"use client";

// VIP $19.00 Embedded Stripe Checkout — eager-mount, sayfa içi iframe
//
// Akış:
//   1. Component mount olduğu anda /api/create-checkout-session POST atılır
//   2. Backend Stripe checkout session yaratıp clientSecret döner
//   3. EmbeddedCheckoutProvider + EmbeddedCheckout iframe'i mount edilir
//   4. Kullanıcı kartını girer, Stripe tarafında çekim olur
//   5. checkout.session.completed webhook → /api/stripe-webhook
//        → Meta CAPI Purchase event ($19.00) → email + Hetzner notify
//
// Hata yedekleri:
//   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY yoksa             → Payment Link butonu
//   - /api/create-checkout-session 4xx/5xx                 → Payment Link butonu
//   - 12 sn içinde clientSecret gelmezse (timeout)         → Payment Link butonu

import { useEffect, useRef, useState } from "react";
import { loadStripe, type Stripe as StripeJs } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const FALLBACK_CHECKOUT_URL =
  "https://buy.stripe.com/5kQcN68Cs7Pvf7j2Le3wQ0r";
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
  /**
   * DOM id used for the wrapper element. Other CTAs on the page can
   * scroll to this via `#<ctaId>`. Default `final-vip-cta` (matches the
   * existing /kayitbasarili layout). Override (e.g. `embed-test-cta`)
   * when rendering on a separate test page to avoid id collisions.
   */
  ctaId?: string;
}

export default function VipEmbeddedCheckout({
  email,
  name,
  source = "aiscaleapp",
  ctaId = "final-vip-cta",
}: Props) {
  // Durum makinesi:
  //   'loading'  → /api/create-checkout-session POST atılıyor (initial)
  //   'ready'    → clientSecret geldi, EmbeddedCheckout mount edilir
  //   'fallback' → API hata / pk yok / timeout → Payment Link butonu
  const hasPublishableKey = Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const [state, setState] = useState<"loading" | "ready" | "fallback">(
    hasPublishableKey ? "loading" : "fallback"
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!hasPublishableKey) return;
    if (startedRef.current) return;
    startedRef.current = true;

    // 12 sn timeout — session gelmezse fallback
    const timeoutId = setTimeout(() => {
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

  // ready → Stripe iframe mount
  if (state === "ready" && clientSecret) {
    const promise = getStripePromise();
    if (!promise) return <FallbackButton ctaId={ctaId} />;
    return (
      <div id={ctaId} className="my-6 scroll-mt-24">
        <div className="rounded-[10px] overflow-hidden bg-white shadow-lg shadow-emerald-500/20">
          <EmbeddedCheckoutProvider
            stripe={promise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    );
  }

  // fallback → Payment Link butonu (yeni sekme)
  if (state === "fallback") {
    return <FallbackButton ctaId={ctaId} />;
  }

  // loading (initial) → yeşil placeholder
  return (
    <div
      id={ctaId}
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
  );
}

function FallbackButton({ ctaId }: { ctaId: string }) {
  return (
    <div className="my-6">
      <a
        id={ctaId}
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
