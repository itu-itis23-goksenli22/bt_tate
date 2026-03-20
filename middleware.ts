import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // dijitalakademi.live root → show /eticaret content
  if (host.includes("dijitalakademi.live") && pathname === "/") {
    return NextResponse.rewrite(new URL("/eticaret", request.url));
  }

  // Block /eticaret from non-dijitalakademi.live domains — return 404
  if (pathname === "/eticaret" && !host.includes("dijitalakademi.live")) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  // /zoomkayit removed → redirect to home
  if (pathname === "/zoomkayit") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/eticaret", "/zoomkayit"],
};
