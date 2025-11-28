"use client";

import { useState, useEffect } from "react";

export default function AnnouncementBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set Black Friday end time to 24 hours from now
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
      <div className="bg-gradient-to-r from-accent/20 via-accent/30 to-accent/20 backdrop-blur-lg border border-accent/40 rounded-full px-6 py-3 shadow-glow-strong">
        <p className="text-white text-sm font-bold text-center flex items-center gap-2">
          <span className="text-accent font-extrabold">🔥 BLACK FRIDAY</span>
          <span className="text-white/90">Bitmesine:</span>
          <span className="bg-accent/20 px-3 py-1 rounded-full font-mono">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </p>
      </div>
    </div>
  );
}
