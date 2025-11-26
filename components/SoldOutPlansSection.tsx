"use client";

export default function SoldOutPlansSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary via-primary-light to-primary">
      <div className="max-w-6xl mx-auto">
        {/* Join The Real World CTA */}
        <div className="text-center mb-16">
          <button
            onClick={() => {
              document.getElementById('pricing-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="btn-primary text-lg px-12 py-4 shadow-glow-strong"
          >
            AI Scale App'e Katıl →
          </button>
        </div>

        {/* Plans Heading */}
        <div className="text-center mb-12">
          <p className="text-white/40 text-sm uppercase tracking-wider mb-3">PAKETLERİMİZ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            %98 <span className="text-danger">Tükendi</span>
          </h2>
        </div>

        {/* Single Plan - Centered */}
        <div className="max-w-md mx-auto mb-16">
          {/* CONQUER Plan - AVAILABLE with Discount */}
          <div className="relative card-trw border-accent/50 hover:border-accent transition-all">
            <div className="absolute top-4 right-4">
              <span className="bg-accent px-4 py-1 rounded-full text-white text-xs font-bold uppercase animate-pulse">
                MÜSAİT
              </span>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-1 rounded-full shadow-lg animate-pulse">
                <span className="text-black text-xs font-bold uppercase">🔥 BLACK FRIDAY %70 🔥</span>
              </div>
            </div>
            <div className="text-center py-8 pt-12">
              <h3 className="text-2xl font-bold text-accent mb-2">FETİH PLANI</h3>
              <p className="text-white/60 text-sm mb-4 uppercase tracking-wider">Elit Erişim - Black Friday Özel</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-2xl font-bold text-white/40 line-through">₺30,000</span>
                <span className="text-5xl font-bold text-accent">₺9,000</span>
              </div>
              <p className="text-white/80 text-sm mb-6 px-4">Tam finansal özgürlük sistemi</p>

              {/* Gift Notification Badge */}
              <div className="mb-4 px-4">
                <div className="bg-gradient-to-r from-gold via-gold-light to-gold p-0.5 rounded-lg animate-pulse">
                  <div className="bg-primary-dark rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4zm10 15H4v-2h16v2zm0-5H4V9h5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2h5v5z"/>
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-gold font-bold text-xs uppercase tracking-wide">Hediye</p>
                        <p className="text-white text-xs font-semibold">5,000$ AI Başlangıç Paketi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4">
                <button
                  onClick={() => {
                    document.getElementById('pricing-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="w-full py-4 bg-accent hover:bg-accent-light rounded-full font-bold text-white text-lg transition-all shadow-lg shadow-accent/30"
                >
                  Hemen Başla →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
