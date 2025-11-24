"use client";

import { CHECKOUT_URL } from "@/lib/constants";

export default function UrgencySection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-wider mb-3">NO TIME TO WASTE</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            This Is Your <span className="text-accent">Last Chance</span>
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Running Out Of Time */}
          <div className="card-trw text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4 border border-white/10">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              You're Running<br />Out Of Time
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              The world will change forever in 2025. They are developing new ways to{" "}
              <span className="text-white">trap you.</span>
            </p>
            <p className="text-white/40 text-sm">
              What have you been doing to prepare?
            </p>
            <p className="text-white/60 text-sm mt-2">
              You must understand, it's now or never.
            </p>
          </div>

          {/* Card 2: AI Takeover */}
          <div className="card-trw text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4 border border-white/10">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Imminent AI<br />Takeover
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Imagine there was a potion that you could apply to your business.
            </p>
            <p className="text-white/40 text-sm">
              And it helped you <span className="text-white">10x output OVERNIGHT.</span>
            </p>
            <p className="text-white/60 text-sm mt-2">
              You can have a robot make money for you while you SLEEP... Yet you have chosen not to take action.
            </p>
          </div>

          {/* Card 3: Learn A Skill */}
          <div className="card-trw text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4 border border-white/10">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              You Need To<br />Learn A Skill
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Just imagine...
            </p>
            <p className="text-white/40 text-sm">
              The doors that open when you invest in yourself—higher income, greater freedom, and the ability to create the life you want.
            </p>
            <p className="text-white/60 text-sm mt-2">
              <span className="text-white">Don't wait for success to find you.</span> Take control.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
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
