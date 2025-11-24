// Meta Pixel helper functions for tracking events

declare global {
  interface Window {
    fbq: any;
  }
}

export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, data);
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
}) => {
  trackEvent("ViewContent", data);
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
}) => {
  trackEvent("CompleteRegistration", data);
};
