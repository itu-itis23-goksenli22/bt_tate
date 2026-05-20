"use client";

// VIP Ödeme Onay Sayfası
//
// $9.90 VIP upsell satın alımından sonra Stripe Checkout buraya redirect eder
// (Stripe Payment Link success_url = https://www.aiscaleapp.com/vipodemeonay).
//
// İçerik tesekkurler sayfasıyla benzer yapıda ama VIP tonlamasıyla:
//   - "Tebrikler! VIP Üye Oldun" başlığı
//   - VIP'in kazandırdığı paket listesi (Manychat + AI Shopify + AI Automation Kit + Lifetime Replay)
//   - Notion link (Yapay Zeka Başlangıç Paketi)
//   - "Seminere mutlaka katıl, ayrıcalıklısın" mesajı
//   - Countdown timer + Google Calendar
//   - Social media

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setAdvancedMatching } from "@/lib/meta-pixel";

const GOLD_BG_SUBTLE =
  "linear-gradient(223deg, rgba(170,129,60,0.14) 0%, rgba(170,129,60,0.10) 100%)";
const CTA_GRADIENT =
  "linear-gradient(271.63deg, #C19D44 -20%, #E8D48B 20%, #FDF3AD 50%, #E8D48B 80%, #C19D44 120%)";

const NOTION_URL =
  "https://www.notion.so/Yapay-Zeka-Ba-lang-Paketi-2aea3d46179c81f28341ea38e05b15f8";

