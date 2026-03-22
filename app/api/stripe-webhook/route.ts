import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendCAPIEvent } from "@/lib/meta-capi";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

// Verify Stripe webhook signature
function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const elements = signature.split(",").reduce(
    (acc, part) => {
      const [key, val] = part.split("=", 2);
      if (key === "t") acc.timestamp = val;
      if (key === "v1") acc.signatures.push(val);
      return acc;
    },
    { timestamp: "", signatures: [] as string[] }
  );

  if (!elements.timestamp || elements.signatures.length === 0) return false;

  const signedPayload = `${elements.timestamp}.${payload}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  return elements.signatures.some(
    (sig) =>
      sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook is from Stripe
    const isValid = verifyStripeSignature(body, signature, STRIPE_WEBHOOK_SECRET);
    if (!isValid) {
      console.error("Invalid Stripe webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Only handle successful checkout sessions
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_details?.email || session.customer_email;
      const amountTotal = session.amount_total; // in cents (kuruş)
      const currency = (session.currency || "try").toUpperCase();
      const customerName = session.customer_details?.name || "";

      // Convert from kuruş to TRY (divide by 100)
      const value = amountTotal ? amountTotal / 100 : 0;

      console.log(
        `💰 Stripe Purchase: ${email} | ${value} ${currency} | ${customerName}`
      );

      // Send Purchase event to Meta CAPI with email
      if (email) {
        const nameParts = customerName.split(" ");
        await sendCAPIEvent({
          eventName: "Purchase",
          sourceUrl: "https://www.aiscaleapp.com/odemeonay",
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
        console.log(`✅ Meta CAPI Purchase sent for ${email}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
