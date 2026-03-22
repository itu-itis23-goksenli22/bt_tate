"use client";

const GOLD = "#fbbf24";
const GOLD_DARK = "#f59e0b";
const GOLD_BG = "rgba(251, 191, 36,";

export default function OdemeonayContent() {
  // Purchase event is sent via Stripe webhook → /api/stripe-webhook → Meta CAPI
  // No browser pixel here to avoid duplicate events

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
      }}
    >
      {/* Main Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          borderRadius: "16px",
          border: `1px solid ${GOLD_BG} 0.25)`,
          background: "rgba(20, 20, 20, 0.8)",
          padding: "48px 32px",
        }}
      >
        {/* Success Check Icon */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: `${GOLD_BG} 0.15)`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke={GOLD}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          {"\uD83C\uDF89 Tebrikler De\u011Ferli \u00DCyemiz!"}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: GOLD,
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          {"Sat\u0131n Alma \u0130\u015Fleminiz Ba\u015Far\u0131yla Tamamland\u0131"}
        </p>

        {/* Welcome */}
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          {"AI Scale ailesine ho\u015F geldiniz! \uD83D\uDE80"}
        </p>

        {/* Gift Box */}
        <div
          style={{
            borderRadius: "12px",
            border: `1px solid ${GOLD_BG} 0.15)`,
            background: "rgba(10, 10, 10, 0.6)",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                background: `${GOLD_BG} 0.1)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "24px",
              }}
            >
              {"\uD83C\uDF81"}
            </div>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
                {"\u00D6zel Hediyeniz Haz\u0131r!"}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginBottom: "12px", lineHeight: 1.6 }}>
                {"Size \u00F6zel olarak haz\u0131rlad\u0131\u011F\u0131m\u0131z Yapay Zeka H\u0131zl\u0131 Ba\u015Flang\u0131\u00E7 Paketi'ni hemen indirin ve AI d\u00FCnyas\u0131na ad\u0131m at\u0131n!"}
              </p>
              <p style={{ color: GOLD, fontSize: "14px", fontWeight: 600 }}>
                {"\uD83D\uDC8E De\u011Fer: $500 - Sizin \u0130\u00E7in BEDAVA!"}
              </p>
            </div>
          </div>

          {/* CTA Button — Gold gradient */}
          <a
            href="https://www.notion.so/Yapay-Zeka-H-zl-Ba-lang-Paketi-2aea3d46179c81f28341ea38e05b15f8"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "16px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
              color: "#0a0a0a",
              fontWeight: 700,
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            {"\uD83D\uDD11 Yapay Zeka Ba\u015Flang\u0131\u00E7 Paketini Al \u2192"}
          </a>
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/12084509523?text=Merhaba%2C%20%C3%B6deme%20yapt%C4%B1m%2C%20bilgi%20almak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: "#25D366",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
            marginBottom: "32px",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {"WhatsApp'tan Hemen Ula\u015F\u0131n"}
        </a>

        {/* Info Cards Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          <div style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(10,10,10,0.4)", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${GOLD_BG} 0.1)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                {"\u23F1"}
              </div>
              <h3 style={{ fontWeight: 700, color: "#ffffff", fontSize: "15px" }}>{"Platform Eri\u015Fimi"}</h3>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.5 }}>
              {"En k\u0131sa s\u00FCrede e\u011Fitim platformuna ekleneceksiniz"}
            </p>
          </div>
          <div style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(10,10,10,0.4)", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${GOLD_BG} 0.1)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                {"\u2709\uFE0F"}
              </div>
              <h3 style={{ fontWeight: 700, color: "#ffffff", fontSize: "15px" }}>Email Bildirimi</h3>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.5 }}>
              {"Giri\u015F bilgileriniz email'inize g\u00F6nderilecek"}
            </p>
          </div>
        </div>

        {/* Contact */}
        <div style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(10,10,10,0.3)", padding: "16px", textAlign: "center", marginBottom: "24px" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
            {"Herhangi bir sorunuz mu var? "}
            <a href="mailto:info@aiscale.app" style={{ color: GOLD, textDecoration: "underline" }}>info@aiscale.app</a>
            {" adresinden bize ula\u015Fabilirsiniz."}
          </p>
        </div>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", textAlign: "center" }}>
          {"AI Scale ile ba\u015Far\u0131ya giden yolculu\u011Funuz ba\u015Flad\u0131 \uD83D\uDE80"}
        </p>
      </div>

      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", textAlign: "center", marginTop: "24px" }}>
        {"Bu sayfa sadece sat\u0131n alma i\u015Flemi sonras\u0131 eri\u015Filebilir"}
      </p>
    </main>
  );
}
