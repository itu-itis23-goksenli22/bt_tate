"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/meta-pixel";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

interface ViewContentTrackerProps {
  // Variant'lar için opsiyonel override'lar (default = /firsat sayfası
  // değerleri). /sonfirsat için value=29900 ve content_name="Sonfirsat
  // Sayfası" geçilir.
  value?: number;
  contentName?: string;
}

export default function ViewContentTracker({
  value = 15000,
  contentName = "Firsat Sayfası",
}: ViewContentTrackerProps = {}) {
  useEffect(() => {
    const eventId = crypto.randomUUID();
    const customData = {
      content_name: contentName,
      content_category: "Sales Page",
      value,
      currency: "TRY",
    };
    // Browser pixel with eventId for dedup — wait for fbp cookie to avoid race condition
    let attempts = 0;
    const maxAttempts = 6;
    const fireEvents = () => {
      attempts++;
      if (!getCookie("_fbp") && attempts < maxAttempts) {
        setTimeout(fireEvents, 500);
        return;
      }
      // Browser pixel
      trackViewContent(customData, eventId);
      // Server-side CAPI with same eventId + fbc/fbp
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "ViewContent",
          eventId,
          sourceUrl: window.location.href,
          customData,
          fbc: getCookie("_fbc"),
          fbp: getCookie("_fbp"),
        }),
        keepalive: true,
      }).catch(() => {});
    };
    setTimeout(fireEvents, 500);
  }, [value, contentName]);

  return null;
}
