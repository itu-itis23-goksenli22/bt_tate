"use client";

import { useState, useEffect } from "react";

const COUNTDOWN_MINUTES = 15;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_MINUTES * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return COUNTDOWN_MINUTES * 60;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-b border-red-500/40 py-3 px-4 overflow-hidden">
      {/* Animated red shimmer */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.5) 50%, transparent 100%)",
          animation: "shimmer 2.5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-center gap-3 md:gap-4">
        <span
          className="text-red-300 text-sm md:text-base font-bold tracking-wide uppercase"
          style={{ animation: "pulse-text 2s ease-in-out infinite" }}
        >
          SON DAKİKA TEKLİFİ
        </span>
        <div className="flex items-center gap-1">
          <div className="bg-red-500/10 border border-red-500/30 rounded-md px-2.5 py-1.5 min-w-[44px] text-center">
            <span className="text-white font-bold text-lg md:text-xl tabular-nums">
              {String(minutes).padStart(2, "0")}
            </span>
          </div>
          <span className="text-red-400 font-bold text-lg animate-pulse">:</span>
          <div className="bg-red-500/10 border border-red-500/30 rounded-md px-2.5 py-1.5 min-w-[44px] text-center">
            <span className="text-white font-bold text-lg md:text-xl tabular-nums">
              {String(seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
