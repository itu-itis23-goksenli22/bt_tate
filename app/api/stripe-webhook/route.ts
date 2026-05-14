import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendCAPIEvent } from "@/lib/meta-capi";
import { sendCourseWelcomeEmail, sendVipUpsellEmail } from "@/lib/purchase-emails";

const stripe = new Stripe("sk_placeholder");

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    if (!WEBHOOK_SECRET) {
      console.error("STRIPE_WEBHOOK_SECRET env var is not set!");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify webhook using Stripe SDK
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(
        `Stripe signature verification failed: ${message}`,
        `Secret starts with: ${WEBHOOK_SECRET.substring(0, 10)}...`,
        `Signature header: ${signature.substring(0, 30)}...`
      );
      return NextResponse.json(
        { error: "Invalid signature", detail: message },
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
      //  • 15.000 TL kurs → "Purchase" (15k TL kampanyalarının optimize ettiği event)
      //  • $9.90 VIP upsell → "VIPUpsell" custom event (Purchase pool'unu kirletmez)
      //    Amaç: $9.90 alanlardan custom audience + Lookalike çıkartmak, ama 15k TL
      //    Purchase optimizasyonunu bozmamak.
      const nameParts = customerName.split(" ");
      const ccyLower = (session.currency || "try").toLowerCase();
      const amountForCheck = amountTotal ?? 0;
      const isVipUpsell = ccyLower === "usd" && amountForCheck === 990;

      // $9.90 VIP upsell → "Subscribe" standard event (Meta'nın hazır kategorisi).
      // 15.000 TL kurs → "Purchase" (mevcut akış).
      // Subscribe seçildi çünkü:
      //   1. Meta indexing gecikmesi yok (standard event)
      //   2. Custom Conversion dropdown'da hazır
      //   3. Semantic uyumlu (VIP üyelik = subscription)
      //   4. Purchase optimizasyonunu kirletmez (ayrı event türü)
      // Custom Conversion bu Subscribe'ı URL contains "odemeonay" filtre ile
      // izole edip sadece $9.90 satışlarını sayar.
      const eventName = isVipUpsell ? "Subscribe" : "Purchase";
      const eventIdPrefix = isVipUpsell ? "subscribe" : "purchase";

      await sendCAPIEvent({
        eventName,
        eventId: `${eventIdPrefix}_${session.id}`,
        sourceUrl,
        userData: {
          email: email || undefined,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
        },
        customData: {
          value,
          currency,
        },
      });
      console.log(
        `✅ Meta CAPI ${eventName} sent for ${email || "unknown"} → ${isDijital ? "Dijital Akademi" : "AI Scale"} pixel (${value} ${currency})`
      );

      // Send purchase confirmation email (non-blocking)
      // $9.90 USD = 990 cents → VIP upsell mail
      // 15.000 TL = 1.500.000 kuruş → Course welcome mail
      if (email) {
        const amount = amountTotal ?? 0;
        const ccy = (session.currency || "try").toLowerCase();

        if (ccy === "usd" && amount === 990) {
          sendVipUpsellEmail(email)
            .then(() => console.log(`📧 VIP upsell email sent to ${email}`))
            .catch((err) => console.warn("⚠️ VIP email failed:", err));
        } else if (ccy === "try" && amount === 1500000) {
          sendCourseWelcomeEmail(email)
            .then(() => console.log(`📧 Course welcome email sent to ${email}`))
            .catch((err) => console.warn("⚠️ Welcome email failed:", err));
        } else {
          console.log(`ℹ️ No email rule for amount=${amount} ${ccy} — skipped`);
        }
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
