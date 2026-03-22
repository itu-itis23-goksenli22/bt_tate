"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/meta-pixel";

export default function EticaretViewContentTracker() {
  useEffect(() => {
    trackViewContent({
      content_name: "E-Ticaret Firsat Sayfası",
      content_category: "Sales Page",
      value: 9900,
      currency: "TRY",
    });
  }, []);

  return null;
}
