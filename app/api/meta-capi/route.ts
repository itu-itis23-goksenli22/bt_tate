import { NextRequest, NextResponse } from 'next/server';
import { sendCAPIEvent } from '@/lib/meta-capi';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, sourceUrl, customData, eventId } = body;

    if (!eventName) {
      return NextResponse.json({ error: 'eventName required' }, { status: 400 });
    }

    const clientIp = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
    const userAgent = request.headers.get('user-agent') || '';

    const result = await sendCAPIEvent({
      eventName,
      eventId,
      sourceUrl: sourceUrl || request.headers.get('referer') || 'https://aiscaleapp.com',
      userData: {
        clientIpAddress: clientIp,
        clientUserAgent: userAgent,
      },
      customData,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('❌ Meta CAPI route error:', error);
    return NextResponse.json({ error: 'CAPI event failed' }, { status: 500 });
  }
}
