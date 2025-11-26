import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://link.msgsndr.com https://api.leadconnectorhq.com https://www.googletagmanager.com https://connect.facebook.net;
    style-src 'self' 'unsafe-inline' https://api.fontshare.com;
    style-src-elem 'self' 'unsafe-inline' https://api.fontshare.com;
    img-src 'self' blob: data: https: http:;
    font-src 'self' data: https://api.fontshare.com;
    media-src 'self' https://sutwdchlbrukrnygspbg.supabase.co blob: data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://api.leadconnectorhq.com;
    frame-ancestors 'none';
    frame-src 'self' https://api.leadconnectorhq.com https://www.youtube.com https://www.youtube-nocookie.com;
    connect-src 'self' https://api.leadconnectorhq.com https://link.msgsndr.com https://www.google-analytics.com https://www.facebook.com https://sutwdchlbrukrnygspbg.supabase.co;
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
