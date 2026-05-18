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

// 4 bütçe tier'ı — Baturalp'in WhatsApp talebine göre:
//   0-3.000 TL   → unqualified, Skool
//   3-7.500 TL   → unqualified, Skool
//   7.5-15k TL   → qualified, Zoom + CompleteRegistration + Lead
//   15k+ TL      → qualified, Zoom + CompleteRegistration + Lead
type BudgetTier = "0_3000" | "3000_7500" | "7500_15000" | "15000_plus";

const SKOOL_URL = "https://www.skool.com/aiscaleapp-9624/about";

// Hangi tier'lar qualified (Zoom + event fire) hangileri unqualified (sadece Skool)
const QUALIFIED_TIERS: BudgetTier[] = ["7500_15000", "15000_plus"];

// Meta CAPI value field — eski random tiny value pattern. 0.01-0.99 TRY arasında.
// Bu, Meta'nın value+currency yapısal şartını karşılar ama gerçek revenue değil,
// optimization'ı bias'lamaz. Tier ayrımı value yerine `budget_tier` custom_data'da
// taşınır — value bidding yapmıyoruz, lead-gen optimization yapıyoruz.
function randomEventValue(): number {
  return parseFloat((Math.random() * 0.98 + 0.01).toFixed(2));
}

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
      eventType: rawEventType,
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
      eventType?: "CR" | "Lead";
    };

    // eventType: hangi Meta event'i fire edilecek?
    //   "CR"   → CompleteRegistration (varsayılan, /free-webinar/ana sayfa)
    //   "Lead" → Lead (yeni VIP sayfası /vip-mastermind)
    // Full audience ayrımı için sayfalar farklı event fire eder.
    const eventType: "CR" | "Lead" =
      rawEventType === "Lead" ? "Lead" : "CR";
    const eventName =
      eventType === "Lead" ? "Lead" : "CompleteRegistration";

    if (!email || !budgetTier || !firstName) {
      return NextResponse.json(
        { error: "email, firstName and budgetTier required" },
        { status: 400 }
      );
    }

    const validTiers: BudgetTier[] = [
      "0_3000",
      "3000_7500",
      "7500_15000",
      "15000_plus",
    ];
    if (!validTiers.includes(budgetTier)) {
      return NextResponse.json(
        { error: "invalid budgetTier" },
        { status: 400 }
      );
    }

    const isQualified = QUALIFIED_TIERS.includes(budgetTier);
    const eventId = crypto.randomUUID();
    const leadEventId = crypto.randomUUID();
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
            webinar_link_sent: isQualified,
            webinar_link_sent_at: isQualified ? new Date().toISOString() : null,
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
            webinar_link_sent: isQualified,
            webinar_link_sent_at: isQualified ? new Date().toISOString() : null,
          });
      }
    } catch (dbError) {
      console.warn("⚠️ Supabase save (non-critical):", dbError);
    }

    // 2. Unqualified tier (0-3k veya 3-7.5k) → Skool, hiç event atma, Zoom oluşturma
    if (!isQualified) {
      return NextResponse.json({
        success: true,
        tier: budgetTier,
        qualified: false,
        eventId,
        redirectUrl: SKOOL_URL,
        zoomJoinUrl: null,
      });
    }

    // Qualified tier'lar için random small event value — eski pattern
    const eventValue = randomEventValue();

    // 3. Qualified tier (7.5-15k veya 15k+) → Zoom registration
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

    const sharedUserData = {
      email,
      firstName: firstName || "",
      lastName: lastName || "",
      phone: phone || undefined,
      clientIpAddress: clientIp,
      clientUserAgent: userAgent,
      fbc: fbc || undefined,
      fbp: fbp || undefined,
    };

    // SADECE eventType'a göre tek event fire edilir (full audience ayrımı):
    //   /ana sayfa → "CR" → CompleteRegistration
    //   /vip-mastermind → "Lead" → Lead
    // Aynı sayfadan hem CR hem Lead atılmaz — Meta için iki ayrı audience olur.
    const isLeadEvent = eventType === "Lead";
    const firedEventId = isLeadEvent ? leadEventId : eventId;
    sendCAPIEvent({
      eventName,
      eventId: firedEventId,
      sourceUrl: referer,
      userData: sharedUserData,
      customData: {
        content_name: isEticaret ? "E-Ticaret Webinar Kayıt" : "Webinar Kayıt",
        ...(isLeadEvent
          ? { content_category: "webinar" }
          : { status: "completed" }),
        value: eventValue,
        currency: "TRY",
        budget_tier: budgetTier,
      },
    }).catch((err) =>
      console.warn(`⚠️ CAPI ${eventName} error:`, err)
    );

    return NextResponse.json({
      success: true,
      tier: budgetTier,
      qualified: true,
      eventType,
      eventName,
      eventId: firedEventId,
      eventValue,
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
