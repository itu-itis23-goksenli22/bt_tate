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
          {/* EARN Plan - SOLD OUT */}
          <div className="relative card-trw opacity-60">
            <div className="absolute top-4 right-4">
              <span className="bg-danger px-4 py-1 rounded-full text-white text-xs font-bold uppercase">
                SOLD OUT
              </span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-danger/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">EARN</h3>
                <p className="text-white/40 text-sm">Basic Plan</p>
              </div>
            </div>
            <p className="text-white/60 text-sm line-through">Start your journey</p>
          </div>

          {/* PROSPER Plan - SOLD OUT */}
          <div className="relative card-trw opacity-60">
            <div className="absolute top-4 right-4">
              <span className="bg-danger px-4 py-1 rounded-full text-white text-xs font-bold uppercase">
                SOLD OUT
              </span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-danger/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">PROSPER</h3>
                <p className="text-white/40 text-sm">Pro Plan</p>
              </div>
            </div>
            <p className="text-white/60 text-sm line-through">Advanced features</p>
          </div>

          {/* CONQUER Plan - AVAILABLE */}
          <div className="relative card-trw border-accent/50 hover:border-accent">
            <div className="absolute top-4 right-4">
              <span className="bg-accent px-4 py-1 rounded-full text-white text-xs font-bold uppercase animate-pulse">
                AVAILABLE
              </span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">CONQUER PLAN</h3>
                <p className="text-accent text-sm font-semibold">Elite Access</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">Complete wealth creation system</p>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block">
              <button className="w-full py-3 bg-accent hover:bg-accent-light rounded-full font-semibold text-white transition-all">
                Get Started →
              </button>
            </a>
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
