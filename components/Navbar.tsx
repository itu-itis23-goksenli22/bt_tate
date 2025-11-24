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
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left: Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center space-x-2 text-white hover:text-accent transition-colors group"
            >
              <div className="flex flex-col space-y-1.5">
                <span className="block w-6 h-0.5 bg-white group-hover:bg-accent transition-colors"></span>
                <span className="block w-6 h-0.5 bg-white group-hover:bg-accent transition-colors"></span>
                <span className="block w-6 h-0.5 bg-white group-hover:bg-accent transition-colors"></span>
              </div>
              <span className="text-sm font-medium uppercase tracking-wider">MENU</span>
            </button>

            {/* Center: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center">
                <Logo className="w-12 h-12" />
                <span className="text-white/60 text-xs font-medium tracking-wider mt-1">THE REAL WORLD</span>
              </div>
            </div>

            {/* Right: LOG IN Button */}
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
              <button className="border border-white/20 hover:border-white/40 text-white px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all hover:bg-white/5">
                LOG IN
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Full Screen Overlay Menu */}
      <div
        className={`fixed inset-0 bg-primary/98 backdrop-blur-xl z-50 transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Logo className="w-10 h-10" />
            <div className="w-6"></div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col justify-center px-8 space-y-1">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-medium py-4 border-b border-white/5 hover:text-accent transition-colors flex items-center justify-between group"
            >
              <span>The Real World</span>
            </a>
            <a
              href="#moduller"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-medium py-4 border-b border-white/5 hover:text-accent transition-colors flex items-center justify-between group"
            >
              <span>Courses</span>
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-medium py-4 border-b border-white/5 hover:text-accent transition-colors"
            >
              Newsletter
            </a>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-medium py-4 border-b border-white/5 hover:text-accent transition-colors"
            >
              Downloads
            </a>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-medium py-4 border-b border-white/5 hover:text-accent transition-colors"
            >
              Videos
            </a>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-medium py-4 hover:text-accent transition-colors"
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
