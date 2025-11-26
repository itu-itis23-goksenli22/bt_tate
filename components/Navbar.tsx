"use client";

import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center h-20">
          {/* Center: Logo */}
          <Logo className="w-16 h-16" />
        </div>
      </div>
    </nav>
  );
}
