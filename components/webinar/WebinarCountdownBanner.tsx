"use client";

import { useState, useEffect } from "react";

export default function WebinarCountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getNextWebinarDate = () => {
    const now = new Date();
    const turkey = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));

    // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = turkey.getDay();
    const currentHour = turkey.getHours();
    const currentMinute = turkey.getMinutes();

    let daysUntilNext = 0;

    // Check if today is Tuesday (2) or Sunday (0)
    if (currentDay === 2) { // Tuesday
      if (currentHour < 20 || (currentHour === 20 && currentMinute === 0)) {
        // Today's webinar hasn't happened yet
        daysUntilNext = 0;
      } else {
        // Today's webinar passed, next is Sunday
        daysUntilNext = 5; // Tuesday to Sunday
      }
    } else if (currentDay === 0) { // Sunday
      if (currentHour < 20 || (currentHour === 20 && currentMinute === 0)) {
        // Today's webinar hasn't happened yet
        daysUntilNext = 0;
      } else {
        // Today's webinar passed, next is Tuesday
        daysUntilNext = 2; // Sunday to Tuesday
      }
    } else {
      // Calculate days until next Tuesday or Sunday
      const daysUntilTuesday = (2 - currentDay + 7) % 7 || 7;
      const daysUntilSunday = (7 - currentDay) % 7 || 7;
      daysUntilNext = Math.min(daysUntilTuesday, daysUntilSunday);
    }

    const nextWebinar = new Date(turkey);
    nextWebinar.setDate(turkey.getDate() + daysUntilNext);
    nextWebinar.setHours(20, 0, 0, 0);

    return nextWebinar;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextWebinar = getNextWebinarDate();
      const now = new Date();
      const distance = nextWebinar.getTime() - now.getTime();

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-accent via-accent-light to-accent py-3 px-4 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          {/* Webinar Text */}
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl">🎓</span>
            <h3 className="text-lg md:text-xl font-bold text-black uppercase tracking-wider">
              ÜCRETSİZ AI WEBİNARI
            </h3>
            <span className="text-2xl md:text-3xl">🎓</span>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <div className="flex items-center gap-1 text-black font-bold text-sm md:text-base">
              <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.days).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Next session info */}
          <div className="hidden md:block bg-black text-white px-4 py-1 rounded-full font-bold text-sm uppercase">
            SALI & PAZAR 20:00
          </div>
        </div>
      </div>
    </div>
  );
}
