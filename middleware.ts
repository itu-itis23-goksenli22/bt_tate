import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const isDijitalAkademi = host.includes("dijitalakademi.live");

  // dijitalakademi.live root → show /eticaret content
  if (isDijitalAkademi && pathname === "/") {
    return NextResponse.rewrite(new URL("/eticaret", request.url));
  }

  // aiscaleapp.com root → /canli funnel'a yönlendir.
  // GEÇİCİ redirect (307) — kolay geri alınır. Sadece aiscaleapp host'unda
  // ve tam "/" path'inde. Diğer sayfalar (/katil, /vip-mastermind vb.) etkilenmez.
  if (!isDijitalAkademi && pathname === "/") {
    return NextResponse.redirect(new URL("/canli", request.url));
  }

  // dijitalakademi.live/kayitbasarili → /eticaret/kayitbasarili
  if (isDijitalAkademi && pathname === "/kayitbasarili") {
    return NextResponse.rewrite(new URL("/eticaret/kayitbasarili", request.url));
  }

  // dijitalakademi.live/kayitbasarili/tesekkurler → /eticaret/kayitbasarili/tesekkurler
  if (isDijitalAkademi && pathname === "/kayitbasarili/tesekkurler") {
    return NextResponse.rewrite(new URL("/eticaret/kayitbasarili/tesekkurler", request.url));
  }

  // dijitalakademi.live/firsat → /eticaret/firsat
  if (isDijitalAkademi && pathname === "/firsat") {
    return NextResponse.rewrite(new URL("/eticaret/firsat", request.url));
  }

  // dijitalakademi.live/odemeonay → /eticaret/odemeonay
  if (isDijitalAkademi && pathname === "/odemeonay") {
    return NextResponse.rewrite(new URL("/eticaret/odemeonay", request.url));
  }

  // Block /eticaret page from non-dijitalakademi.live domains (only exact /eticaret path)
  if (pathname === "/eticaret" && !isDijitalAkademi) {
    return new NextResponse(null, { status: 404 });
  }

  // /zoomkayit removed → redirect to home
  if (pathname === "/zoomkayit") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/eticaret", "/eticaret/:path*", "/kayitbasarili", "/kayitbasarili/tesekkurler", "/firsat", "/odemeonay", "/zoomkayit"],
};
