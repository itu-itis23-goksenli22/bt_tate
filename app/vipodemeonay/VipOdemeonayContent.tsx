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
  const [registrationDate, setRegistrationDate] = useState("");
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
    eventDate.setHours(19, 0, 0, 0);

    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    setWebinarDate(`${day}.${month}.${year}`);
    setWebinarDay(dayNames[eventDate.getDay()]);
    setWebinarFull(`${day}.${month} ${dayNames[eventDate.getDay()]} 19:00`);

    // Kayıt tarihi (bugünün tarihi)
    const tDay = String(turkey.getDate()).padStart(2, "0");
    const tMonth = String(turkey.getMonth() + 1).padStart(2, "0");
    const tYear = turkey.getFullYear();
    setRegistrationDate(`${tDay}.${tMonth}.${tYear}`);

    const dateStr = `${year}${month}${day}`;
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("VIP Seminer - AI Scale - Yapay Zeka ile Para Kazan")}&dates=${dateStr}T200000/${dateStr}T210000&ctz=Europe/Istanbul&details=${encodeURIComponent("VIP Seminer — Canli Yapay Zeka Eğitim\nKatilim linkin email adresine gonderildi.")}&location=${encodeURIComponent("Zoom (Link email ile gonderildi)")}`;
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
      if (turkeyNow.getHours() >= 19) {
        target.setDate(target.getDate() + 1);
      }
      target.setHours(19, 0, 0, 0);

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
            🎉 VIP Üyeliğin Aktif — Seminer: Bu Akşam 19:00
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
            <p className="text-[#C19D44] text-[13px] md:text-[14px] font-semibold mt-3 tracking-wide">
              ↓ Aşağıdaki adımları sırayla takip et ↓
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

          {/* ADIM 1 — VIP Paketine Eriş (mail bilgilendirme, buton yok) */}
          <div className="rounded-[9px] border-2 border-[#C19D44] p-6 md:p-8 text-center mb-6 bg-[#141414] shadow-lg shadow-[#C19D44]/10">
            <p className="text-[#C19D44] text-[11px] md:text-[12px] font-extrabold tracking-[4px] uppercase mb-3">
              Adım 1
            </p>
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-white mb-3">
              VIP Paketine Eriş
            </h2>
            <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed max-w-md mx-auto">
              VIP paketin{" "}
              <strong className="text-white">e-posta adresine gönderildi</strong>.
            </p>
            <p className="text-white/40 text-[12px] mt-3 italic">
              Gelen kutunda göremezsen <strong>Spam / Promosyon</strong> klasörlerine de bakmayı unutma.
            </p>
          </div>

          {/* Adım akış oku */}
          <div className="flex justify-center -mt-2 mb-2">
            <svg className="w-6 h-6 text-[#C19D44]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* "Seminerde Görüşürüz" Baturalp video bölümü — Adım 1 ile Adım 2
              arasında, kişisel hoşgeldin mesajı. */}
          <div
            className="mb-6 rounded-[9px] border border-dashed border-[#AA813C]/50 p-5 md:p-6"
            style={{ background: GOLD_BG_SUBTLE }}
          >
            <p className="text-[10px] text-white/30 uppercase tracking-[3px] mb-2 text-center">
              Sana Özel Mesaj
            </p>
            <p className="text-[#C19D44] text-[18px] md:text-[20px] font-extrabold mb-4 text-center">
              🎥 Seminerde Görüşürüz
            </p>
            <div
              className="relative w-full overflow-hidden rounded-lg border border-white/10"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/qQbl1YPaI7k"
                title="Seminerde Görüşürüz — Baturalp"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Adım akış oku */}
          <div className="flex justify-center -mt-2 mb-2">
            <svg className="w-6 h-6 text-[#C19D44]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* ADIM 2 — Seminer öncesi bonus eğitim, YouTube playlist link
              (yeşil "Tıkla, izle" butonu). */}
          <div
            className="rounded-[9px] border-2 border-[#00b09b]/60 p-6 md:p-8 mb-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,176,155,0.10) 0%, rgba(150,201,61,0.06) 100%)",
            }}
          >
            <p className="text-[#96c93d] text-[11px] md:text-[12px] font-extrabold tracking-[4px] uppercase mb-3">
              Adım 2
            </p>
            <h2 className="text-white text-[22px] md:text-[26px] font-extrabold mb-3">
              Seminer Öncesi İzlemen Gereken Bonus Eğitim
            </h2>
            <p className="text-white/65 text-[14px] md:text-[15px] mb-6 leading-relaxed max-w-md mx-auto">
              Yapay zeka ile sıfırdan startup kurmanın tam video serisi.
            </p>
            <a
              href="https://youtube.com/playlist?list=PLTxbxLRP7FbhMK-Dh_uWaJrYOLnaJUzyU&si=G1fqnnetUAQGuOLR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="text-white font-extrabold text-[16px] md:text-[18px] px-10 py-4 rounded-lg hover:brightness-110 transition-all w-full cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                style={{
                  background:
                    "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Tıkla, izle
              </button>
            </a>
          </div>

          {/* Adım akış oku */}
          <div className="flex justify-center -mt-2 mb-2">
            <svg className="w-6 h-6 text-[#C19D44]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* ADIM 3 — Seminere Mutlaka Katıl + Zoom linki bilgi alt
              bloğu. İki kart birleşti: heading + altın çizgi + e-posta
              notification body. */}
          <div
            className="rounded-[9px] border-2 border-[#C19D44]/70 p-6 md:p-8 mb-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(193,157,68,0.18) 0%, rgba(193,157,68,0.06) 100%)",
            }}
          >
            <p className="text-[#C19D44] text-[11px] md:text-[12px] font-extrabold tracking-[4px] uppercase mb-3">
              Adım 3
            </p>
            <h2 className="text-[22px] md:text-[28px] font-extrabold leading-tight mb-5">
              Seminere <span className="text-[#D5B356]">Mutlaka</span> Katıl
            </h2>

            {/* Ayraç */}
            <div className="border-t border-[#C19D44]/30 my-5" />

            {/* Email notification içeriği */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg
                className="w-6 h-6 text-[#C19D44] flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#C19D44]">
                Katılım Linkiniz E-posta Adresine Gönderildi
              </h3>
            </div>
            <p className="text-white/70 text-[14px] md:text-[15px] text-center leading-relaxed">
              E-posta adresine bir{" "}
              <strong className="text-white">Zoom katılım linki</strong>{" "}
              gönderdik.{" "}
              <strong className="text-white">
                Bu Akşam saat 19:00&apos;de
              </strong>{" "}
              e-postandaki linke tıkla, Zoom açılacak ve canlı seminere
              katılacaksın. E-postayı bulamazsan{" "}
              <strong className="text-white">spam/gereksiz</strong>{" "}
              klasörünü de kontrol et.
            </p>
            {registrationDate && (
              <p className="text-white/40 text-[12px] text-center mt-3">
                Kayıt tarihin: {registrationDate}
              </p>
            )}
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
              Bu Akşam
            </p>
            <p className="text-white font-bold text-[16px] md:text-[18px] mb-5">
              Saat 19:00 (Türkiye Saati)
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
