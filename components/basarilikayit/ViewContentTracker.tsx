"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/meta-pixel";

export default function ViewContentTracker() {
  useEffect(() => {
    const customData = {
      content_name: "Firsat Sayfası",
      content_category: "Sales Page",
      value: 15000,
      currency: "TRY",
    };
    // Browser pixel
    trackViewContent(customData);
    // Server-side CAPI
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "ViewContent",
        sourceUrl: window.location.href,
        customData,
      }),
    }).catch(() => {});
  }, []);

  return null;
}
