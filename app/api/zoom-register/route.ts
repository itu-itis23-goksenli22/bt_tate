import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Zoom credentials
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID!;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID!;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET!;
const ZOOM_WEBINAR_ID = process.env.ZOOM_WEBINAR_ID!;

async function getZoomAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://zoom.us/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'account_credentials',
      account_id: ZOOM_ACCOUNT_ID,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoom OAuth failed: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function registerToZoomWebinar(accessToken: string, email: string, firstName: string, lastName: string, phone: string) {
  const response = await fetch(`https://api.zoom.us/v2/webinars/${ZOOM_WEBINAR_ID}/registrants`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoom registration failed: ${error}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phone } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi girin' },
        { status: 400 }
      );
    }

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Ad ve soyad gereklidir' },
        { status: 400 }
      );
    }

    console.log('🎯 Zoom webinar registration for:', email);

    // 1. Save to Supabase (non-blocking)
    try {
      const { data: existing } = await supabase
        .from('email_subscribers')
        .select('id')
        .eq('email', email)
        .single();

      if (existing) {
        await supabase
          .from('email_subscribers')
          .update({
            name: `${firstName} ${lastName}`,
            phone: phone || null,
            webinar_link_sent: true,
            webinar_link_sent_at: new Date().toISOString(),
          })
          .eq('email', email);
      } else {
        await supabase
          .from('email_subscribers')
          .insert({
            email,
            name: `${firstName} ${lastName}`,
            phone: phone || null,
            source: 'zoom_register',
            webinar_link_sent: true,
            webinar_link_sent_at: new Date().toISOString(),
          });
      }
      console.log('✅ Supabase: subscriber saved');
    } catch (dbError) {
      console.warn('⚠️ Supabase save failed (non-critical):', dbError);
    }

    // 2. Get Zoom access token
    const accessToken = await getZoomAccessToken();

    // 3. Register to Zoom webinar
    const zoomResult = await registerToZoomWebinar(accessToken, email, firstName, lastName, phone);
    console.log('✅ Zoom registration successful:', zoomResult.registrant_id);

    return NextResponse.json({
      success: true,
      message: 'Webinara başarıyla kaydoldunuz!',
      joinUrl: zoomResult.join_url,
    });
  } catch (error) {
    console.error('❌ Zoom register error:', error);
    return NextResponse.json(
      { error: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
