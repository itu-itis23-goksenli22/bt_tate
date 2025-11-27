"use client";

import { useState, useEffect } from "react";

export default function BlackFridayBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set end date to November 29, 2025 at 23:59:59 (Turkey time)
    const endDate = new Date('2025-11-29T23:59:59+03:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

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
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 py-3 px-4 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          {/* Black Friday Text */}
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl animate-bounce">🔥</span>
            <h3 className="text-lg md:text-xl font-bold text-black uppercase tracking-wider">
              BLACK FRIDAY ÖZEL İNDİRİM!
            </h3>
            <span className="text-2xl md:text-3xl animate-bounce">🔥</span>
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

          {/* Discount Text */}
          <div className="hidden md:block bg-black text-yellow-400 px-4 py-1 rounded-full font-bold text-sm uppercase animate-pulse">
            %70 İNDİRİM
          </div>
        </div>
      </div>
    </div>
  );
}
