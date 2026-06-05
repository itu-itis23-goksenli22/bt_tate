// Meta Conversions API (CAPI) - Server-side event tracking
import crypto from "crypto";

// Dual pixel support: aiscaleapp.com vs dijitalakademi.live
const AISCALE_PIXEL_ID = "793366716531580";
const DIJITAL_PIXEL_ID = "1261057665474950";
const META_CAPI_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!;
const META_CAPI_ACCESS_TOKEN_DIJITAL = process.env.META_CAPI_ACCESS_TOKEN_DIJITAL || META_CAPI_ACCESS_TOKEN;
const META_API_VERSION = "v21.0";

function getPixelConfig(sourceUrl: string) {
  if (sourceUrl.includes("dijitalakademi")) {
    return { pixelId: DIJITAL_PIXEL_ID, token: META_CAPI_ACCESS_TOKEN_DIJITAL };
  }
  return { pixelId: AISCALE_PIXEL_ID, token: META_CAPI_ACCESS_TOKEN };
}

// Hash user data with SHA-256 (Meta requirement)
function hashData(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.toLowerCase().trim())
    .digest("hex");
}

// Format validators — Meta "Invalid format / Invalid length" hatasını
// önlemek için geçersiz değerler hiç hash'lenip gönderilmesin.
// Browser pixel tarafıyla (lib/meta-pixel.ts) aynı kural — tutarlı
// EMQ score için iki tarafta da aynı validation lazım.
function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.toLowerCase().trim());
}
function isValidPhone(s: string): boolean {
  return /^\d{10,15}$/.test(s.replace(/\D/g, ""));
}

interface CAPIEventParams {
  eventName: string;
  eventId?: string;
  eventTime?: number; // Unix timestamp - for sending past events
  sourceUrl: string;
  userData: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbc?: string; // Facebook click ID from _fbc cookie
    fbp?: string; // Facebook browser ID from _fbp cookie
  };
  customData?: Record<string, any>;
}

export async function sendCAPIEvent(params: CAPIEventParams) {
  const { eventName, eventId, eventTime, sourceUrl, userData, customData } = params;

  // Build user_data with hashed values
  // GEÇERSİZ format'lı em/ph atlanır — Meta dashboard'da "Invalid format
  // / Invalid length" hatası çıkarmasın diye. Browser pixel tarafıyla
  // (lib/meta-pixel.ts setAdvancedMatching) tutarlı kural.
  const user_data: Record<string, any> = {};
  if (userData.email && isValidEmail(userData.email)) {
    user_data.em = [hashData(userData.email)];
  }
  if (userData.firstName) user_data.fn = [hashData(userData.firstName)];
  if (userData.lastName) user_data.ln = [hashData(userData.lastName)];
  if (userData.phone && isValidPhone(userData.phone)) {
    user_data.ph = [hashData(userData.phone.replace(/\D/g, ""))];
  }
  if (userData.clientIpAddress) user_data.client_ip_address = userData.clientIpAddress;
  if (userData.clientUserAgent) user_data.client_user_agent = userData.clientUserAgent;
  if (userData.fbc) user_data.fbc = userData.fbc;
  if (userData.fbp) user_data.fbp = userData.fbp;

  const eventData: Record<string, any> = {
    event_name: eventName,
    event_time: eventTime || Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: sourceUrl,
    user_data,
  };

  if (eventId) eventData.event_id = eventId;
  if (customData) eventData.custom_data = customData;

  try {
    const { pixelId, token } = getPixelConfig(sourceUrl);
    const response = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [eventData],
          access_token: token,
        }),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      console.error("❌ Meta CAPI error:", JSON.stringify(result));
    } else {
      console.log("✅ Meta CAPI event sent:", eventName, result);
    }
    return result;
  } catch (error) {
    console.error("❌ Meta CAPI fetch error:", error);
    return null;
  }
}
