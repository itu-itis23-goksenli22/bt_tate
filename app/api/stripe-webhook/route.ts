import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendCAPIEvent } from "@/lib/meta-capi";

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

      console.log(
        `💰 Stripe Purchase: ${email} | ${value} ${currency} | ${customerName}`
      );

      // Determine which pixel to send to based on success_url
      const successUrl = session.success_url || "";
      const isDijital = successUrl.includes("dijitalakademi");
      const sourceUrl = isDijital
        ? "https://dijitalakademi.live/odemeonay"
        : "https://www.aiscaleapp.com/odemeonay";

      // Send Purchase event to Meta CAPI with email
      if (email) {
        const nameParts = customerName.split(" ");
        await sendCAPIEvent({
          eventName: "Purchase",
          sourceUrl,
          userData: {
            email,
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
          },
          customData: {
            value,
            currency,
          },
        });
        console.log(`✅ Meta CAPI Purchase sent for ${email} → ${isDijital ? "Dijital Akademi" : "AI Scale"} pixel`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
