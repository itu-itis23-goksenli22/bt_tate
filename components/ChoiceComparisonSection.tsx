"use client";

import { CHECKOUT_URL, trackCheckout } from "@/lib/constants";

export default function ChoiceComparisonSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary to-primary-light">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
            HAREKETE GEÇ
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Seçim Sizin
          </h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left - Do Nothing */}
          <div className="relative">
            <div className="card-trw border-white/10 hover:border-white/20 transition-all text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Hiçbir Şey Yapma</h3>
              <p className="text-white/40 text-sm mb-8">Netflix İzle</p>

              <div className="text-left mb-8">
                <ul className="space-y-3">
                  <li className="flex items-start text-white/60 text-sm">
                    <svg className="w-5 h-5 text-white/40 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Bir başkası için çalış (günde 8 saat)</span>
                  </li>
                  <li className="flex items-start text-white/60 text-sm">
                    <svg className="w-5 h-5 text-white/40 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Durgun kal</span>
                  </li>
                  <li className="flex items-start text-white/60 text-sm">
                    <svg className="w-5 h-5 text-white/40 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>9-5 çalış</span>
                  </li>
                  <li className="flex items-start text-white/60 text-sm">
                    <svg className="w-5 h-5 text-white/40 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Durgun ve tatminsiz kal</span>
                  </li>
                  <li className="flex items-start text-white/60 text-sm">
                    <svg className="w-5 h-5 text-white/40 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Kaybedenlerin etrafında takıl</span>
                  </li>
                </ul>
              </div>

              <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold text-white/60 transition-all">
                Çalışan Olarak Kal
              </button>
            </div>
          </div>

          {/* Right - Take Action */}
          <div className="relative">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-accent to-accent-dark px-6 py-2 rounded-full shadow-lg shadow-accent/30">
                <span className="text-white font-bold text-sm uppercase">Akıllı Seçim</span>
              </div>
            </div>

            <div className="card-trw border-accent/50 hover:border-accent transition-all text-center pt-8">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center border-2 border-accent/50">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-accent mb-3">Harekete Geç</h3>
              <p className="text-white/60 text-sm mb-4">Bugün Kazanmaya Başla</p>

              {/* Price */}
              <div className="mb-8">
                <div className="text-5xl font-bold text-accent mb-2">$39</div>
                <p className="text-white/40 text-sm">/ay</p>
              </div>

              <div className="text-left mb-8">
                <ul className="space-y-3">
                  <li className="flex items-start text-white/70 text-sm">
                    <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Basit, adım-adım eğitimler</span>
                  </li>
                  <li className="flex items-start text-white/70 text-sm">
                    <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>12+ zenginlik yaratma yöntemi</span>
                  </li>
                  <li className="flex items-start text-white/70 text-sm">
                    <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Deneyim gerekmez</span>
                  </li>
                  <li className="flex items-start text-white/70 text-sm">
                    <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Özel öğrenme uygulaması</span>
                  </li>
                </ul>
              </div>

              <a href={CHECKOUT_URL} onClick={trackCheckout} target="_blank" rel="noopener noreferrer">
                <button className="w-full py-4 bg-accent hover:bg-accent-light rounded-full font-bold text-white text-lg transition-all shadow-lg shadow-accent/30">
                  Gerçek Dünyaya Katıl →
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
