"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setAdvancedMatching } from "@/lib/meta-pixel";

const GOLD_BG_SUBTLE = "linear-gradient(223deg, rgba(170,129,60,0.14) 0%, rgba(170,129,60,0.10) 100%)";
const CTA_GRADIENT = "linear-gradient(271.63deg, #C19D44 -20%, #E8D48B 20%, #FDF3AD 50%, #E8D48B 80%, #C19D44 120%)";

export default function TesekkurlerContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Değerli Katılımcı";
  const email = searchParams.get("email") || "";
  const [calendarUrl, setCalendarUrl] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    // /katil her gün yenilenen seminer — bir sonraki 20:00 (TR) hedefi
    // (ana funnel ile aynı "today/tomorrow 20:00" rolling mantığı).
    const turkey = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
    const eventDate = new Date(turkey);
    if (turkey.getHours() >= 20) eventDate.setDate(eventDate.getDate() + 1);
    eventDate.setHours(20, 0, 0, 0);

    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    const regDay = String(turkey.getDate()).padStart(2, "0");
    const regMonth = String(turkey.getMonth() + 1).padStart(2, "0");
    const regYear = turkey.getFullYear();
    setRegistrationDate(`${regDay}.${regMonth}.${regYear}`);

    const dateStr = `${year}${month}${day}`;
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Ucretsiz AI Webinari - Yapay Zeka ile Ilk 10,000$ Kazanin")}&dates=${dateStr}T200000/${dateStr}T210000&ctz=Europe/Istanbul&details=${encodeURIComponent("Canli AI Webinari\nKatilim linkiniz email adresinize gonderildi.")}&location=${encodeURIComponent("Zoom (Link email ile gonderildi)")}`;
    setCalendarUrl(gcalUrl);

    if (email) {
      const nameParts = name.split(" ");
      setAdvancedMatching({
        em: email,
        fn: nameParts[0] || "",
        ln: nameParts.slice(1).join(" ") || "",
      });
    }

    // Countdown timer — /katil her gün yenilenen seminer (sonraki 20:00 TR)
    const updateCountdown = () => {
      const nowMs = Date.now();
      const turkeyNow = new Date(new Date(nowMs).toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
      const target = new Date(turkeyNow);
      if (turkeyNow.getHours() >= 20) target.setDate(target.getDate() + 1);
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
        {/* 1. Sticky duyuru çubuğu — sayfa boyunca üstte sabit, sağdan sola akar */}
        <style>{`@keyframes tesekkur-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        <div className="sticky top-0 z-50 overflow-hidden border-b border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)]" style={{ background: CTA_GRADIENT }}>
          <div className="inline-flex whitespace-nowrap py-2" style={{ animation: "tesekkur-marquee 27.5s linear infinite" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="text-black font-bold text-[15px] md:text-[19px] tracking-tight inline-flex items-center justify-center min-w-[100vw] px-4">
                📅 Webinara Akşam 20:00&apos;de ZOOM üzerinden katılmayı unutmayın
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[680px] mx-auto px-4 py-8">
          {/* 2. Tebrikler */}
          <div className="text-center mb-6">
            <h1 className="text-[38px] md:text-[52px] font-extrabold italic leading-tight" style={{ color: "#C19D44" }}>
              Tebrikler!
            </h1>
            <p className="text-white text-[16px] md:text-[20px] font-semibold mt-2">
              AI Scale Semineri İçin Yeriniz Ayrıldı 🔒
            </p>
            <p className="text-[#C19D44] text-[13px] md:text-[14px] font-semibold mt-3 tracking-wide">
              ↓ Aşağıdaki adımları sırayla takip et ↓
            </p>
            {/* Gold line decoration */}
            <div className="flex justify-center mt-3">
              <svg width="200" height="12" viewBox="0 0 200 12">
                <path d="M0 6 Q50 0 100 6 Q150 12 200 6" stroke="#C19D44" strokeWidth="2" fill="none" />
                <path d="M10 8 Q55 2 105 8 Q155 14 195 8" stroke="#C19D44" strokeWidth="1.5" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Email Notification Banner — başlığa "Seminere Mutlaka Katıl"
              vurgusu eklendi. */}
          <div className="mb-6 rounded-[9px] border-2 border-[#C19D44] p-5 md:p-6 text-center"
            style={{ background: GOLD_BG_SUBTLE }}>
            <h2 className="text-[22px] md:text-[28px] font-extrabold leading-tight mb-4">
              Seminere <span className="text-[#D5B356]">Mutlaka</span> Katıl
            </h2>
            <div className="border-t border-[#C19D44]/30 my-4" />
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-6 h-6 text-[#C19D44] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#C19D44]">
                Katılım Linkiniz E-posta Adresine Gönderildi
              </h3>
            </div>
            <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
              E-posta adresine bir <strong className="text-white">Zoom katılım linki</strong> gönderdik.{" "}
              <strong className="text-white">Akşam saat 20:00{"'"}da</strong>{" "}
              e-postandaki linke tıkla, Zoom açılacak ve canlı seminere katılacaksın.
              E-postayı bulamazsan <strong className="text-white">spam/gereksiz</strong> klasörünü de kontrol et.
            </p>
            {registrationDate && (
              <p className="text-white/40 text-[12px] mt-3">
                Kayıt tarihin: {registrationDate}
              </p>
            )}
          </div>

          {/* Adım akış oku */}
          <div className="flex justify-center -mt-2 mb-2">
            <svg className="w-6 h-6 text-[#C19D44]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* ADIM 1 — Sana Özel Mesaj video (Baturalp) */}
          <div className="mb-6 rounded-[9px] border border-dashed border-[#AA813C]/50 p-5 md:p-6"
            style={{ background: GOLD_BG_SUBTLE }}>
            <p className="text-[#C19D44] text-[11px] md:text-[12px] font-extrabold tracking-[4px] uppercase mb-3 text-center">
              Adım 1
            </p>
            <p className="text-[#C19D44] text-[18px] md:text-[20px] font-extrabold mb-4 text-center">
              🎥 Seminerde Görüşürüz
            </p>
            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/qQbl1YPaI7k"
                title="Seminer Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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

          {/* ADIM 2 — Seminer Öncesi Bonus Eğitim (yeşil "Tıkla, izle" buton) */}
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
                className="relative overflow-hidden text-white font-extrabold text-[16px] md:text-[18px] px-10 py-4 rounded-lg hover:brightness-110 hover:scale-[1.02] transition-all w-full cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 animate-cta-attention"
                style={{
                  background:
                    "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
                }}
              >
                <span className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/3 z-10 animate-cta-shine" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }} />
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
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
              Akşam
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
              <button className="relative overflow-hidden bg-white text-gray-800 font-bold text-[15px] px-6 py-3.5 rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all w-full flex items-center justify-center gap-3 cursor-pointer shadow-md animate-cta-attention">
                <span className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/3 z-10 animate-cta-shine" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }} />
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

          {/* Bonus Package CTA kaldırıldı — bu sayfa artık kayıt maili ile
              herkese (VIP alsın almasın) gönderilen sade seminer hatırlatma
              sayfası. Bonus paket / upsell yok. */}

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
