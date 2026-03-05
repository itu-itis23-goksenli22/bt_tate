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

export default function CountdownTimer() {
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
      const { targetLocal, dayName: day } = getNextWebinar();
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

  return (
    <div className="text-center mb-6">
      <p className="text-gold font-semibold text-lg mb-4">
        {mounted && dayName
          ? `${dayName} 20:00'da Canlı Webinar Başlıyor...`
          : "20:00'da Canlı Webinar Başlıyor..."}
      </p>
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
