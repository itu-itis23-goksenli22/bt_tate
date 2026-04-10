"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setAdvancedMatching } from "@/lib/meta-pixel";

const GOLD_BG_SUBTLE = "linear-gradient(223deg, rgba(170,129,60,0.14) 0%, rgba(170,129,60,0.10) 100%)";

export default function EticaretTesekkurlerContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Değerli Katılımcı";
  const email = searchParams.get("email") || "";
  const [webinarDate, setWebinarDate] = useState("");
  const [webinarDay, setWebinarDay] = useState("");
  const [webinarFull, setWebinarFull] = useState("");
  const [calendarUrl, setCalendarUrl] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const dayNames = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const now = new Date();
    const turkey = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
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

    const regDay = String(turkey.getDate()).padStart(2, "0");
    const regMonth = String(turkey.getMonth() + 1).padStart(2, "0");
    const regYear = turkey.getFullYear();
    setRegistrationDate(`${regDay}.${regMonth}.${regYear}`);

    // Google Calendar URL — e-ticaret themed
    const dateStr = `${year}${month}${day}`;
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Ucretsiz E-Ticaret Webinari - Online Gelir Elde Edin")}&dates=${dateStr}T200000/${dateStr}T210000&ctz=Europe/Istanbul&details=${encodeURIComponent("Canli E-Ticaret Webinari\nKatilim linkiniz email adresinize gonderildi.")}&location=${encodeURIComponent("Zoom (Link email ile gonderildi)")}`;
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
      const turkeyNow = new Date(new Date(nowMs).toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
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
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <main className="min-h-screen bg-[#0c0c0c] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* 1. Gold Banner */}
        <div className="bg-[#C19D44] text-center py-3 px-4">
          <p className="text-black font-semibold text-[14px] md:text-[16px]">
            📅 Webinara şu saatte katılmayı unutmayın: {webinarFull || "..."}
          </p>
        </div>

        <div className="max-w-[680px] mx-auto px-4 py-8">
          {/* 2. Tebrikler */}
          <div className="text-center mb-6">
            <h1 className="text-[38px] md:text-[52px] font-extrabold italic leading-tight" style={{ color: "#C19D44" }}>
              Tebrikler!
            </h1>
            <p className="text-white text-[16px] md:text-[20px] font-semibold mt-2">
              E-Ticaret Semineri İçin Yeriniz Ayrıldı 🔒
            </p>
            {/* Gold line decoration */}
            <div className="flex justify-center mt-3">
              <svg width="200" height="12" viewBox="0 0 200 12">
                <path d="M0 6 Q50 0 100 6 Q150 12 200 6" stroke="#C19D44" strokeWidth="2" fill="none" />
                <path d="M10 8 Q55 2 105 8 Q155 14 195 8" stroke="#C19D44" strokeWidth="1.5" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Email Notification Banner - gold bordered card */}
          <div className="mb-8 rounded-[9px] border-2 border-[#C19D44] p-5 md:p-6"
            style={{ background: GOLD_BG_SUBTLE }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-6 h-6 text-[#C19D44] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-[18px] md:text-[20px] font-bold text-[#C19D44]">
                Katılım Linkiniz E-posta Adresinize Gönderildi!
              </h2>
            </div>
            <p className="text-white/70 text-[14px] md:text-[15px] text-center leading-relaxed">
              E-posta adresinize bir <strong className="text-white">Zoom katılım linki</strong> gönderdik.{" "}
              <strong className="text-white">{webinarDate} {webinarDay} saat 20:00{"'"}da</strong>{" "}
              e-postanızdaki linke tıklayın, Zoom açılacak ve canlı seminere katılacaksınız.
              E-postayı bulamıyorsanız <strong className="text-white">spam/gereksiz</strong> klasörünü de kontrol edin.
            </p>
            {registrationDate && (
              <p className="text-white/40 text-[12px] text-center mt-3">
                Kayıt tarihiniz: {registrationDate}
              </p>
            )}
          </div>

          {/* 3. Video */}
          <div className="mb-8 rounded-[9px] border border-dashed border-[#AA813C]/50 p-2"
            style={{ background: GOLD_BG_SUBTLE }}>
            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/cIbDH0lWMc0"
                title="Webinar Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* 4. Countdown Timer */}
          <div className="text-center mb-8">
            <p className="text-white font-bold text-[16px] mb-4">Eğitim Başlamasına Kalan Süre:</p>
            <div className="flex justify-center items-center gap-3">
              <CountdownBox value={countdown.hours} label="Saat" />
              <span className="text-white/60 text-[28px] font-bold">:</span>
              <CountdownBox value={countdown.minutes} label="Dakika" />
              <span className="text-white/60 text-[28px] font-bold">:</span>
              <CountdownBox value={countdown.seconds} label="Saniye" />
            </div>
          </div>

          {/* 5. Seminer Detayları — ultra kısa */}
          <div className="rounded-[9px] p-6 md:p-8 text-center mb-8 border border-dashed border-[#AA813C]/50"
            style={{ background: GOLD_BG_SUBTLE }}>
            <p className="text-[#C19D44] font-extrabold text-[22px] md:text-[26px] mb-1">
              {webinarDate} {webinarDay && `(${webinarDay})`}
            </p>
            <p className="text-white font-bold text-[16px] md:text-[18px] mb-5">
              Saat 20:00 (Türkiye Saati)
            </p>
            <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed">
              💻 Zoom linki <strong className="text-white">e-postanızda</strong> — seminer saati geldiğinde tek tıkla katılın.
            </p>
          </div>

          {/* Google Calendar Button */}
          <div className="mb-8">
            <a href={calendarUrl || "#"} target="_blank" rel="noopener noreferrer" onClick={(e) => { if (!calendarUrl) e.preventDefault(); }}>
              <button className="bg-white text-gray-800 font-bold text-[15px] px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-all w-full flex items-center justify-center gap-3 cursor-pointer shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#4285F4" strokeWidth="2" />
                  <path d="M3 10h18" stroke="#4285F4" strokeWidth="2" />
                  <path d="M8 2v4M16 2v4" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 14h2v2H7zM11 14h2v2h-2zM15 14h2v2h-2z" fill="#4285F4" />
                </svg>
                Google Takvime Ekle
              </button>
            </a>
          </div>

          {/* Bonus Package CTA - dark bg with gold border like screenshot */}
          <div className="rounded-[9px] border border-[#AA813C]/40 p-6 md:p-8 text-center mb-8 bg-[#141414]">
            <svg className="w-12 h-12 mx-auto mb-3 text-[#C19D44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <h2 className="text-[22px] md:text-[26px] font-extrabold text-white mb-2">
              500$ Değerinde Bonus Paket
            </h2>
            <p className="text-white/40 text-[14px] mb-5">
              Yapay Zeka Başlangıç Paketinize hemen erişin
            </p>
            <a
              href="https://www.notion.so/Yapay-Zeka-H-zl-Ba-lang-Paketi-2aea3d46179c81f28341ea38e05b15f8?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#C19D44] text-black font-bold text-[16px] px-10 py-4 rounded-lg hover:brightness-110 transition-all w-full cursor-pointer">
                Bonus Paketi İndir →
              </button>
            </a>
          </div>

          {/* Social Media */}
          <div className="text-center mb-10">
            <h3 className="text-white/60 text-[14px] font-semibold mb-4">Sosyal Medyamız</h3>
            <div className="flex items-center justify-center gap-4">
              <a href="https://www.instagram.com/baturalp.tunali/" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 border border-[#AA813C]/30 flex items-center justify-center hover:bg-white/20 transition-all">
                <svg className="w-5 h-5 text-[#C19D44]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@baturalp.tunali" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 border border-[#AA813C]/30 flex items-center justify-center hover:bg-white/20 transition-all">
                <svg className="w-5 h-5 text-[#C19D44]" fill="currentColor" viewBox="0 0 24 24">
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

function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#AA813C]/40 rounded-lg px-4 py-3 min-w-[75px]">
      <div className="text-[#C19D44] text-[28px] md:text-[36px] font-extrabold leading-none">{value}</div>
      <div className="text-white/40 text-[11px] mt-1">{label}</div>
    </div>
  );
}
