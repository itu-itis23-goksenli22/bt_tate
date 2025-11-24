"use client";

export default function AnnouncementBanner() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
      <div className="bg-primary-light/90 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 shadow-lg">
        <p className="text-white/90 text-sm font-medium text-center">
          <span className="text-accent-light font-semibold">2.0 Rollout</span> Has Officially Started{" "}
          <span className="text-white/60">Aug 7 - Dec 28</span>
        </p>
      </div>
    </div>
  );
}
