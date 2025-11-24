"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function PurchasePixel() {
  useEffect(() => {
    // Track purchase event when component mounts
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        value: 35.0,
        currency: "USD",
      });
      console.log("Meta Pixel: Purchase event tracked (value: $35)");
    }
  }, []);

  return (
    <>
      {/* Meta Pixel Purchase Event */}
      <Script
        id="meta-pixel-purchase"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (window.fbq) {
              fbq('track', 'Purchase', {
                value: 35.00,
                currency: 'USD'
              });
            }
          `,
        }}
      />
    </>
  );
}
