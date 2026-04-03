"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

export default function MetaPixel() {
  useEffect(() => {
    // Fire PageView from useEffect to ensure correct URL (inline script may fire too early)
    if (typeof window === "undefined" || !window.fbq) return;

    const pvEventId = 'pv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    window.fbq('track', 'PageView', {}, { eventID: pvEventId });

    // Send matching server-side PageView via CAPI for dedup
    const payload = JSON.stringify({
      eventName: "PageView",
      eventId: pvEventId,
      sourceUrl: window.location.href,
      fbc: getCookie("_fbc"),
      fbp: getCookie("_fbp"),
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/meta-capi", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/meta-capi", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload }).catch(() => {});
    }
  }, []);

  return (
    <>
      {/* Meta Pixel Code — domain-based dual pixel */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            var pixelId = window.location.hostname.includes('dijitalakademi') ? '1261057665474950' : '793366716531580';
            fbq('init', pixelId);
          `,
        }}
      />
{/* noscript pixel removed — JS-only tracking with eventId for proper dedup */}
    </>
  );
}
