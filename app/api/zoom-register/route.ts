import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { sendCAPIEvent } from '@/lib/meta-capi';
import { sendWebinarYoutubeEmail } from '@/lib/purchase-emails';

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

async function registerToZoomWebinar(accessToken: string, email: string, firstName: string, lastName: string, phone: string, webinarId?: string) {
  const targetWebinarId = webinarId || ZOOM_WEBINAR_ID;
  const response = await fetch(`https://api.zoom.us/v2/webinars/${targetWebinarId}/registrants`, {
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

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  const out: Record<string, string> = {};
  header.split(';').forEach(c => {
    const [k, ...v] = c.trim().split('=');
    if (k) out[k] = v.join('=');
  });
  return out;
}

function generateFbp(): string {
  const random = Math.floor(Math.random() * 9e9) + 1e9;
  return `fb.1.${Date.now()}.${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phone, webinarId, fbc: bodyFbc, fbp: bodyFbp } = body;

    // Server-side fallback for fbp/fbc — read from cookie header if not in body
    const cookies = parseCookies(request.headers.get('cookie'));
    let fbp = bodyFbp || cookies['_fbp'];
    const fbc = bodyFbc || cookies['_fbc'];
    if (!fbp) fbp = generateFbp();

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
    const zoomResult = await registerToZoomWebinar(accessToken, email, firstName, lastName, phone, webinarId);
    console.log('✅ Zoom registration successful:', zoomResult.registrant_id);

    // 4. Send Meta CAPI server-side CompleteRegistration event (non-blocking)
    const referer = request.headers.get('referer') || 'https://aiscaleapp.com';
    const clientIp =
      request.headers.get('x-real-ip')?.trim() ||
      request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      '';
    const userAgent = request.headers.get('user-agent') || '';
    const eventId = crypto.randomUUID();
    const leadEventId = crypto.randomUUID();
    const eventValue = parseFloat((Math.random() * 0.98 + 0.01).toFixed(2));
    const contentName = webinarId === '86257770515' ? 'E-Ticaret Webinar Kayıt' : 'Webinar Kayıt';
    const sharedUserData = {
      email,
      firstName,
      lastName,
      phone: phone || undefined,
      clientIpAddress: clientIp,
      clientUserAgent: userAgent,
      fbc: fbc || undefined,
      fbp: fbp || undefined,
    };
    sendCAPIEvent({
      eventName: 'CompleteRegistration',
      eventId,
      sourceUrl: referer,
      userData: sharedUserData,
      customData: {
        content_name: contentName,
        status: 'completed',
        value: eventValue,
        currency: 'TRY',
      },
    }).catch(err => console.warn('⚠️ CAPI non-critical error:', err));

    // 4b. Also send a Lead event — required for Meta's "Maximize leads" optimization
    sendCAPIEvent({
      eventName: 'Lead',
      eventId: leadEventId,
      sourceUrl: referer,
      userData: sharedUserData,
      customData: {
        content_name: contentName,
        content_category: 'webinar',
        value: eventValue,
        currency: 'TRY',
      },
    }).catch(err => console.warn('⚠️ CAPI Lead non-critical error:', err));

    // 5. Send YouTube engagement email (aiscale only, NOT eticaret) — non-blocking
    const isEticaret = webinarId === '86257770515';
    if (!isEticaret) {
      sendWebinarYoutubeEmail(email, firstName)
        .then(() => console.log(`📧 YouTube engagement email sent to ${email}`))
        .catch(err => console.warn('⚠️ YouTube email failed:', err?.message || err));
    }

    return NextResponse.json({
      success: true,
      message: 'Webinara başarıyla kaydoldunuz!',
      joinUrl: zoomResult.join_url,
      eventId,
      leadEventId,
      eventValue,
    });
  } catch (error) {
    console.error('❌ Zoom register error:', error);
    return NextResponse.json(
      { error: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
