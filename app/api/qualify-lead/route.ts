// Qualify Lead — Tek fazlı kayıt + Zoom + email + tek CAPI event.
//
// Modal form submit: Ad + Email → bu endpoint her kullanıcı için:
//   1. Supabase'e kayıt
//   2. Zoom webinar kaydı
//   3. YouTube engagement email (sadece aiscale webinar'ı için)
//   4. Sayfa türüne göre TEK CAPI event fire:
//        - /ana sayfa       → CompleteRegistration
//        - /vip-mastermind  → Lead
//
// Önceki "budget tier" qualification filtresi kaldırıldı. Artık herkes
// "Yerimi Ayırt" diyince Zoom'a kaydolur ve audience'a sinyal gider.

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

// Meta CAPI value field — eski random tiny value pattern. 0.01-0.99 TRY arasında.
// Bu, Meta'nın value+currency yapısal şartını karşılar ama gerçek revenue değil,
// optimization'ı bias'lamaz. Value bidding yapmıyoruz, lead-gen optimization yapıyoruz.
function randomEventValue(): number {
  return parseFloat((Math.random() * 0.98 + 0.01).toFixed(2));
}

// /katil her gün yenilenen seminer — bir sonraki 20:00 (TR) tarihini
// "13 Haziran Cumartesi · 20:00 (TR)" formatında döndürür. 20:00'ı geçtiyse
// yarına sarkar (sayfalardaki rolling countdown ile birebir aynı mantık).
function getRollingWebinarDateTR(): string {
  const turkey = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
  );
  const target = new Date(turkey);
  if (turkey.getHours() >= 20) target.setDate(target.getDate() + 1);
  // Başlangıç tabanı: 13 Haziran 2026'dan önce hep o tarihi göster.
  const floor = new Date(2026, 5, 13, 20, 0, 0, 0);
  if (target.getTime() < floor.getTime()) target.setTime(floor.getTime());
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const days = [
    "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi",
  ];
  return `${target.getDate()} ${months[target.getMonth()]} ${days[target.getDay()]} · 20:00 (TR)`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      firstName,
      lastName,
      phone,
      webinarId,
      sourceUrl,
      fbc,
      fbp,
      eventType: rawEventType,
      contentName: bodyContentName,
    } = body as {
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      webinarId?: string;
      sourceUrl?: string;
      fbc?: string;
      fbp?: string;
      eventType?: "CR" | "Lead";
      // Variant override — /katil gibi paralel funnel'lar Meta dashboard'da
      // ayırt edilebilmek için custom content_name gönderir.
      contentName?: string;
    };

    // eventType: hangi Meta event'i fire edilecek?
    //   "CR"   → CompleteRegistration (varsayılan, ana sayfa)
    //   "Lead" → Lead (yeni VIP sayfası /vip-mastermind)
    // Full audience ayrımı için sayfalar farklı event fire eder.
    const eventType: "CR" | "Lead" =
      rawEventType === "Lead" ? "Lead" : "CR";
    const eventName =
      eventType === "Lead" ? "Lead" : "CompleteRegistration";

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "email and firstName required" },
        { status: 400 }
      );
    }

    const eventId = crypto.randomUUID();
    const leadEventId = crypto.randomUUID();
    const fullName = `${firstName} ${lastName || ""}`.trim();

    // 1. Supabase upsert — her lead kaydedilir
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
            webinar_link_sent: true,
            webinar_link_sent_at: new Date().toISOString(),
          })
          .eq("email", email);
        console.log(`✅ Supabase: subscriber UPDATED for ${email}`);
      } else {
        await supabase
          .from("email_subscribers")
          .insert({
            email,
            name: fullName,
            phone: phone || null,
            source: "yerimi_ayirt",
            webinar_link_sent: true,
            webinar_link_sent_at: new Date().toISOString(),
          });
        console.log(`✅ Supabase: subscriber INSERTED for ${email}`);
      }
    } catch (dbError) {
      console.warn("⚠️ Supabase save (non-critical):", dbError);
    }

    // 1.5. GoHighLevel Inbound Webhook — kişiyi GHL Contacts'a it.
    // Best-effort: GHL hatası kaydı bozmaz. URL env'den, yoksa default.
    // GHL Workflow tarafında bu JSON alanları Create/Update Contact'a maplenir.
    const ghlWebhookUrl =
      process.env.GHL_INBOUND_WEBHOOK_URL ||
      "https://services.leadconnectorhq.com/hooks/HKKWM8kTRSbS4g6gWDwT/webhook-trigger/065f186b-a04a-47ab-9f9d-ba69b45b83c9";
    try {
      await fetch(ghlWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName || "",
          last_name: lastName || "",
          name: fullName,
          email,
          phone: phone || "",
          source: "aiscaleapp_site",
          webinar_id: webinarId || "",
          page_url: sourceUrl || "",
        }),
      });
      console.log(`✅ GHL: contact pushed for ${email}`);
    } catch (ghlError) {
      console.warn("⚠️ GHL webhook (non-critical):", ghlError);
    }

    const eventValue = randomEventValue();

    // 2. Zoom registration — herkes için
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

    // 3. YouTube engagement email — sadece aiscale (eticaret webinar ID değilse)
    const isEticaret = webinarId === "86257770515";
    // /katil her gün yenilenen seminer. Mailde tarih bloğu + tesekkurler
    // butonu gözüksün diye rolling (sonraki 20:00 TR) tarih string'i geçilir.
    // Ana funnel (auto-webinar) için undefined → tarih bloğu gizli kalır.
    const isKatil = webinarId === "81497341331";
    const katilEventDate = isKatil ? getRollingWebinarDateTR() : undefined;
    if (!isEticaret) {
      sendWebinarYoutubeEmail(
        email,
        firstName || "",
        katilEventDate
      ).catch((err) =>
        console.warn("⚠️ YouTube email failed:", err?.message || err)
      );
    }

    // 4. CAPI event — sayfaya göre TEK event
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
    //
    // ÖNEMLİ: await ediyoruz çünkü Vercel serverless function NextResponse
    // döndüğü anda runtime'ı freeze edebilir. Fire-and-forget pattern fetch'i
    // tamamlanmadan kestiriyordu, Meta event'e ulaşmıyordu.
    const isLeadEvent = eventType === "Lead";
    const firedEventId = isLeadEvent ? leadEventId : eventId;
    try {
      await sendCAPIEvent({
        eventName,
        eventId: firedEventId,
        sourceUrl: referer,
        userData: sharedUserData,
        customData: {
          // Variant override > eticaret detection > default
          content_name:
            bodyContentName ||
            (isEticaret ? "E-Ticaret Webinar Kayıt" : "Webinar Kayıt"),
          ...(isLeadEvent
            ? { content_category: "webinar" }
            : { status: "completed" }),
          value: eventValue,
          currency: "TRY",
        },
      });
    } catch (err) {
      console.warn(`⚠️ CAPI ${eventName} error:`, err);
    }

    return NextResponse.json({
      success: true,
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
