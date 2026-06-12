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

const TURKEY_MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

function getTurkeyNow(): Date {
  const now = new Date();
  const turkeyOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();
  return new Date(now.getTime() + (turkeyOffset + localOffset) * 60000);
}

function getNextWebinar(startFloor?: {
  year: number;
  month: number; // 1-12
  day: number;
  hour?: number;
}): { targetLocal: Date; dayName: string; dateLabel: string } {
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

  // Start floor — etkinlik başlangıcından önce o tarihi göster (örn. /katil
  // 13 Haziran başlangıç). Başlangıç geçince saf rolling devam eder.
  if (startFloor) {
    const floor = new Date(
      startFloor.year,
      startFloor.month - 1,
      startFloor.day,
      startFloor.hour ?? 20,
      0,
      0,
      0
    );
    if (target.getTime() < floor.getTime()) {
      target.setTime(floor.getTime());
    }
  }

  const dayName = TURKEY_DAYS[target.getDay()];
  const dateLabel = `${target.getDate()} ${TURKEY_MONTHS[target.getMonth()]}`;

  const targetLocal = new Date(
    target.getTime() - (turkeyOffset + localOffset) * 60000
  );
  return { targetLocal, dayName, dateLabel };
}

// Variant'lar için sabit hedef tarih hesabı (TR saatinde 20:00'a göre).
// /katil gibi tek seferlik etkinlikler için tarih + saat sabitlenir.
function getFixedWebinar(
  year: number,
  month: number, // 1-12
  day: number,
  hour: number = 20
): { targetLocal: Date; dayName: string; dateLabel: string } {
  const now = new Date();
  const turkeyOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();

  const targetTurkey = new Date(year, month - 1, day, hour, 0, 0, 0);
  const dayName = TURKEY_DAYS[targetTurkey.getDay()];
  const dateLabel = `${targetTurkey.getDate()} ${TURKEY_MONTHS[targetTurkey.getMonth()]}`;
  const targetLocal = new Date(
    targetTurkey.getTime() - (turkeyOffset + localOffset) * 60000
  );
  return { targetLocal, dayName, dateLabel };
}

interface CountdownTimerProps {
  // Variant'lar için sabit hedef tarih. Belirtilmezse "next 20:00" hesabı
  // çalışır (main funnel). Format: { year, month (1-12), day }.
  targetDate?: { year: number; month: number; day: number };
  // Rolling mantığa başlangıç tabanı — bu tarihten önce hep bu tarihi gösterir,
  // sonra her gün dinamik döner. Örn: /katil için { year: 2026, month: 6, day: 13 }.
  startDate?: { year: number; month: number; day: number };
  // Sabit tarihte gösterilecek üst metin. Belirtilmezse "{dayName} 20:00'da
  // Canlı {eventNoun} Başlıyor..." kullanılır.
  headlineText?: string;
  // Başlıkta tarih de gösterilsin mi (örn. "13 Haziran Cumartesi 20:00'da...").
  showDate?: boolean;
  // Başlıktaki etkinlik kelimesi ("Webinar" | "Seminer"). Default "Webinar".
  eventNoun?: string;
}

export default function CountdownTimer({
  targetDate,
  startDate,
  headlineText,
  showDate = false,
  eventNoun = "Webinar",
}: CountdownTimerProps = {}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [dayName, setDayName] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function updateTimer() {
      const now = new Date().getTime();
      // targetDate verilmişse sabit tarihe say, yoksa "next 20:00"
      const { targetLocal, dayName: day, dateLabel: label } = targetDate
        ? getFixedWebinar(targetDate.year, targetDate.month, targetDate.day)
        : getNextWebinar(startDate);
      const distance = targetLocal.getTime() - now;

      setDayName(day);
      setDateLabel(label);

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
  // Opsiyonel tarih ön eki: "13 Haziran Cumartesi" → aksi halde sadece "Cumartesi"
  const dayPart =
    showDate && dateLabel ? `${dateLabel} ${dayName}` : dayName;
  const finalHeadline = headlineText
    ? headlineText
    : mounted && dayName
      ? `${dayPart} 20:00'da Canlı ${eventNoun} Başlıyor...`
      : `20:00'da Canlı ${eventNoun} Başlıyor...`;

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
