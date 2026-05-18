// Zoom OAuth + webinar registration helpers.
// Eski /api/zoom-register/route.ts içindeki yerel fonksiyonların shared versiyonu —
// hem zoom-register hem qualify-lead endpoint'leri buradan kullanır.

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID!;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID!;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET!;
const ZOOM_WEBINAR_ID = process.env.ZOOM_WEBINAR_ID!;

export async function getZoomAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "account_credentials",
      account_id: ZOOM_ACCOUNT_ID,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoom OAuth failed: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function registerToZoomWebinar(
  accessToken: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  webinarId?: string
): Promise<{ registrant_id: string; join_url: string }> {
  const targetWebinarId = webinarId || ZOOM_WEBINAR_ID;
  const response = await fetch(
    `https://api.zoom.us/v2/webinars/${targetWebinarId}/registrants`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoom registration failed: ${error}`);
  }

  return response.json();
}
