import { NextRequest, NextResponse } from 'next/server';
import { sendCAPIEvent } from '@/lib/meta-capi';

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
  // Meta fbp format: fb.1.<unix_ms>.<random_10_digit>
  const random = Math.floor(Math.random() * 9e9) + 1e9;
  return `fb.1.${Date.now()}.${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, sourceUrl, customData, eventId, eventTime, email, firstName, lastName, fbc: bodyFbc, fbp: bodyFbp } = body;

    if (!eventName) {
      return NextResponse.json({ error: 'eventName required' }, { status: 400 });
    }

    const clientIp = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Server-side fallback: read _fbp/_fbc from cookie header if not in body
    const cookies = parseCookies(request.headers.get('cookie'));
    let fbp = bodyFbp || cookies['_fbp'];
    const fbc = bodyFbc || cookies['_fbc'];

    // Last resort: generate fbp server-side so coverage is always 100%
    let setFbpCookie = false;
    if (!fbp) {
      fbp = generateFbp();
      setFbpCookie = true;
    }

    const result = await sendCAPIEvent({
      eventName,
      eventId,
      eventTime: eventTime ? Number(eventTime) : undefined,
      sourceUrl: sourceUrl || request.headers.get('referer') || 'https://aiscaleapp.com',
      userData: {
        email: email || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        clientIpAddress: clientIp,
        clientUserAgent: userAgent,
        fbc: fbc || undefined,
        fbp,
      },
      customData,
    });

    const response = NextResponse.json({ success: true, result });

    // Set _fbp cookie if we generated it, so future events use the same ID
    if (setFbpCookie) {
      response.cookies.set('_fbp', fbp, {
        maxAge: 60 * 60 * 24 * 90, // 90 days (Meta standard)
        path: '/',
        sameSite: 'lax',
        secure: true,
      });
    }

    return response;
  } catch (error) {
    console.error('❌ Meta CAPI route error:', error);
    return NextResponse.json({ error: 'CAPI event failed' }, { status: 500 });
  }
}
