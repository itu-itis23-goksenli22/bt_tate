"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PurchasePixel() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;

    // Get or generate unique event ID from URL params or localStorage
    let eventId = searchParams.get("order_id") ||
                  searchParams.get("session_id") ||
                  searchParams.get("transaction_id");

    // If no ID from URL, check if we already tracked this session
    const storageKey = "aiscale_purchase_tracked";

    if (!eventId) {
      // Check if we already tracked a purchase in this browser session
      const existingEventId = localStorage.getItem(storageKey);

      if (existingEventId) {
        // Already tracked, use existing ID (Meta will deduplicate)
        eventId = existingEventId;
        console.log("Meta Pixel: Purchase already tracked with ID:", eventId);
      } else {
        // First time, generate new unique ID
        eventId = `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(storageKey, eventId);
        console.log("Meta Pixel: New purchase event ID generated:", eventId);
      }
    } else {
      // Save ID from URL to localStorage
      localStorage.setItem(storageKey, eventId);
      console.log("Meta Pixel: Using order ID from URL:", eventId);
    }

    // Track Purchase event with unique event_id for deduplication
    window.fbq("track", "Purchase", {
      value: 39.0,
      currency: "USD",
      content_name: "Fetih Planı - AI Scale App",
      content_type: "product",
    }, {
      eventID: eventId, // Critical: This ensures deduplication
    });

    console.log("Meta Pixel: Purchase event tracked", {
      value: 39,
      currency: "USD",
      eventID: eventId,
    });
  }, [searchParams]);

  return null;
}
