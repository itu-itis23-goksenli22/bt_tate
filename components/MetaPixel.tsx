"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default function MetaPixel() {
  useEffect(() => {
    // Initialize Facebook Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
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
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=793366716531580&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
