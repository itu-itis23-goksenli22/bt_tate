"use client";

import { useState, useEffect } from "react";

const TURKEY_DAYS = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

function getTurkeyNow(): Date {
  const now = new Date();
  const turkeyOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();
  return new Date(now.getTime() + (turkeyOffset + localOffset) * 60000);
}

function getNextWebinar(): { targetLocal: Date; dayName: string } {
  const now = new Date();
  const turkeyOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();
  const turkeyNow = getTurkeyNow();

  const target = new Date(turkeyNow);
  target.setHours(20, 0, 0, 0);

  // If it's already past 20:00 today in Turkey, target tomorrow
  if (turkeyNow.getHours() >= 20) {
    target.setDate(target.getDate() + 1);
  }

  const dayName = TURKEY_DAYS[target.getDay()];

  const targetLocal = new Date(
    target.getTime() - (turkeyOffset + localOffset) * 60000
  );
  return { targetLocal, dayName };
}

// Variant'lar için sabit hedef tarih hesabı (TR saatinde 20:00'a göre).
// /katil gibi tek seferlik etkinlikler için tarih + saat sabitlenir.
function getFixedWebinar(
  year: number,
  month: number, // 1-12
  day: number,
  hour: number = 20
): { targetLocal: Date; dayName: string } {
  const now = new Date();
  const turkeyOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();

  const targetTurkey = new Date(year, month - 1, day, hour, 0, 0, 0);
  const dayName = TURKEY_DAYS[targetTurkey.getDay()];
  const targetLocal = new Date(
    targetTurkey.getTime() - (turkeyOffset + localOffset) * 60000
  );
  return { targetLocal, dayName };
}

interface CountdownTimerProps {
  // Variant'lar için sabit hedef tarih. Belirtilmezse "next 20:00" hesabı
  // çalışır (main funnel). Format: { year, month (1-12), day }.
  // Örn: /katil için { year: 2026, month: 6, day: 6 }.
  targetDate?: { year: number; month: number; day: number };
  // Sabit tarihte gösterilecek üst metin. Belirtilmezse "{dayName} 20:00'da
  // Canlı Webinar Başlıyor..." kullanılır.
  headlineText?: string;
}

export default function CountdownTimer({
  targetDate,
  headlineText,
}: CountdownTimerProps = {}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [dayName, setDayName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function updateTimer() {
      const now = new Date().getTime();
      // targetDate verilmişse sabit tarihe say, yoksa "next 20:00"
      const { targetLocal, dayName: day } = targetDate
        ? getFixedWebinar(targetDate.year, targetDate.month, targetDate.day)
        : getNextWebinar();
      const distance = targetLocal.getTime() - now;

      setDayName(day);

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Gün" },
    { value: timeLeft.hours, label: "Saat" },
    { value: timeLeft.minutes, label: "Dakika" },
    { value: timeLeft.seconds, label: "Saniye" },
  ];

  const labels = ["Gün", "Saat", "Dakika", "Saniye"];

  // headlineText="" (boş string) verilirse başlığı gizle — variant'lar
  // başka yerde tarih gösteriyorsa duplicate olmasın diye.
  const showHeadline = headlineText !== "";
  const finalHeadline = headlineText
    ? headlineText
    : mounted && dayName
      ? `${dayName} 20:00'da Canlı Webinar Başlıyor...`
      : "20:00'da Canlı Webinar Başlıyor...";

  return (
    <div className="text-center mb-6">
      {showHeadline && (
        <p className="text-gold font-bold text-xl md:text-3xl leading-tight mb-4 px-4">
          {finalHeadline}
        </p>
      )}
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {(mounted ? units : labels.map((l) => ({ value: "--", label: l }))).map(
          (unit, i) => (
            <div key={unit.label} className="flex items-center gap-2 md:gap-3">
              <div className="zk-countdown-box px-3 py-3 md:px-5 md:py-4 text-center">
                <div className="text-2xl md:text-4xl font-bold text-white">
                  {mounted
                    ? String(unit.value).padStart(2, "0")
                    : "--"}
                </div>
                <div className="text-[10px] md:text-sm text-white/80 mt-1">
                  {unit.label}
                </div>
              </div>
              {i < 3 && (
                <span className="text-gold text-2xl md:text-4xl font-bold">
                  :
                </span>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
