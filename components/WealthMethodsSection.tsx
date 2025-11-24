"use client";

import { CHECKOUT_URL } from "@/lib/constants";

export default function WealthMethodsSection() {
  const methods = [
    {
      title: "AI Automated Agency",
      description: "We teach anybody, even with limited technical knowledge, to build AI systems. Sell the system to people with online companies or start an online company run by your own AI.",
      icon: "🤖",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Crypto Investing",
      description: "Within the Cryptocurrency campus you have real time information to not only see the professor but also 112,000+ other students. This allows you to identify trends and what influences the price of coins.",
      icon: "₿",
      color: "from-orange-500/20 to-yellow-500/20"
    },
    {
      title: "Content Creation",
      description: "In the age of technology, the value of videos and landing pages surpass the worth of real estate. It's crucial to leverage digital assets and we will teach you how.",
      icon: "🎬",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Copywriting",
      description: "Words are your warriors, and every letter you write is a strategy. Master the craft of copywriting with us, and you'll learn turn ideas into profit.",
      icon: "✍️",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Fitness",
      description: "A strong body is a strong mind. The Real World Fitness campus includes personal trainers and meal plans. Health is wealth - a fit mind that never tires.",
      icon: "💪",
      color: "from-red-500/20 to-rose-500/20"
    },
    {
      title: "Business Mastery",
      description: "The Real World Business mastery and diplomacy training is about becoming a leader, scaling operations to make more money, the art of leadership and scaling.",
      icon: "👔",
      color: "from-indigo-500/20 to-blue-500/20"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-wider mb-3">THE REAL WORLD CAMPUSES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            10+ Wealth Creation Methods
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            Choose your path to financial freedom. Each campus is led by multimillionaire professors
            who will guide you step-by-step.
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {methods.map((method, index) => (
            <div key={index} className="card-trw group cursor-pointer">
              {/* Video Placeholder with Play Button */}
              <div className={`relative aspect-video bg-gradient-to-br ${method.color} rounded-xl mb-4 overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">{method.icon}</div>
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent/90 group-hover:bg-accent rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Campus Label */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-primary/80 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-accent text-xs uppercase tracking-wider font-semibold">
                      {method.title.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{method.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-white/60 text-lg mb-6">
            <span className="text-accent font-semibold">Access 12+</span> wealth creation methods
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
