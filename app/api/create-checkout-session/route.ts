// Stripe Embedded Checkout — server-side session creator (variant-aware)
//
// Frontend EmbeddedCheckoutProvider buradan clientSecret ister. Stripe
// Embedded Checkout sayfa içine iframe olarak gömülür → kullanıcı redirect
// olmadan ödeme yapar. checkout.session.completed webhook'u her zamanki
// gibi atar, /api/stripe-webhook VIPUpsell event'i + Hetzner notify +
// email akışını tetikler.
//
// Variant'lar:
//   "vip"        → VIP $9.90 USD upsell (mevcut, default)
//                  Env: STRIPE_VIP_PRICE_ID
//                  Return URL: /odemeonay (tracking + pixel atıyor)
//   "sonfirsat"  → /sonfirsat ₺29.900 community paketi
//                  Env: STRIPE_SONFIRSAT_PRICE_ID
//                  Return URL: /sonfirsat/odemeonay (yoksa /odemeonay)
//
// Env vars (tümü Vercel → Settings → Environment Variables):
//   STRIPE_SECRET_KEY              → sk_live_... veya sk_test_...
//   STRIPE_VIP_PRICE_ID            → price_xxx ($9.90 USD)
//   STRIPE_SONFIRSAT_PRICE_ID      → price_xxx (₺29.900 TRY)
//
// Yoksa 503 döner; frontend de fallback olarak Payment Link butonunu
// gösterir.

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type Variant = "vip" | "sonfirsat";

interface VariantConfig {
  envKey: string;
  upsellTag: string;
  returnPath: string;
}

const VARIANTS: Record<Variant, VariantConfig> = {
  vip: {
    envKey: "STRIPE_VIP_PRICE_ID",
    upsellTag: "vip_9_90",
    returnPath: "/odemeonay",
  },
  sonfirsat: {
    envKey: "STRIPE_SONFIRSAT_PRICE_ID",
    upsellTag: "sonfirsat_29900",
    returnPath: "/odemeonay",
  },
};

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error: "stripe_not_configured",
        detail: "STRIPE_SECRET_KEY env var eksik.",
      },
      { status: 503 }
    );
  }

  let body: {
    email?: string;
    name?: string;
    source?: string;
    variant?: string;
    fbc?: string;
    fbp?: string;
  } = {};
  try {
    body = await request.json();
  } catch {
    // boş body OK
  }

  // Variant resolve — default "vip" (backwards compat)
  const variant: Variant =
    body.variant === "sonfirsat" ? "sonfirsat" : "vip";
  const cfg = VARIANTS[variant];
  const priceId = process.env[cfg.envKey];

  if (!priceId) {
    return NextResponse.json(
      {
        error: "stripe_not_configured",
        detail: `${cfg.envKey} env var eksik. Vercel → Settings → Environment Variables.`,
      },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secretKey);
  const origin =
    request.headers.get("origin") ||
    `https://${request.headers.get("host") || "www.aiscaleapp.com"}`;

  // metadata.source webhook tarafında dijital vs aiscale ayırımı için
  const source =
    body.source === "dijitalakademi" ? "dijitalakademi" : "aiscaleapp";

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: body.email || undefined,
      return_url: `${origin}${cfg.returnPath}?session_id={CHECKOUT_SESSION_ID}${
        body.name ? `&name=${encodeURIComponent(body.name)}` : ""
      }${body.email ? `&email=${encodeURIComponent(body.email)}` : ""}`,
      metadata: {
        source,
        variant,
        upsell: cfg.upsellTag,
        ...(body.name ? { customer_name: body.name } : {}),
        // Meta CAPI Purchase event'inin fbc/fbp taşıması için (EMQ artışı).
        // Webhook bunları okuyup sendCAPIEvent userData'ya koyar.
        ...(body.fbc ? { fbc: body.fbc } : {}),
        ...(body.fbp ? { fbp: body.fbp } : {}),
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("create-checkout-session error:", message);
    return NextResponse.json(
      { error: "stripe_error", detail: message },
      { status: 500 }
    );
  }
}
