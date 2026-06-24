import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendCAPIEvent } from "@/lib/meta-capi";
import {
  sendCourseWelcomeEmail,
  sendVipUpsellEmail,
  sendSonfirsatWelcomeEmail,
} from "@/lib/purchase-emails";

const stripe = new Stripe("sk_placeholder");

// Birden fazla Stripe hesabı destekleniyor (TL hesabı + yeni USD hesabı).
// Her hesabın kendi webhook signing secret'ı var; gelen imzayı her ikisine
// karşı deneriz, hangisi doğrularsa o hesabın event'i kabul edilir.
//   STRIPE_WEBHOOK_SECRET      → ana (TL) hesap
//   STRIPE_WEBHOOK_SECRET_USD  → yeni USD hesabı (Payment Link'ler)
//   STRIPE_WEBHOOK_SECRET_2    → USD hesabının env'deki gerçek adı (alias)
const WEBHOOK_SECRETS = [
  process.env.STRIPE_WEBHOOK_SECRET,
  process.env.STRIPE_WEBHOOK_SECRET_USD,
  process.env.STRIPE_WEBHOOK_SECRET_2,
].filter((s): s is string => Boolean(s));

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    if (WEBHOOK_SECRETS.length === 0) {
      console.error("No Stripe webhook secret env var is set!");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify webhook using Stripe SDK — gelen imzayı tüm hesap secret'larına
    // karşı dene; ilk doğrulayan kazanır. Hiçbiri tutmazsa 400 döner.
    let event: Stripe.Event | null = null;
    let lastError = "Unknown error";
    for (const secret of WEBHOOK_SECRETS) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, secret);
        break;
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : "Unknown error";
      }
    }
    if (!event) {
      console.error(
        `Stripe signature verification failed against all secrets: ${lastError}`,
        `Signature header: ${signature.substring(0, 30)}...`
      );
      return NextResponse.json(
        { error: "Invalid signature", detail: lastError },
        { status: 400 }
      );
    }

    // Only handle successful checkout sessions
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email || session.customer_email;
      const amountTotal = session.amount_total; // in kuruş
      const currency = (session.currency || "try").toUpperCase();
      const customerName = session.customer_details?.name || "";

      // Convert from kuruş to TRY (divide by 100)
      const value = amountTotal ? amountTotal / 100 : 0;

      // Determine which pixel to send to based on success_url or metadata
      const successUrl = session.success_url || "";
      const metadataSource = (session.metadata as Record<string, string>)?.source || "";
      const isDijital = successUrl.includes("dijitalakademi") || metadataSource.includes("dijitalakademi");

      const sourceUrl = isDijital
        ? "https://dijitalakademi.live/odemeonay"
        : "https://www.aiscaleapp.com/odemeonay";

      console.log(
        `💰 Stripe Purchase: ${email || "no-email"} | ${value} ${currency} | ${customerName} | success_url: ${successUrl || "null"} | pixel: ${isDijital ? "Dijital" : "AIScale"}`
      );

      // Meta CAPI event'i:
      //  • 15.000 TL kurs    → "Purchase"
      //  • $9.90 VIP upsell  → "Purchase"
      //
      // Her iki satış da artık standard "Purchase" event'i olarak fire edilir.
      // (Önceden $9.90 "Subscribe" olarak gönderiliyordu; user kararıyla
      // Purchase'a çevrildi. Custom Conversion ile $9.90 satışları URL filtresi
      // — "odemeonay" + currency=USD — üzerinden izole edilebilir.)
      const nameParts = customerName.split(" ");
      const ccyLower = (session.currency || "try").toLowerCase();
      const amountForCheck = amountTotal ?? 0;
      // Metadata.variant create-checkout-session tarafından set ediliyor;
      // bu en güvenilir tanıma yöntemi. Fallback olarak amount+currency
      // kontrolü de var (eski webhook'lar veya legacy Payment Link'ler için).
      const metadataVariant = (session.metadata as Record<string, string>)
        ?.variant || "";
      const isVipUpsell =
        metadataVariant === "vip" ||
        // $9.90 = 990 cent (Payment Link fallback — metadata.variant set etmez)
        (ccyLower === "usd" && amountForCheck === 990);
      const isSonfirsat =
        metadataVariant === "sonfirsat" ||
        // 29.900 TL = 2.990.000 kuruş (legacy Payment Link fallback)
        (ccyLower === "try" && amountForCheck === 2990000);

      const eventName = "Purchase";
      // eventId prefix'i farklı satış tiplerini Meta dashboard'da ayırt
      // etmek için kullanılıyor (custom conversions filter'ı için).
      // session.id zaten globally unique olduğu için dedup collision yok.
      const eventIdPrefix = isSonfirsat
        ? "purchase_sonfirsat"
        : isVipUpsell
          ? "purchase_vip"
          : "purchase";

      // content_name de variant'a göre değişiyor — Meta CAPI customData'da
      // bu sayede /sonfirsat satışları diğer satışlardan ayrılabilir.
      const purchaseContentName = isSonfirsat
        ? "Sonfirsat Purchase"
        : isVipUpsell
          ? "VIP Purchase"
          : "Course Purchase";

      await sendCAPIEvent({
        eventName,
        eventId: `${eventIdPrefix}_${session.id}`,
        sourceUrl,
        userData: {
          email: email || undefined,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          // fbc/fbp checkout sırasında metadata'ya yazıldı → Purchase event'i
          // bunları taşır, Event Match Quality artar (Click ID coverage).
          fbc: (session.metadata as Record<string, string>)?.fbc || undefined,
          fbp: (session.metadata as Record<string, string>)?.fbp || undefined,
        },
        customData: {
          value,
          currency,
          content_name: purchaseContentName,
        },
      });
      console.log(
        `✅ Meta CAPI ${eventName} (${purchaseContentName}) sent for ${email || "unknown"} → ${isDijital ? "Dijital Akademi" : "AI Scale"} pixel (${value} ${currency})`
      );

      // Send purchase confirmation email (non-blocking)
      // Routing — metadata.variant primary, amount+currency fallback:
      //   $9.90 USD  / variant=vip       → VIP upsell mail
      //   15.000 TL  / variant=undefined → Course welcome mail
      //   29.900 TL  / variant=sonfirsat → Sonfirsat welcome mail
      if (email) {
        if (isSonfirsat) {
          sendSonfirsatWelcomeEmail(email)
            .then(() =>
              console.log(`📧 Sonfirsat welcome email sent to ${email}`)
            )
            .catch((err) =>
              console.warn("⚠️ Sonfirsat email failed:", err)
            );
        } else if (isVipUpsell) {
          sendVipUpsellEmail(email)
            .then(() => console.log(`📧 VIP upsell email sent to ${email}`))
            .catch((err) => console.warn("⚠️ VIP email failed:", err));
        } else if (ccyLower === "try" && amountForCheck === 1500000) {
          sendCourseWelcomeEmail(email)
            .then(() => console.log(`📧 Course welcome email sent to ${email}`))
            .catch((err) => console.warn("⚠️ Welcome email failed:", err));
        } else {
          console.log(
            `ℹ️ No email rule for amount=${amountForCheck} ${ccyLower} variant=${metadataVariant} — skipped`
          );
        }
      }

      // GoHighLevel — ödeme yapan kişiyi GHL'e it (best-effort, non-blocking).
      // GHL native olarak harici Stripe Payment Link satışını görmez; bu push
      // ile alıcı GHL Contacts'a düşer. Ürüne göre tag gönderilir:
      //   $9.90 → vip_aldi | 29.900 → sonfirsat_aldi | 15.000 → kurs_aldi
      // GHL workflow'unda "Add Tag" → {{inboundWebhookRequest.tag}} ile uygulanır.
      // GHL_PURCHASE_WEBHOOK_URL ayrı workflow için; yoksa kayıt webhook'una düşer.
      if (email) {
        const ghlPurchaseUrl =
          process.env.GHL_PURCHASE_WEBHOOK_URL ||
          process.env.GHL_INBOUND_WEBHOOK_URL ||
          "https://services.leadconnectorhq.com/hooks/HKKWM8kTRSbS4g6gWDwT/webhook-trigger/065f186b-a04a-47ab-9f9d-ba69b45b83c9";
        const ghlTag = isSonfirsat
          ? "sonfirsat_aldi"
          : isVipUpsell
            ? "vip_aldi"
            : "kurs_aldi";
        fetch(ghlPurchaseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: nameParts[0] || "",
            last_name: nameParts.slice(1).join(" ") || "",
            name: customerName,
            email,
            phone: session.customer_details?.phone || "",
            tag: ghlTag,
            product: purchaseContentName,
            value,
            currency,
            source: "stripe_purchase",
          }),
          signal: AbortSignal.timeout(5000),
        })
          .then((r) => console.log(`📡 GHL purchase push ${email} (${ghlTag}) → ${r.status}`))
          .catch((err) => console.warn("⚠️ GHL purchase push failed:", err?.message || err));
      }

      // Notify Hetzner purchase-tracker (fire-and-forget, non-blocking)
      // Hetzner downse veya yavaşsa Stripe webhook bloklanmaz — 5sn timeout
      if (email && process.env.HETZNER_API_URL && process.env.HETZNER_WEBHOOK_SECRET) {
        const hetznerSource = isDijital ? "dijitalakademi" : "aiscale";
        fetch(`${process.env.HETZNER_API_URL}/mark-purchased`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HETZNER_WEBHOOK_SECRET}`,
          },
          body: JSON.stringify({
            email,
            source: hetznerSource,
            amount: amountTotal ?? 0,
            currency: (session.currency || "try").toLowerCase(),
          }),
          signal: AbortSignal.timeout(5000),
        })
          .then((r) => console.log(`📡 Hetzner mark-purchased ${email} → ${r.status}`))
          .catch((err) => console.warn("⚠️ Hetzner notify failed:", err.message || err));
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
