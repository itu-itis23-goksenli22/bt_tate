// Budget-Qualified CompleteRegistration Event Endpoint
//
// /api/zoom-register form submit'inde artık CompleteRegistration fire edilmiyor.
// Bunun yerine kullanıcı "10.000 TL+ bütçem var" butonuna tıkladığında frontend
// bu endpoint'i çağırır, server-side CAPI CompleteRegistration event'i atılır.
//
// Aynı eventId ile client-side fbq('track', 'CompleteRegistration') de fire eder
// (dedup için), zoom-register'ın döndürdüğü eventId'yi geçer.

import { NextRequest, NextResponse } from "next/server";
import { sendCAPIEvent } from "@/lib/meta-capi";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventId,
      email,
      firstName,
      lastName,
      phone,
      value,
      sourceUrl,
      contentName,
      fbc,
      fbp,
    } = body as {
      eventId?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      value?: number;
      sourceUrl?: string;
      contentName?: string;
      fbc?: string;
      fbp?: string;
    };

    if (!eventId || !email) {
      return NextResponse.json(
        { error: "eventId and email are required" },
        { status: 400 }
      );
    }

    const clientIp =
      request.headers.get("x-real-ip")?.trim() ||
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "";
    const userAgent = request.headers.get("user-agent") || "";

    const result = await sendCAPIEvent({
      eventName: "CompleteRegistration",
      eventId,
      sourceUrl: sourceUrl || "https://www.aiscaleapp.com/",
      userData: {
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || undefined,
        clientIpAddress: clientIp,
        clientUserAgent: userAgent,
        fbc: fbc || undefined,
        fbp: fbp || undefined,
      },
      customData: {
        content_name: contentName || "Webinar Kayıt",
        status: "completed",
        value: value ?? 0.5,
        currency: "TRY",
        budget_qualified: true,
      },
    });

    return NextResponse.json({ success: true, metaResponse: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn("⚠️ fire-complete-registration error:", message);
    return NextResponse.json(
      { error: "fire_failed", detail: message },
      { status: 500 }
    );
  }
}
