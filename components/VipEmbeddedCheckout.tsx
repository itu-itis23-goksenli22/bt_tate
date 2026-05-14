"use client";

// VIP $9.90 Embedded Stripe Checkout
//
// Sayfa içine iframe olarak gömülen Stripe Checkout. Kullanıcı redirect olmadan
// ödeme yapar. Webhook (/api/stripe-webhook) checkout.session.completed alır
// ve VIPUpsell custom event'i Meta'ya, email + Hetzner notify her zamanki gibi
// devam eder.
//
// Production-safe: STRIPE_* env varları yoksa /api/create-checkout-session 503
// döner ve burada eski yeşil Stripe Payment Link butonu fallback olarak görünür.
// Yani Vercel'de env vars set edilmediği sürece sayfa kırılmıyor — sadece embed
// devreye girmiyor.

import { useRef, useState } from "react";
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
  // Durum makinesi: 'idle' → kullanıcı henüz tıklamadı, yeşil buton göster
  //                  'loading' → /api/create-checkout-session POST atılıyor
  //                  'ready' → clientSecret geldi, EmbeddedCheckout mount edilir
  //                  'fallback' → API 503 veya pk yok → eski Payment Link butonu
  //
  // NEXT_PUBLIC_* env vars build-time'da bundle'a girer; SSR + client'ta aynı
  // değeri görürüz → hydration flicker yok.
  const hasPublishableKey = Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const [state, setState] = useState<"idle" | "loading" | "ready" | "fallback">(
    hasPublishableKey ? "idle" : "fallback"
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const startedRef = useRef(false);

  async function handleStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    setState("loading");

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source }),
      });

      if (!res.ok) {
        // 503 → env vars set değil; 500 → Stripe API hatası
        console.warn("Embedded checkout unavailable, fallback to Payment Link");
        setState("fallback");
        return;
      }

      const data = await res.json();
      if (!data.clientSecret) {
        setState("fallback");
        return;
      }

      setClientSecret(data.clientSecret);
      setState("ready");
    } catch (err) {
      console.warn("Embedded checkout fetch failed:", err);
      setState("fallback");
    }
  }

  // Durum: ready → Stripe iframe mount et
  if (state === "ready" && clientSecret) {
    const promise = getStripePromise();
    if (!promise) {
      // teorik olarak buraya düşmez ama TS happy olsun
      return <FallbackButton />;
    }
    return (
      <div
        id="final-vip-cta"
        className="my-6 rounded-[10px] overflow-hidden bg-white scroll-mt-24"
      >
        <EmbeddedCheckoutProvider
          stripe={promise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    );
  }

  // Durum: fallback → eski yeşil Payment Link butonu (yeni sekmede)
  if (state === "fallback") {
    return <FallbackButton />;
  }

  // Durum: loading
  if (state === "loading") {
    return (
      <div
        id="final-vip-cta"
        className="my-6 rounded-[10px] py-6 px-6 text-center scroll-mt-24"
        style={{ background: GREEN_GRADIENT }}
      >
        <div className="text-white font-bold text-[18px] inline-flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          Ödeme formu yükleniyor...
        </div>
      </div>
    );
  }

  // Durum: idle → "Embed'i başlat" butonu (kullanıcı tıklayana kadar Stripe'a
  // request atmıyoruz; performans + maliyet açısından makul)
  return (
    <div className="my-6">
      <button
        id="final-vip-cta"
        type="button"
        onClick={handleStart}
        className="block w-full rounded-[10px] overflow-hidden hover:brightness-110 transition-all shadow-lg shadow-emerald-500/30 cursor-pointer scroll-mt-24"
      >
        <div
          className="py-5 px-6 text-center"
          style={{ background: GREEN_GRADIENT }}
        >
          <div className="text-white font-extrabold text-[22px] md:text-[28px]">
            VIP Üyelere Şimdi Katıl &raquo;
          </div>
          <div className="text-white/80 text-[13px] mt-1">
            Güvenli ödeme formu hemen burada açılır — yeni sekme gerektirmez
          </div>
        </div>
      </button>
    </div>
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
        <div className="py-5 px-6 text-center" style={{ background: GREEN_GRADIENT }}>
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
