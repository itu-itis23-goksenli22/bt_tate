"use client";

// VIP $9.90 Embedded Stripe Checkout — eager-mount, sayfa içi iframe
//
// Akış:
//   1. Component mount olduğu anda /api/create-checkout-session POST atılır
//   2. Backend Stripe checkout session yaratıp clientSecret döner
//   3. EmbeddedCheckoutProvider + EmbeddedCheckout iframe'i mount edilir
//   4. Kullanıcı kartını girer, Stripe tarafında çekim olur
//   5. checkout.session.completed webhook → /api/stripe-webhook
//        → Meta CAPI Purchase event ($9.90) → email + Hetzner notify
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
  "https://buy.stripe.com/cNi8wQ4mcb1HcZb71u3wQ0s";

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
      <div id={ctaId} className="my-8 scroll-mt-24">
        {/* Trust signals — iframe'in üstünde */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 text-white/60 text-[11px] md:text-[12px]">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Güvenli Ödeme
          </span>
          <span className="text-white/30">·</span>
          <span>256-bit SSL</span>
          <span className="text-white/30">·</span>
          <span>Stripe</span>
        </div>

        {/* Gold-glow card — iframe'in dış kabuğu */}
        <div
          className="relative rounded-2xl p-[2px] shadow-[0_0_60px_-15px_rgba(193,157,68,0.5)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(193,157,68,0.6) 0%, rgba(232,212,139,0.3) 50%, rgba(193,157,68,0.6) 100%)",
          }}
        >
          <div className="rounded-2xl overflow-hidden bg-white">
            <EmbeddedCheckoutProvider
              stripe={promise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>

        {/* Alt güvence metni */}
        <p className="text-center text-white/40 text-[11px] mt-3 px-2">
          Ödeme bilgileriniz Stripe üzerinden şifrelenerek işlenir.
          Kart bilgileriniz sunucularımıza ulaşmaz.
        </p>
      </div>
    );
  }

  // fallback → Payment Link butonu (yeni sekme)
  if (state === "fallback") {
    return <FallbackButton ctaId={ctaId} />;
  }

  // loading (initial) → altın temalı placeholder
  return (
    <div id={ctaId} className="my-8 scroll-mt-24">
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 text-white/40 text-[11px] md:text-[12px]">
        <span>🔒 Güvenli Ödeme</span>
        <span className="text-white/20">·</span>
        <span>256-bit SSL</span>
        <span className="text-white/20">·</span>
        <span>Stripe</span>
      </div>
      <div
        className="relative rounded-2xl p-[2px] shadow-[0_0_60px_-15px_rgba(193,157,68,0.5)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(193,157,68,0.6) 0%, rgba(232,212,139,0.3) 50%, rgba(193,157,68,0.6) 100%)",
        }}
      >
        <div className="rounded-2xl bg-[#1a1a1a] py-12 px-6 text-center">
          <div className="inline-flex items-center gap-3 text-white font-semibold text-[16px]">
            <span
              className="inline-block w-5 h-5 border-2 border-[#C19D44]/30 border-t-[#C19D44] rounded-full animate-spin"
            />
            Güvenli ödeme formu yükleniyor...
          </div>
          <p className="text-white/50 text-[13px] mt-2">
            Bir saniye, kart bilgilerini girebilmen için form hazırlanıyor.
          </p>
        </div>
      </div>
    </div>
  );
}

function FallbackButton({ ctaId }: { ctaId: string }) {
  // Embed başarısız olursa (env eksik, API hata, timeout) buraya düşer.
  // Marka rengi (altın) — yeşil gradient kaldırıldı, sayfayla uyumlu.
  return (
    <div className="my-6">
      <a
        id={ctaId}
        href={FALLBACK_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-[10px] overflow-hidden hover:brightness-110 transition-all shadow-[0_0_40px_-10px_rgba(193,157,68,0.55)] scroll-mt-24"
      >
        <div
          className="py-5 px-6 text-center"
          style={{
            background:
              "linear-gradient(271.63deg, #C19D44 -20%, #E8D48B 20%, #FDF3AD 50%, #E8D48B 80%, #C19D44 120%)",
          }}
        >
          <div className="text-black font-extrabold text-[22px] md:text-[28px]">
            VIP Üyelere Şimdi Katıl &raquo;
          </div>
          <div className="text-black/60 text-[13px] mt-1">
            Yapay Zeka ile ilk adımını hemen at
          </div>
        </div>
      </a>
    </div>
  );
}
