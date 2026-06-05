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

// Format validators — Meta Advanced Matching "Invalid format / Invalid
// length" hatasını önlemek için geçersiz değerleri TAMAMEN atlıyoruz.
// Geçersiz email/phone geçmek aggregate score'u bozuyor ve Meta
// dashboard'da "%34 invalid format" uyarısı çıkarıyor.
//
// Email: RFC-uyumlu basit regex (local@domain.tld). Yüzde 90+ pratik
// vakayı yakalar, edge case'leri (IP host, +tag) zaten geçirir.
function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

// Phone: Meta E.164 ister, ülke kodu DAHİL en az 10 en fazla 15 hane.
// react-phone-number-input "+905451993112" döner → digit'e indirilince
// "905451993112" (12 hane) → valid. Çok kısa olanlar (örn. ülke kodu
// olmadan "551993112" = 9 hane) Meta için "Invalid length".
function isValidPhone(digitsOnly: string): boolean {
  return /^\d{10,15}$/.test(digitsOnly);
}

// Send user data for Advanced Matching via fbq('init')
// Calling init again with user data does NOT create duplicate events
// — it only updates the user data for subsequent events.
// GEÇERSİZ FORMAT'lı değerler atılır (Meta uyarısı: Invalid format /
// Invalid length). Bunu yapmak EMQ score'u korur.
export const setAdvancedMatching = (userData: {
  em?: string; // email
  fn?: string; // first name (lowercase)
  ln?: string; // last name (lowercase)
  ph?: string; // phone (digits only, with country code)
}) => {
  if (typeof window === "undefined" || !window.fbq) return;

  const cleanData: Record<string, string> = {};

  if (userData.em) {
    const em = userData.em.toLowerCase().trim();
    if (isValidEmail(em)) {
      cleanData.em = em;
    } else if (process.env.NODE_ENV !== "production") {
      console.warn("[advanced-matching] invalid email format, skipped:", em);
    }
  }

  if (userData.fn) cleanData.fn = userData.fn.toLowerCase().trim();
  if (userData.ln) cleanData.ln = userData.ln.toLowerCase().trim();

  if (userData.ph) {
    const ph = userData.ph.replace(/\D/g, "");
    if (isValidPhone(ph)) {
      cleanData.ph = ph;
    } else if (process.env.NODE_ENV !== "production") {
      console.warn("[advanced-matching] invalid phone length, skipped:", ph);
    }
  }

  // Re-init pixel with user data (official Meta approach for Advanced Matching)
  // Eğer hiç geçerli alan yoksa init'i yine de çağırıyoruz — boş object
  // backward-compatible, mevcut user_data clear etmez.
  window.fbq("init", getPixelId(), cleanData);
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

export const trackAddToCart = (
  data?: {
    content_name?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
  },
  eventId?: string
) => {
  trackEvent("AddToCart", data, eventId);
};

export const trackInitiateCheckout = (
  data?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
    num_items?: number;
  },
  eventId?: string
) => {
  trackEvent("InitiateCheckout", data, eventId);
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
}, eventId?: string) => {
  trackEvent("Lead", data, eventId);
};

export const trackCompleteRegistration = (data?: {
  content_name?: string;
  value?: number;
  currency?: string;
  status?: string;
}, eventId?: string) => {
  trackEvent("CompleteRegistration", data, eventId);
};
