// WebinarKit Register Webhook — /canli funnel tracking.
//
// WebinarKit "New Registration" webhook'u buraya POST eder. Yaptığı:
//   1. Supabase email_subscribers'a kayıt (source: webinarkit_canli)
//   2. GoHighLevel Contacts'a push (arama/hatırlatma funnel'ı için)
//   3. Meta CAPI CompleteRegistration (email + telefon hash'li, yüksek EMQ)
//
// ZOOM YOK — bu funnel tamamen WebinarKit üzerinden. Welcome email de
// göndermiyoruz; hatırlatma e-postalarını WebinarKit kendi gönderiyor.
//
// NOT: WebinarKit webhook'unun JSON alan adları kesin bilinmiyor; payload
// toleranslı parse ediliyor ve HAM body loglanıyor. İlk gerçek kayıttan
// sonra Vercel log'undan gerçek alan adlarını teyit edip sıkılaştırabiliriz.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { sendCAPIEvent } from "@/lib/meta-capi";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function randomEventValue(): number {
  return parseFloat((Math.random() * 0.98 + 0.01).toFixed(2));
}

// Toleranslı alan çekici — birden çok olası anahtar adını dener.
function pick(obj: Record<string, any>, keys: string[]): string {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}

function normalizePhone(raw: string, countryCode: string): string {
  if (!raw) return "";
  let p = raw.replace(/[^\d+]/g, "");
  if (p.startsWith("+")) return p;
  const cc = countryCode.replace(/[^\d]/g, "");
  if (cc) return `+${cc}${p.replace(/^0+/, "")}`;
  if (p.startsWith("00")) return `+${p.slice(2)}`;
  if (p.startsWith("0")) return `+9${p}`; // TR 0... → +90...
  return `+${p}`;
}

export async function POST(request: NextRequest) {
  try {
    // İsteğe bağlı token koruması (?token=...). Env yoksa serbest.
    const expected = process.env.WEBINARKIT_WEBHOOK_TOKEN;
    if (expected) {
      const got = new URL(request.url).searchParams.get("token");
      if (got !== expected) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
    }

    // JSON veya form-encoded olabilir — ikisini de dene.
    let body: Record<string, any> = {};
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      body = await request.json().catch(() => ({}));
    } else {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = Object.fromEntries(new URLSearchParams(text));
      }
    }

    // HAM payload logu — gerçek alan adlarını görmek için.
    console.log("📥 WebinarKit webhook RAW:", JSON.stringify(body));

    // Veri nested gelebilir (registrant/contact/data) — düzleştir.
    const r: Record<string, any> = {
      ...(body.registrant || {}),
      ...(body.contact || {}),
      ...(body.data || {}),
      ...body,
    };

    const email = pick(r, ["email", "emailAddress", "email_address", "Email"]).toLowerCase();
    let firstName = pick(r, ["firstName", "first_name", "fname", "firstname", "First Name"]);
    let lastName = pick(r, ["lastName", "last_name", "lname", "lastname", "Last Name"]);
    const fullNameRaw = pick(r, ["name", "fullName", "full_name", "Name"]);
    if (!firstName && fullNameRaw) {
      const parts = fullNameRaw.split(" ");
      firstName = parts[0] || fullNameRaw;
      lastName = lastName || parts.slice(1).join(" ");
    }
    const phoneRaw = pick(r, ["phone", "phoneNumber", "phone_number", "Phone", "mobile"]);
    const countryCode = pick(r, ["phoneCountryCode", "phone_country_code", "countryCode", "country_code", "dialCode"]);
    const phone = normalizePhone(phoneRaw, countryCode);

    if (!email) {
      // Yine de 200 dön — webhook retry fırtınası olmasın; ama logla.
      console.warn("⚠️ WebinarKit webhook: email yok, atlandı.");
      return NextResponse.json({ ok: true, skipped: "no_email" });
    }

    const fullName = `${firstName} ${lastName || ""}`.trim() || email;
    const eventId = crypto.randomUUID();

    // 1. Supabase upsert
    try {
      const { data: existing } = await supabase
        .from("email_subscribers")
        .select("id")
        .eq("email", email)
        .single();
      if (existing) {
        await supabase
          .from("email_subscribers")
          .update({ name: fullName, phone: phone || null })
          .eq("email", email);
      } else {
        await supabase
          .from("email_subscribers")
          .insert({
            email,
            name: fullName,
            phone: phone || null,
            source: "webinarkit_canli",
          });
      }
      console.log(`✅ Supabase: ${email}`);
    } catch (dbError) {
      console.warn("⚠️ Supabase (non-critical):", dbError);
    }

    // 2. GoHighLevel inbound webhook — arama/hatırlatma funnel'ı
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
          source: "webinarkit_canli",
        }),
      });
      console.log(`✅ GHL: ${email}`);
    } catch (ghlError) {
      console.warn("⚠️ GHL webhook (non-critical):", ghlError);
    }

    // 3. Meta CAPI — CompleteRegistration (email + telefon hash'li)
    try {
      // Lead event — /katil funnel ile tutarlı (aynı audience/optimization).
      await sendCAPIEvent({
        eventName: "Lead",
        eventId,
        sourceUrl: "https://www.aiscaleapp.com/canli",
        userData: {
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          phone: phone || undefined,
        },
        customData: {
          content_name: "Canli Webinar Kayıt",
          content_category: "webinar",
          value: randomEventValue(),
          currency: "TRY",
        },
      });
      console.log(`✅ CAPI Lead: ${email}`);
    } catch (err) {
      console.warn("⚠️ CAPI error:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("webinarkit-register error:", message);
    // Webhook'ları sakin tutmak için 200 — ama hatayı logla.
    return NextResponse.json({ ok: false, error: message });
  }
}

// Webhook URL doğrulaması için (bazı platformlar GET ile test eder).
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "webinarkit-register" });
}
