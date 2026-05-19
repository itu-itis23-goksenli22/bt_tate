// GEÇİCİ — Meta Custom Conversion setup için VIPUpsell event'ini seed eder.
//
// Çalışma:
//   curl 'https://www.aiscaleapp.com/api/dev/seed-vipupsell?secret=XXX&pixel=aiscale'
//   curl 'https://www.aiscaleapp.com/api/dev/seed-vipupsell?secret=XXX&pixel=dijital'
//
// secret query param = process.env.SEED_VIPUPSELL_SECRET ile eşleşmeli.
// pixel = "aiscale" (793366716531580) veya "dijital" (1261057665474950)
//
// Seed ettikten ~5-10 dakika sonra Meta Events Manager → Custom Conversions
// → Create dropdown'unda "VIPUpsell" custom event'i görünür. Custom Conversion
// oluşturulduktan sonra bu route'u silebiliriz.

import { NextRequest, NextResponse } from "next/server";
import { sendCAPIEvent } from "@/lib/meta-capi";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const pixel = url.searchParams.get("pixel") || "aiscale";

  const expectedSecret = process.env.SEED_VIPUPSELL_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "SEED_VIPUPSELL_SECRET env var not configured" },
      { status: 503 }
    );
  }
  if (secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const sourceUrl =
    pixel === "dijital"
      ? "https://dijitalakademi.live/odemeonay"
      : "https://www.aiscaleapp.com/odemeonay";

  const result = await sendCAPIEvent({
    eventName: "VIPUpsell",
    eventId: `seed_vipupsell_${Date.now()}`,
    sourceUrl,
    userData: {
      email: "seed-event@aiscaleapp.internal",
      firstName: "Seed",
      lastName: "Event",
    },
    customData: {
      value: 19.0,
      currency: "USD",
    },
  });

  return NextResponse.json({
    ok: true,
    pixel,
    sourceUrl,
    metaResponse: result,
    note: "5-10 dakika içinde Meta Events Manager → Custom Conversions → Event dropdown'unda 'VIPUpsell' görünmeli.",
  });
}
