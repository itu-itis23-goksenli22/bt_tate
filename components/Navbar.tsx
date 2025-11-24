"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import { CHECKOUT_URL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-lg shadow-lg shadow-black/50 border-b border-gold/20"
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Logo className="w-10 h-10" />
            <span className="text-white font-bold text-base tracking-tight">AI SCALE</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#ozellikler"
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider"
            >
              Özellikler
            </a>
            <a
              href="#moduller"
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider"
            >
              Modüller
            </a>
            <a
              href="#paketler"
              className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider"
            >
              Paketler
            </a>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
              <button className="btn-gold !text-xs !py-2 !px-5">
                Hemen Başla
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-black/95 backdrop-blur-lg border-t border-accent/20 px-4 py-6 space-y-4">
          <a
            href="#ozellikler"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/70 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider py-2"
          >
            Özellikler
          </a>
          <a
            href="#moduller"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/70 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider py-2"
          >
            Modüller
          </a>
          <a
            href="#paketler"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/70 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider py-2"
          >
            Paketler
          </a>
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block">
            <button className="btn-gold w-full !text-sm !py-3">
              Hemen Başla
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
