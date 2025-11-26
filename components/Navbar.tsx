"use client";

import Logo from "./Logo";
import WhatsAppSupportButton from "./WhatsAppSupportButton";

export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    console.log('Element found:', element);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      console.error('Section not found:', sectionId);
    }
  };

  return (
    <nav className="fixed top-[96px] lg:top-16 left-0 right-0 z-50 bg-primary/95 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-center h-20">
          {/* Center: Logo with navigation links on sides */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Left side links */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider whitespace-nowrap"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => {
                const section = document.querySelector('section');
                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider whitespace-nowrap"
            >
              AI Scale App
            </button>
            <button
              onClick={() => scrollToSection('curriculum-section')}
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider whitespace-nowrap"
            >
              Müfredat
            </button>

            {/* Logo */}
            <div className="mx-6">
              <Logo className="w-14 h-14 md:w-16 md:h-16" />
            </div>

            {/* Right side links */}
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('tools-section');
              }}
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider whitespace-nowrap"
            >
              Araçlar
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('testimonials-section');
              }}
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider whitespace-nowrap"
            >
              Başarılar
            </button>

            {/* CTA Button - Right next to Başarılar */}
            <button
              onClick={() => scrollToSection('pricing-card')}
              className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 whitespace-nowrap"
            >
              AI App Scale Katıl →
            </button>
          </div>

          {/* Mobile: Logo only */}
          <div className="flex lg:hidden justify-center flex-1">
            <Logo className="w-14 h-14 md:w-16 md:h-16" />
          </div>

          {/* WhatsApp CTA */}
          <WhatsAppSupportButton className="absolute right-0 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </nav>
  );
}