export default function VipOdemeonayContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "VIP Üye";
  const email = searchParams.get("email") || "";
  const [webinarDate, setWebinarDate] = useState("");
  const [webinarDay, setWebinarDay] = useState("");
  const [webinarFull, setWebinarFull] = useState("");
  const [calendarUrl, setCalendarUrl] = useState("");
  const [countdown, setCountdown] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const dayNames = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const now = new Date();
    const turkey = new Date(
      now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
    );
    const currentHour = turkey.getHours();
    const eventDate = new Date(turkey);
    if (currentHour >= 20) {
      eventDate.setDate(eventDate.getDate() + 1);
    }
    eventDate.setHours(20, 0, 0, 0);

    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    setWebinarDate(`${day}.${month}.${year}`);
    setWebinarDay(dayNames[eventDate.getDay()]);
    setWebinarFull(`${day}.${month} ${dayNames[eventDate.getDay()]} 20:00`);

    const dateStr = `${year}${month}${day}`;
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("VIP Webinar - AI Scale - Yapay Zeka ile Para Kazan")}&dates=${dateStr}T200000/${dateStr}T210000&ctz=Europe/Istanbul&details=${encodeURIComponent("VIP Webinar — Canli AI Eğitim\nKatilim linkin email adresine gonderildi.")}&location=${encodeURIComponent("Zoom (Link email ile gonderildi)")}`;
    setCalendarUrl(gcalUrl);

    if (email) {
      const nameParts = name.split(" ");
      setAdvancedMatching({
        em: email,
        fn: nameParts[0] || "",
        ln: nameParts.slice(1).join(" ") || "",
      });
    }

    // Countdown timer
    const updateCountdown = () => {
      const nowMs = Date.now();
      const turkeyNow = new Date(
        new Date(nowMs).toLocaleString("en-US", {
          timeZone: "Europe/Istanbul",
        })
      );
      const target = new Date(turkeyNow);
      if (turkeyNow.getHours() >= 20) {
        target.setDate(target.getDate() + 1);
      }
      target.setHours(20, 0, 0, 0);

      const diff = target.getTime() - turkeyNow.getTime();
      if (diff <= 0) return;

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-[#0c0c0c] text-white"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* 1. Gold Banner */}
        <div className="bg-[#C19D44] text-center py-3 px-4">
          <p className="text-black font-semibold text-[14px] md:text-[16px]">
            🎉 VIP Üyeliğin Aktif — Webinar: {webinarFull || "..."}
          </p>
        </div>

        <div className="max-w-[680px] mx-auto px-4 py-8">
          {/* 2. Tebrikler — VIP Tonlamasında */}
          <div className="text-center mb-6">
            <p className="inline-block px-4 py-1 rounded-full text-black text-[12px] font-extrabold tracking-wider mb-3"
              style={{ background: CTA_GRADIENT }}>
              💎 VIP ÜYE
            </p>
            <h1
              className="text-[38px] md:text-[52px] font-extrabold italic leading-tight"
              style={{ color: "#C19D44" }}
            >
              Tebrikler{name && name !== "VIP Üye" ? `, ${name.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-white text-[18px] md:text-[22px] font-bold mt-2">
              VIP Üyeliğin Onaylandı 🔒
            </p>
            <p className="text-white/60 text-[14px] md:text-[15px] mt-2 max-w-md mx-auto">
              Artık <span className="text-[#D5B356] font-semibold">$2.000+ değerindeki</span> tüm VIP paketine erişimin var.
            </p>
            {/* Gold line decoration */}
            <div className="flex justify-center mt-3">
              <svg width="200" height="12" viewBox="0 0 200 12">
                <path
                  d="M0 6 Q50 0 100 6 Q150 12 200 6"
                  stroke="#C19D44"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M10 8 Q55 2 105 8 Q155 14 195 8"
                  stroke="#C19D44"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>

          {/* Sana Özel Mesaj — YouTube link bloğu (iframe yerine clickable card) */}
          <div
            className="mb-8 rounded-[9px] border border-dashed border-[#AA813C]/50 p-6 md:p-7 text-center"
            style={{ background: GOLD_BG_SUBTLE }}
          >
            <p className="text-[10px] text-white/30 uppercase tracking-[3px] mb-2">
              Sana Özel Mesaj
            </p>
            <p className="text-[#C19D44] text-[18px] md:text-[20px] font-extrabold mb-2">
              🎥 Seminerde Görüşürüz
            </p>
            <p className="text-white/60 text-[14px] md:text-[15px] mb-5 leading-relaxed max-w-md mx-auto">
              Sana özel video mesajımı aşağıdaki linkten izleyebilirsin.
            </p>
            <a
              href="https://youtu.be/cIbDH0lWMc0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="text-black font-extrabold text-[15px] md:text-[16px] px-8 py-3.5 rounded-lg hover:brightness-110 transition-all w-full cursor-pointer inline-flex items-center justify-center gap-2"
                style={{ background: CTA_GRADIENT }}
              >
                <svg
                  className="w-5 h-5"
                  fill="#FF0000"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Videoyu YouTube'da Aç →
              </button>
            </a>
          </div>

          {/* 3. PRIMARY CTA — Notion Bonus Paketi */}
          <div className="rounded-[9px] border-2 border-[#C19D44] p-6 md:p-8 text-center mb-8 bg-[#141414] shadow-lg shadow-[#C19D44]/10">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-[#C19D44]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-white mb-2">
              Yapay Zeka Başlangıç Paketin Hazır
            </h2>
            <p className="text-white/60 text-[14px] md:text-[15px] mb-5 leading-relaxed max-w-md mx-auto">
              VIP'in tüm bonus içerikleri — Manychat kurulum rehberi, AI
              Shopify rehberi, milyon dolarlık Automation Kit ve daha fazlası —
              aşağıdaki linkte seni bekliyor.
            </p>
            <a href={NOTION_URL} target="_blank" rel="noopener noreferrer">
              <button
                className="text-black font-extrabold text-[16px] md:text-[18px] px-10 py-4 rounded-lg hover:brightness-110 transition-all w-full cursor-pointer"
                style={{ background: CTA_GRADIENT }}
              >
                VIP Paketime Eriş →
              </button>
            </a>
            <p className="text-white/40 text-[12px] mt-3 italic">
              Linki kaybetme — bu sayfayı ileride tekrar açabilmen için
              e-postanı kontrol etmeyi unutma.
            </p>
          </div>

          {/* 4. VIP Avantajları Listesi */}
          <div
            className="rounded-[9px] border border-dashed border-[#AA813C]/40 p-6 md:p-8 mb-8"
            style={{ background: GOLD_BG_SUBTLE }}
          >
            <h2 className="text-[20px] md:text-[24px] font-extrabold text-center mb-1">
              VIP Üye Olarak <span className="text-[#D5B356]">Neler</span>
            </h2>
            <h2 className="text-[20px] md:text-[24px] font-extrabold text-center mb-6">
              Kazandın
            </h2>

            <div className="space-y-5">
              <BenefitItem
                title="Manychat Kurulum Rehberi"
                value="$497"
                description="Instagram & Messenger otomasyonlarını adım adım kur — müşterilerine 7/24 otomatik yanıt ver, satışlarını artır."
              />
              <BenefitItem
                title="AI Shopify Kurulum Rehberi"
                value="$597"
                description="Yapay zeka destekli araçlarla Shopify mağazanı sıfırdan kur — ürün araştırmasından tasarıma her adım detaylı."
              />
              <BenefitItem
                title="Milyon Dolarlık AI Automation Kiti"
                value="$997"
                description="Yılların deneme-yanılmasını atla. Halihazırda milyonlar kazandıran işleri inceleyerek aynı stratejileri kendine uygula."
              />
              <BenefitItem
                title="Lifetime Replay Access"
                value="$97"
                description="Etkinliğin bir dakikasını kaçırsan veya tekrar izlemek istersen — kayıtlara SONSUZA KADAR erişim hakkın var."
              />
            </div>

            <div className="border-t border-[#AA813C]/30 mt-6 pt-5">
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-[14px] font-semibold">
                  Toplam Değer:
                </span>
                <span className="text-[#D5B356] text-[18px] font-extrabold">
                  $2.188+
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-white text-[14px] font-semibold">
                  Senin Yatırımın:
                </span>
                <span className="text-white text-[14px] font-bold">
                  Sadece $9.90
                </span>
              </div>
            </div>
          </div>

          {/* 5. Seminere Mutlaka Katıl — Ayrıcalık vurgusu */}
          <div
            className="rounded-[9px] border-2 border-[#C19D44]/60 p-6 md:p-8 mb-8 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(193,157,68,0.18) 0%, rgba(193,157,68,0.06) 100%)",
            }}
          >
            <p className="text-[#C19D44] text-[12px] font-extrabold tracking-widest uppercase mb-2">
              ⚠️ Önemli — Sadece VIP Üyelere
            </p>
            <h2 className="text-[22px] md:text-[28px] font-extrabold leading-tight mb-3">
              Seminere <span className="text-[#D5B356]">Mutlaka</span> Katıl
            </h2>
            <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-lg mx-auto mb-5">
              VIP üye olarak seminerde <strong className="text-white">birebir
              soru-cevap hakkın</strong>, <strong className="text-white">özel
              bonus ipuçları</strong> ve <strong className="text-white">yalnız
              VIP'lere açılan özel oturum</strong> seni bekliyor. Bu fırsatları
              sadece canlı katılanlar yakalar.
            </p>
            <p className="text-[#C19D44] text-[14px] md:text-[15px] font-bold">
              Bu ayrıcalığı kaçırma — bedeli ödedin, değerini al.
            </p>
          </div>

          {/* 6. Countdown Timer */}
          <div className="text-center mb-8">
            <p className="text-white font-bold text-[16px] mb-4">
              Eğitim Başlamasına Kalan Süre:
            </p>
            <div className="flex justify-center items-center gap-3">
              <CountdownBox value={countdown.hours} label="Saat" />
              <span className="text-white/60 text-[28px] font-bold">:</span>
              <CountdownBox value={countdown.minutes} label="Dakika" />
              <span className="text-white/60 text-[28px] font-bold">:</span>
              <CountdownBox value={countdown.seconds} label="Saniye" />
            </div>
          </div>

          {/* 7. Seminer Detayları */}
          <div
            className="rounded-[9px] p-6 md:p-8 text-center mb-8 border border-dashed border-[#AA813C]/50"
            style={{ background: GOLD_BG_SUBTLE }}
          >
            <p className="text-[#C19D44] font-extrabold text-[22px] md:text-[26px] mb-1">
              {webinarDate} {webinarDay && `(${webinarDay})`}
            </p>
            <p className="text-white font-bold text-[16px] md:text-[18px] mb-5">
              Saat 20:00 (Türkiye Saati)
            </p>
            <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed">
              💻 Zoom linki{" "}
              <strong className="text-white">e-postanda</strong> — seminer
              saati geldiğinde tek tıkla katıl.
            </p>
          </div>

          {/* 8. Google Calendar Button */}
          <div className="mb-8">
            <a
              href={calendarUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!calendarUrl) e.preventDefault();
              }}
            >
              <button className="bg-white text-gray-800 font-bold text-[15px] px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-all w-full flex items-center justify-center gap-3 cursor-pointer shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="#4285F4"
                    strokeWidth="2"
                  />
                  <path d="M3 10h18" stroke="#4285F4" strokeWidth="2" />
                  <path
                    d="M8 2v4M16 2v4"
                    stroke="#4285F4"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 14h2v2H7zM11 14h2v2h-2zM15 14h2v2h-2z"
                    fill="#4285F4"
                  />
                </svg>
                Google Takvime Ekle
              </button>
            </a>
          </div>

          {/* 9. Social Media */}
          <div className="text-center mb-10">
            <h3 className="text-white/60 text-[14px] font-semibold mb-4">
              Sosyal Medyamız
            </h3>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/baturalp.tunali/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 border border-[#AA813C]/30 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <svg
                  className="w-5 h-5 text-[#C19D44]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@baturalp.tunali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 border border-[#AA813C]/30 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <svg
                  className="w-5 h-5 text-[#C19D44]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function BenefitItem({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C19D44]/25 border border-[#C19D44]/50 flex items-center justify-center mt-0.5">
        <svg
          className="w-4 h-4 text-[#C19D44]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="text-[14px] md:text-[15px] font-bold text-white">
            {title}
          </h3>
          <span className="text-[#D5B356] text-[12px] md:text-[13px] font-semibold whitespace-nowrap">
            {value}
          </span>
        </div>
        <p className="text-white/50 text-[12px] md:text-[13px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#AA813C]/40 rounded-lg px-4 py-3 min-w-[75px]">
      <div className="text-[#C19D44] text-[28px] md:text-[36px] font-extrabold leading-none">
        {value}
      </div>
      <div className="text-white/40 text-[11px] mt-1">{label}</div>
    </div>
  );
}
