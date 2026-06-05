"use client";

// /calendly — Riva Framework upsell sayfası
//
// Akış: Webinar → DIRECT BUY ($29.900) → /calendly → BOOK A CALL → Sales call → Backend upsell
//
// Kullanıcı 29.900 satın aldıktan sonra Stripe webhook return_url
// (şu an /odemeonay) yerine ileride buraya yönlendirilecek. /odemeonay
// genel teşekkür sayfası olarak duruyor, /calendly ise upsell için
// özel — birebir strateji görüşmesi randevulamasını öne çıkarıyor.
//
// TODO: Calendly oluşturulduğunda CALENDLY_URL constant güncellenecek.
// İdeal: 30 dk slot, 5+ kişi/gün limit. Calendly Dashboard → New Event
// Type → 30-min meeting → URL'i kopyala.

import Script from "next/script";

const GOLD = "#fbbf24";
const GOLD_BG = "rgba(251, 191, 36,";

// Calendly event link — AI Scale 30 dk strateji görüşmesi.
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
      {/* Üst SCARCITY banner — kıtlık baskısı, sayfanın en üstünde */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "12px",
          background: "linear-gradient(90deg, #7f1d1d, #b91c1c, #7f1d1d)",
          padding: "12px 16px",
          marginBottom: "16px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          ⚠️ DİKKAT: Strateji görüşmesi kontenjanı{" "}
          <span style={{ color: "#fde047" }}>günde 5 kişiyle</span> sınırlı.
          Boş slotlar saatler içinde doluyor.
        </p>
      </div>

      {/* Üst Tebrikler kartı */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "16px",
          border: `1px solid ${GOLD_BG} 0.25)`,
          background: "rgba(20, 20, 20, 0.8)",
          padding: "40px 28px",
          marginBottom: "24px",
        }}
      >
        {/* Success Check */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: `${GOLD_BG} 0.15)`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="36"
              height="36"
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

        <h1
          style={{
            fontSize: "30px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "10px",
            lineHeight: 1.2,
          }}
        >
          🎉 Topluluk Üyeliğin Aktif!
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: GOLD,
            textAlign: "center",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          Şimdi sıra <u>bire bir strateji görüşmesinde</u>
        </p>

        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "15px",
            textAlign: "center",
            lineHeight: 1.65,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          Topluluk eğitimleri kendi hızında ilerleyebilmen için orada — ama
          tek başına gitmek zorunda değilsin. Ekibimle{" "}
          <strong style={{ color: "#fff" }}>30 dakikalık ücretsiz</strong>{" "}
          bir görüşme ayarla, sana özel <strong style={{ color: "#fff" }}>
          90 günlük AI yol haritası
          </strong>{" "}
          çıkartalım.
        </p>
      </div>

      {/* Görüşmede Ne Olacak — değer kartı */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "16px",
          border: `1px solid ${GOLD_BG} 0.2)`,
          background: "rgba(20, 20, 20, 0.6)",
          padding: "28px 28px",
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
          📞 Görüşmede Neler Olacak?
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
              title: "Spesifik 90 günlük plan",
              desc: "Genel teori değil — senin durumuna özel 12 haftalık uygulama planı çıkartırız.",
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

      {/* Karşılaştırma kartı — "görüşme almazsan ne olur" loss aversion */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "16px",
          background: "rgba(20, 20, 20, 0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "24px 20px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "18px",
          }}
        >
          Görüşmeli vs Görüşmesiz:{" "}
          <span style={{ color: GOLD }}>Aradaki Fark</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {/* Görüşmesiz — kırmızı kötü senaryo */}
          <div
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              background: "rgba(127, 29, 29, 0.15)",
              padding: "16px",
            }}
          >
            <div
              style={{
                color: "#ef4444",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              ✗ Görüşme Almazsan
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                color: "rgba(255,255,255,0.7)",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              <li>• Eğitimleri tek başına izlersin</li>
              <li>• Nereden başlayacağını bilemezsin</li>
              <li>• İlk 90 günde momentum yakalayamazsın</li>
              <li>• Çoğu üyenin yaptığı hataları tekrar edersin</li>
              <li>• %80 ihtimalle eğitimi yarıda bırakırsın</li>
            </ul>
          </div>

          {/* Görüşmeli — yeşil iyi senaryo */}
          <div
            style={{
              borderRadius: "10px",
              border: `1px solid ${GOLD_BG} 0.4)`,
              background: `${GOLD_BG} 0.08)`,
              padding: "16px",
            }}
          >
            <div
              style={{
                color: GOLD,
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              ✓ Görüşme Alırsan
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                color: "rgba(255,255,255,0.85)",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              <li>
                <strong style={{ color: "#fff" }}>Senin için</strong> doğru
                rotayı net görürsün
              </li>
              <li>
                İlk haftada{" "}
                <strong style={{ color: "#fff" }}>uygulanabilir</strong>{" "}
                bir plana sahipsin
              </li>
              <li>
                Hangi araçları{" "}
                <strong style={{ color: "#fff" }}>hangi sırayla</strong>{" "}
                kullanacağını öğrenirsin
              </li>
              <li>
                Ekibin <strong style={{ color: "#fff" }}>seni
                tanır</strong>, soru sorduğunda hızlı destek
              </li>
              <li>
                %80 üye{" "}
                <strong style={{ color: "#fff" }}>30 günde</strong> ilk
                gelirini görür
              </li>
            </ul>
          </div>
        </div>

        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "12px",
            textAlign: "center",
            marginTop: "16px",
            fontStyle: "italic",
          }}
        >
          Sadece 30 dakika — sonrası tamamen senin elinde.
        </p>
      </div>

      {/* Güçlü CTA üst metni — Calendly'den hemen önce */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          textAlign: "center",
          marginBottom: "12px",
          padding: "0 12px",
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "4px",
          }}
        >
          ↓ Aşağıdan{" "}
          <span style={{ color: GOLD }}>Görüşme Saatini Şimdi Seç</span> ↓
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "13px",
          }}
        >
          Tek tıklamayla onaylanır · 30 dakika sürer · %100 ücretsiz
        </p>
      </div>

      {/* Calendly Embed — inline widget */}
      <div
        id="calendly-section"
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "16px",
          border: `2px solid ${GOLD_BG} 0.4)`,
          background: "rgba(20, 20, 20, 0.8)",
          padding: "24px 20px",
          marginBottom: "24px",
          boxShadow: `0 8px 40px ${GOLD_BG} 0.15)`,
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "6px",
          }}
        >
          📅 Görüşme Saatini Seç
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Kontenjan günlük 5 kişiyle sınırlı. Boş slotlar hızla doluyor.
        </p>

        {/* Calendly inline widget — beyaz arka plan üzerinde
            yükselir, kullanıcı tarih+saat seçer.
            TODO: CALENDLY_URL constant'ını gerçek link ile değiştir. */}
        <div
          className="calendly-inline-widget"
          data-url={CALENDLY_URL}
          style={{
            minWidth: "320px",
            height: "700px",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#ffffff",
          }}
        />

        {/* Fallback CTA — eğer iframe yüklenemezse veya kullanıcı
            başka sekmede açmak isterse */}
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: GOLD,
              fontSize: "13px",
              textDecoration: "underline",
            }}
          >
            Takvim yüklenmiyor mu? Yeni sekmede aç →
          </a>
        </p>
      </div>

      {/* Trust + WhatsApp footer */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(10,10,10,0.4)",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>⚡</div>
          <p
            style={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "2px",
            }}
          >
            Anında onay
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
            Takvim seçer seçmez randevun kesinleşir
          </p>
        </div>
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(10,10,10,0.4)",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>🆓</div>
          <p
            style={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "2px",
            }}
          >
            %100 ücretsiz
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
            Görüşme için ek ücret yok
          </p>
        </div>
      </div>

      {/* WhatsApp fallback */}
      <a
        href="https://wa.me/12084509523?text=Merhaba%2C%20%C3%B6deme%20yapt%C4%B1m%20ve%20strateji%20g%C3%B6r%C3%BC%C5%9Fmesi%20ayarlamak%20istiyorum."
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

      {/* Calendly loader script — sayfa açılır açılmaz iframe'i
          mount eder. .calendly-inline-widget class'lı div'leri tarar. */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
