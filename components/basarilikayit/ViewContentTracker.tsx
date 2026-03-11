"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/meta-pixel";

export default function ViewContentTracker() {
  useEffect(() => {
    trackViewContent({
      content_name: "Firsat Sayfası",
      content_category: "Sales Page",
      value: 15000,
      currency: "TRY",
    });
  }, []);

  return null;
}
