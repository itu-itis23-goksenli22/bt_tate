// Meta Pixel helper functions for tracking events

// Domain-based pixel ID
const getPixelId = () => {
  if (typeof window !== "undefined" && window.location.hostname.includes("dijitalakademi")) {
    return "1261057665474950";
  }
  return "793366716531580";
};

declare global {
  interface Window {
    fbq: any;
  }
}

// Send user data for Advanced Matching WITHOUT re-initializing pixel
// Using fbq('setUserProperties') avoids duplicate init which causes duplicate events
export const setAdvancedMatching = (userData: {
  em?: string; // email
  fn?: string; // first name (lowercase)
  ln?: string; // last name (lowercase)
  ph?: string; // phone (digits only, with country code)
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    // Clean the data
    const cleanData: Record<string, string> = {};
    if (userData.em) cleanData.em = userData.em.toLowerCase().trim();
    if (userData.fn) cleanData.fn = userData.fn.toLowerCase().trim();
    if (userData.ln) cleanData.ln = userData.ln.toLowerCase().trim();
    if (userData.ph) cleanData.ph = userData.ph.replace(/\D/g, "");

    // Set user properties without re-init (prevents duplicate PageView)
    window.fbq("setUserProperties", getPixelId(), cleanData);
  }
};

export const trackEvent = (eventName: string, data?: Record<string, any>, eventId?: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventId) {
      window.fbq("track", eventName, data, { eventID: eventId });
    } else {
      window.fbq("track", eventName, data);
    }
  }
};

export const trackCustomEvent = (
  eventName: string,
  data?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, data);
  }
};

// Standard events
export const trackPageView = () => {
  trackEvent("PageView");
};

export const trackViewContent = (data?: {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}, eventId?: string) => {
  trackEvent("ViewContent", data, eventId);
};

export const trackAddToCart = (data?: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent("AddToCart", data);
};

export const trackInitiateCheckout = (data?: {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
  num_items?: number;
}) => {
  trackEvent("InitiateCheckout", data);
};

export const trackPurchase = (data: {
  value: number;
  currency: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
}) => {
  trackEvent("Purchase", data);
};

export const trackLead = (data?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent("Lead", data);
};

export const trackCompleteRegistration = (data?: {
  content_name?: string;
  value?: number;
  currency?: string;
  status?: string;
}, eventId?: string) => {
  trackEvent("CompleteRegistration", data, eventId);
};
