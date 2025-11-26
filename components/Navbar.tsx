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
        <div className="grid grid-cols-3 items-center h-20 gap-4">
          {/* Left: Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 justify-start">
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
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <Logo className="w-14 h-14 md:w-16 md:h-16" />
          </div>

          {/* Right: CTA Button */}
          <div className="hidden lg:flex items-center gap-4 justify-end">
            <button
              onClick={() => {
                const toolsSection = document.querySelector('[class*="ToolsSection"]');
                if (toolsSection) toolsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider whitespace-nowrap"
            >
              Araçlar
            </button>
            <button
              onClick={() => {
                const testimonialsSection = document.querySelector('[class*="TestimonialsSection"]');
                if (testimonialsSection) testimonialsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider whitespace-nowrap"
            >
              Başarılar
            </button>
            <button
              onClick={() => scrollToSection('pricing-card')}
              className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 whitespace-nowrap"
            >
              Katıl →
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
