"use client";

import { CHECKOUT_URL } from "@/lib/constants";

export default function SoldOutPlansSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary via-primary-light to-primary">
      <div className="max-w-6xl mx-auto">
        {/* Join The Real World CTA */}
        <div className="text-center mb-16">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary text-lg px-12 py-4 shadow-glow-strong">
              Join The Real World →
            </button>
          </a>
        </div>

        {/* Plans Heading */}
        <div className="text-center mb-12">
          <p className="text-white/40 text-sm uppercase tracking-wider mb-3">OUR PLANS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            98% <span className="text-danger">Sold Out</span>
          </h2>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* $79 Plan - SOLD OUT */}
          <div className="relative card-trw opacity-60">
            <div className="absolute top-4 right-4">
              <span className="bg-danger px-4 py-1 rounded-full text-white text-xs font-bold uppercase">
                SOLD OUT
              </span>
            </div>
            <div className="text-center py-8">
              <div className="text-5xl font-bold text-white/30 mb-2 line-through">$79</div>
              <p className="text-white/40 text-sm uppercase tracking-wider">Temel Paket</p>
            </div>
          </div>

          {/* $129 Plan - SOLD OUT */}
          <div className="relative card-trw opacity-60">
            <div className="absolute top-4 right-4">
              <span className="bg-danger px-4 py-1 rounded-full text-white text-xs font-bold uppercase">
                SOLD OUT
              </span>
            </div>
            <div className="text-center py-8">
              <div className="text-5xl font-bold text-white/30 mb-2 line-through">$129</div>
              <p className="text-white/40 text-sm uppercase tracking-wider">Pro Paket</p>
            </div>
          </div>

          {/* CONQUER Plan - AVAILABLE with Discount */}
          <div className="relative card-trw border-accent/50 hover:border-accent transition-all">
            <div className="absolute top-4 right-4">
              <span className="bg-accent px-4 py-1 rounded-full text-white text-xs font-bold uppercase animate-pulse">
                AVAILABLE
              </span>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-danger px-4 py-1 rounded-full shadow-lg">
                <span className="text-white text-xs font-bold uppercase">%75 İNDİRİM</span>
              </div>
            </div>
            <div className="text-center py-8 pt-12">
              <h3 className="text-2xl font-bold text-accent mb-2">CONQUER PLAN</h3>
              <p className="text-white/60 text-sm mb-4 uppercase tracking-wider">Elite Access</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-2xl font-bold text-white/40 line-through">$159</span>
                <span className="text-5xl font-bold text-accent">$39</span>
              </div>
              <p className="text-white/60 text-sm mb-6">/ay</p>
              <p className="text-white/80 text-sm mb-6 px-4">Tam finansal özgürlük sistemi</p>
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block px-4">
                <button className="w-full py-4 bg-accent hover:bg-accent-light rounded-full font-bold text-white text-lg transition-all shadow-lg shadow-accent/30">
                  Hemen Başla →
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-white/60 text-lg mb-6">
            This is your way out. No degrees. No bosses. No waiting. Just results. Welcome to The Real World.
          </p>
          <p className="text-white/40 text-sm mb-8">
            The question isn't <span className="text-white">"why join?"</span> It's{" "}
            <span className="text-accent font-semibold">"how long can you afford to stay asleep?"</span>
          </p>
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary text-lg px-12 py-4 shadow-glow-strong">
              Join The Real World →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
