// Stripe Embedded Checkout — VIP $19.00 upsell için server-side session creator
//
// Frontend EmbeddedCheckoutProvider buradan clientSecret ister.
// Stripe Embedded Checkout, sayfa içine iframe olarak gömülür → kullanıcı redirect
// olmadan ödeme yapar. checkout.session.completed webhook'u her zamanki gibi atar,
// /api/stripe-webhook route'u VIPUpsell event'i + Hetzner notify + email akışını
// tetikler. Webhook tarafında hiçbir değişiklik yok.
//
// Env vars:
//   STRIPE_SECRET_KEY      → sk_live_... veya sk_test_...
//   STRIPE_VIP_PRICE_ID    → price_xxx ($19.00 ürününün Stripe Price ID'si)
//
// Yoksa 503 döner; frontend de fallback olarak eski Payment Link butonunu gösterir.

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_VIP_PRICE_ID;

  if (!secretKey || !priceId) {
    return NextResponse.json(
      {
        error: "stripe_not_configured",
        detail:
          "STRIPE_SECRET_KEY ve STRIPE_VIP_PRICE_ID env varları eksik. Vercel → Settings → Environment Variables.",
      },
      { status: 503 }
    );
  }

  let body: { email?: string; name?: string; source?: string } = {};
  try {
    body = await request.json();
  } catch {
    // boş body OK
  }

  const stripe = new Stripe(secretKey);
  const origin =
    request.headers.get("origin") ||
    `https://${request.headers.get("host") || "www.aiscaleapp.com"}`;

  // metadata.source webhook tarafında dijital vs aiscale ayırımı için kullanılıyor
  const source =
    body.source === "dijitalakademi" ? "dijitalakademi" : "aiscaleapp";

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: body.email || undefined,
      // Dönüş URL'i: Stripe ödeme bittikten sonra burayı yükler.
      // Mevcut /odemeonay sayfası zaten tracking + pixel atıyor.
      return_url: `${origin}/odemeonay?session_id={CHECKOUT_SESSION_ID}${
        body.name ? `&name=${encodeURIComponent(body.name)}` : ""
      }${body.email ? `&email=${encodeURIComponent(body.email)}` : ""}`,
      metadata: {
        source,
        upsell: "vip_9_90",
        ...(body.name ? { customer_name: body.name } : {}),
      },
      // Webhook tarafı buraya bakıyor: success_url içeriği "dijitalakademi" içeriyor mu?
      // return_url farklı bir kavram olduğu için metadata.source'a güveniyoruz.
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
