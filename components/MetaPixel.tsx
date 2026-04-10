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
    // Wait for BOTH the inline script to set __pageViewEventId AND fbevents.js to set _fbp cookie
    // This prevents the race condition where CAPI fires before the pixel is fully initialized
    const sendCAPI = () => {
      const eventId = (window as any).__pageViewEventId;
      if (!eventId) return; // No browser event to dedupe against

      const payload = JSON.stringify({
        eventName: "PageView",
        eventId,
        sourceUrl: window.location.href,
        fbc: getCookie("_fbc"),
        fbp: getCookie("_fbp"),
      });

      // fetch with keepalive is more reliable than sendBeacon for our use case
      // (sendBeacon has size limits and doesn't return errors)
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    };

    // Retry up to 10 times (5 seconds total) waiting for:
    // 1. __pageViewEventId to be set by inline script
    // 2. _fbp cookie to be set by fbevents.js
    let attempts = 0;
    const maxAttempts = 10;
    const checkAndSend = () => {
      attempts++;
      const hasEventId = !!(window as any).__pageViewEventId;
      const hasFbp = !!getCookie("_fbp");
      if ((hasEventId && hasFbp) || attempts >= maxAttempts) {
        sendCAPI();
      } else {
        setTimeout(checkAndSend, 500);
      }
    };
    // Start checking after 200ms (give inline script time to run)
    setTimeout(checkAndSend, 200);
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
            var pvEventId = 'pv_' + Date.now() + '_' + Math.random().toString(36).substr(2,9);
            window.__pageViewEventId = pvEventId;
            fbq('track', 'PageView', {}, {eventID: pvEventId});
          `,
        }}
      />
{/* noscript pixel removed — JS-only tracking with eventId for proper dedup */}
    </>
  );
}
