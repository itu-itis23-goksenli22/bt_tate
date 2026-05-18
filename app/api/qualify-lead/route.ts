// Qualify Lead — Phase 2 of two-phase registration flow.
//
// /api/save-lead form'da kaydedildikten sonra kullanıcı bütçe tier'ını seçer:
//   - "low"  (0-3.000 TL)     → Zoom YOK, event YOK, Skool'a yönlendir
//   - "mid"  (3.000-10.000 TL) → Zoom + email + CompleteRegistration (value: 5)
//   - "high" (10.000+ TL)      → Zoom + email + CompleteRegistration (value: 15)
//
// Bu sayede Meta'nın CompleteRegistration audience'ı SADECE yüksek niyetli
// kullanıcılarla beslenir → Lookalike + reklam optimizasyonu çok daha precise.
// Düşük bütçe kullanıcılar Skool topluluğuna gider (ücretsiz değer), audience
// sinyalini kirletmez.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendCAPIEvent } from "@/lib/meta-capi";
import { sendWebinarYoutubeEmail } from "@/lib/purchase-emails";
import { getZoomAccessToken, registerToZoomWebinar } from "@/lib/zoom";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type BudgetTier = "low" | "mid" | "high";

const SKOOL_URL = "https://www.skool.com/aiscaleapp-9624/about";

// Meta CAPI value field — higher value = Meta value-based bidding prioritizes more.
// mid: 5, high: 15. Düşük tier için CompleteRegistration hiç atılmıyor.
const TIER_VALUE: Record<BudgetTier, number> = {
  low: 0,
  mid: 5,
  high: 15,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventId,
      email,
      firstName,
      lastName,
      phone,
      budgetTier,
      webinarId,
      sourceUrl,
      fbc,
      fbp,
    } = body as {
      eventId?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      budgetTier?: BudgetTier;
      webinarId?: string;
      sourceUrl?: string;
      fbc?: string;
      fbp?: string;
    };

    if (!email || !budgetTier) {
      return NextResponse.json(
        { error: "email and budgetTier required" },
        { status: 400 }
      );
    }

    if (!["low", "mid", "high"].includes(budgetTier)) {
      return NextResponse.json(
        { error: "invalid budgetTier" },
        { status: 400 }
      );
    }

    // 1. Her durumda Supabase'i güncelle (tier kaydet)
    try {
      await supabase
        .from("email_subscribers")
        .update({
          budget_tier: budgetTier,
          webinar_link_sent: budgetTier !== "low",
          webinar_link_sent_at:
            budgetTier !== "low" ? new Date().toISOString() : null,
        })
        .eq("email", email);
    } catch (dbError) {
      console.warn("⚠️ Supabase update (non-critical):", dbError);
    }

    // 2. Low tier → Skool, hiç event atma, Zoom oluşturma
    if (budgetTier === "low") {
      return NextResponse.json({
        success: true,
        tier: "low",
        redirectUrl: SKOOL_URL,
        zoomJoinUrl: null,
      });
    }

    // 3. Mid + High tier → Zoom registration
    let zoomJoinUrl: string | null = null;
    try {
      const accessToken = await getZoomAccessToken();
      const zoomResult = await registerToZoomWebinar(
        accessToken,
        email,
        firstName || "User",
        lastName || "-",
        phone || "",
        webinarId
      );
      zoomJoinUrl = zoomResult.join_url;
    } catch (zoomError) {
      console.error("❌ Zoom registration failed:", zoomError);
      // Zoom başarısız olsa bile devam ediyoruz — kullanıcıyı kayitbasarili'ye
      // yönlendireceğiz, email Zoom link'i olmadan da gönderilebilir (best effort).
    }

    // 4. YouTube engagement email — sadece aiscale (eticaret webinar ID değilse)
    const isEticaret = webinarId === "86257770515";
    if (!isEticaret) {
      sendWebinarYoutubeEmail(email, firstName || "")
        .catch((err) =>
          console.warn("⚠️ YouTube email failed:", err?.message || err)
        );
    }

    // 5. CompleteRegistration CAPI event — tier-weighted value
    const referer = request.headers.get("referer") || sourceUrl || "https://www.aiscaleapp.com/";
    const clientIp =
      request.headers.get("x-real-ip")?.trim() ||
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "";
    const userAgent = request.headers.get("user-agent") || "";

    sendCAPIEvent({
      eventName: "CompleteRegistration",
      eventId: eventId || crypto.randomUUID(),
      sourceUrl: referer,
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
        content_name: isEticaret ? "E-Ticaret Webinar Kayıt" : "Webinar Kayıt",
        status: "completed",
        value: TIER_VALUE[budgetTier],
        currency: "TRY",
        budget_tier: budgetTier,
      },
    }).catch((err) => console.warn("⚠️ CAPI CompleteRegistration error:", err));

    return NextResponse.json({
      success: true,
      tier: budgetTier,
      redirectUrl: null, // frontend kayitbasarili'ye redirect kendisi yapar
      zoomJoinUrl,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("qualify-lead error:", message);
    return NextResponse.json(
      { error: "qualify_failed", detail: message },
      { status: 500 }
    );
  }
}
