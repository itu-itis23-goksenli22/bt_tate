"use client";

import Logo from "./Logo";

export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left: Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white/70 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => scrollToSection('pricing-card')}
              className="text-white/70 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Paketler
            </button>
            <button
              onClick={() => scrollToSection('curriculum-section')}
              className="text-white/70 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Müfredat
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo className="w-14 h-14 md:w-16 md:h-16" />
          </div>

          {/* Right: CTA Button */}
          <button
            onClick={() => scrollToSection('pricing-card')}
            className="hidden md:block bg-accent hover:bg-accent-light text-white px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105"
          >
            AI Scale App'e Katıl →
          </button>

          {/* Mobile: Just spacing */}
          <div className="md:hidden w-20"></div>
        </div>
      </div>
    </nav>
  );
}
