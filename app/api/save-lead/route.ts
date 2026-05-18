// Save Lead to Supabase — Phase 1 of two-phase registration flow.
//
// Form submit edildiğinde çağrılır. Sadece Supabase'e kaydeder, Zoom registration
// veya Meta CAPI event'i göndermez. Bunlar Phase 2'de (/api/qualify-lead) yapılır,
// kullanıcı bütçe tier'ını seçtikten sonra.
//
// Düşük bütçe (0-3k TL) kullanıcılar Zoom'a hiç kaydolmaz, Skool'a yönlenir.
// Orta + Yüksek bütçe (3-10k / 10k+) kullanıcılar Zoom + CompleteRegistration alır.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phone } = body as {
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
    };

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "email and firstName required" },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName || ""}`.trim();
    const eventId = crypto.randomUUID();
    // Meta CAPI value: randomize küçük fraction (existing pattern korunsun)
    const eventValue = parseFloat((Math.random() * 0.98 + 0.01).toFixed(2));

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
            // budget_tier null kalır — qualify-lead endpoint'i set eder
          })
          .eq("email", email);
      } else {
        await supabase
          .from("email_subscribers")
          .insert({
            email,
            name: fullName,
            phone: phone || null,
            source: "lead_pre_qualification",
            // webinar_link_sent: false (default), qualify-lead'de true olur
          });
      }
    } catch (dbError) {
      console.warn("⚠️ Supabase save (non-critical):", dbError);
    }

    return NextResponse.json({
      success: true,
      eventId,
      eventValue,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("save-lead error:", message);
    return NextResponse.json(
      { error: "save_failed", detail: message },
      { status: 500 }
    );
  }
}
