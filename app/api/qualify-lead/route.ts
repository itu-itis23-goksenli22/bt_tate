// Qualify Lead — Tek fazlı kayıt + bütçe qualification + tier-aware processing.
//
// Modal form submit'inde kullanıcı bütçe tier'ını seçmiş olur. Bu endpoint
// tier'a göre Zoom + CompleteRegistration + email işlemlerini yapar:
//   - "low"  (0-3.000 TL)     → Sadece Supabase kayıt, Zoom YOK, event YOK
//                                → Skool'a yönlendir
//   - "mid"  (3.000-10.000 TL) → Supabase + Zoom + email + CompleteRegistration (value: 5)
//   - "high" (10.000+ TL)      → Supabase + Zoom + email + CompleteRegistration (value: 15)
//
// Her tier'da Supabase'e kaydedilir (full funnel görünürlük). Sadece mid+high
// tier'ları Meta'ya CompleteRegistration sinyali gönderir — audience sadece
// niyetli alıcılarla beslenir, Lookalike + reklam optimizasyonu 5-10x daha precise.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
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

    if (!email || !budgetTier || !firstName) {
      return NextResponse.json(
        { error: "email, firstName and budgetTier required" },
        { status: 400 }
      );
    }

    if (!["low", "mid", "high"].includes(budgetTier)) {
      return NextResponse.json(
        { error: "invalid budgetTier" },
        { status: 400 }
      );
    }

    const eventId = crypto.randomUUID();
    const fullName = `${firstName} ${lastName || ""}`.trim();

    // 1. Supabase upsert — every lead saved regardless of tier
    try {
      const { data: existing } = await supabase
        .from("email_subscribers")
        .select("id")
        .eq("email", email)
        .single();

      if (existing) {
        await supabase
          .from("email_subscribers")
          .update({
            name: fullName,
            phone: phone || null,
            budget_tier: budgetTier,
            webinar_link_sent: budgetTier !== "low",
            webinar_link_sent_at:
              budgetTier !== "low" ? new Date().toISOString() : null,
          })
          .eq("email", email);
      } else {
        await supabase
          .from("email_subscribers")
          .insert({
            email,
            name: fullName,
            phone: phone || null,
            source: "yerimi_ayirt",
            budget_tier: budgetTier,
            webinar_link_sent: budgetTier !== "low",
            webinar_link_sent_at:
              budgetTier !== "low" ? new Date().toISOString() : null,
          });
      }
    } catch (dbError) {
      console.warn("⚠️ Supabase save (non-critical):", dbError);
    }

    // 2. Low tier → Skool, hiç event atma, Zoom oluşturma
    if (budgetTier === "low") {
      return NextResponse.json({
        success: true,
        tier: "low",
        eventId,
        eventValue: 0,
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
      eventId,
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
      eventId,
      eventValue: TIER_VALUE[budgetTier],
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
