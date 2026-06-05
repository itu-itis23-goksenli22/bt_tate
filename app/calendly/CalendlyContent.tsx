"use client";

// /calendly — Onboarding görüşmesi rezerve sayfası
//
// Bağlam: Müşteri 29.900 paketi satın aldı → bu sayfaya gelir →
// Calendly üzerinden onboarding görüşmesi (30 dk) rezerve eder.
//
// CALENDLY EMBED — react-calendly paketi (Next.js'te battle-tested)
//
// Önceki yaklaşımlar (vanilla iframe, manuel script injection,
// initInlineWidget) hep bir noktada takıldı: hydration timing,
// X-Frame-Options, AdBlocker conflict. react-calendly paketi
// (resmi olmayan ama production'da yaygın kullanılan React wrapper)
// tüm bunları handle ediyor — embed script'i doğru sırada yükler,
// React lifecycle'a uyumlu, App Router 'use client' ile sorunsuz.

import { InlineWidget } from "react-calendly";

const GOLD = "#fbbf24";
const GOLD_BG = "rgba(251, 191, 36,";

const CALENDLY_URL = "https://calendly.com/aiscale-info/new-meeting";

export default function CalendlyContent() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 16px",
      }}
    >
      {/* 1. ANA BAŞLIK */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          textAlign: "center",
          marginBottom: "20px",
          padding: "0 12px",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "10px",
            lineHeight: 1.2,
          }}
        >
          📅{" "}
          <span style={{ color: GOLD }}>Onboarding Saatini Seç</span>
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "15px",
            marginBottom: "6px",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "#fff" }}>120 günlük planlaman hazır.</strong>{" "}
          30 dakikalık onboarding görüşmesinde ekibim seni tanır, planını
          birlikte yürürlüğe sokarız.
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "12px",
          }}
        >
          Tek tıklamayla onaylanır · 30 dakika sürer
        </p>
      </div>

      {/* 2. CALENDLY EMBED — react-calendly InlineWidget
          (resmi olmayan ama production'da yaygın kullanılan paket;
          script loading + iframe inflation'ı React lifecycle ile
          doğru senkronize eder, Next.js App Router'da sorunsuz). */}
      <div
        id="calendly-section"
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "16px",
          border: `2px solid ${GOLD_BG} 0.4)`,
          background: "#ffffff",
          padding: 0,
          marginBottom: "32px",
          boxShadow: `0 8px 40px ${GOLD_BG} 0.15)`,
          overflow: "hidden",
        }}
      >
        <InlineWidget
          url={CALENDLY_URL}
          styles={{
            height: "700px",
            width: "100%",
            minWidth: "320px",
          }}
          pageSettings={{
            hideGdprBanner: true,
            hideEventTypeDetails: false,
          }}
        />
      </div>

      {/* Fallback link — script yüklenmezse kullanıcı yeni sekmede açsın */}
      <p style={{ textAlign: "center", marginTop: "-20px", marginBottom: "32px" }}>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: GOLD,
            fontSize: "12px",
            textDecoration: "underline",
          }}
        >
          Takvim yüklenmiyor mu? Yeni sekmede aç →
        </a>
      </p>

      {/* 3. ONBOARDING'DE NELER OLACAK — 4 değer maddesi */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "16px",
          border: `1px solid ${GOLD_BG} 0.2)`,
          background: "rgba(20, 20, 20, 0.6)",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          📞 Onboarding&apos;de Neler Olacak?
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            {
              icon: "🎯",
              title: "Senin için doğru yol seçimi",
              desc: "AI ajansı mı, kendi SaaS'ın mı, mevcut işine AI entegrasyonu mu? Sana en uygun rotayı birlikte belirleriz.",
            },
            {
              icon: "📊",
              title: "120 günlük uygulama planı",
              desc: "Genel teori değil — senin durumuna özel 4 aylık adım adım yol haritası.",
            },
            {
              icon: "🛠️",
              title: "Hangi araçları kullanacağın",
              desc: "Claude Code, N8N, Stripe, Vercel — senin için optimal teknoloji stack'i.",
            },
            {
              icon: "💰",
              title: "Gelir modeli ve fiyatlandırma",
              desc: "Müşterilerinden ne kadar ücret alacaksın, recurring revenue nasıl kuracaksın.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "14px",
                padding: "14px 16px",
                borderRadius: "10px",
                background: "rgba(10, 10, 10, 0.5)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  flexShrink: 0,
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "13px",
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. WhatsApp fallback — paid customer'ın sorusu için */}
      <a
        href="https://wa.me/12084509523?text=Merhaba%2C%20%C3%B6deme%20yapt%C4%B1m%20ve%20onboarding%20g%C3%B6r%C3%BC%C5%9Fmesi%20ayarlamak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          maxWidth: "720px",
          padding: "14px",
          borderRadius: "12px",
          background: "#25D366",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "14px",
          textDecoration: "none",
          marginBottom: "20px",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Soruların mı var? WhatsApp&apos;tan ekibe ulaş
      </a>

      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Bu sayfa sadece topluluk üyeleri için erişilebilir
      </p>
    </main>
  );
}
