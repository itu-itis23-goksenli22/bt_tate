import { CHECKOUT_URL } from "@/lib/constants";

export default function PriceIncreaseSection() {
  return (
    <section className="py-20 px-4 bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center border-2 border-danger/30">
            <svg className="w-10 h-10 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
          FİYATINIZI KİLİTLEYİN
        </p>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Fiyat Artışı <span className="text-danger">Yaklaşıyor</span>
        </h2>

        {/* Description */}
        <p className="text-white/70 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Gerçek Dünya'nın fiyatı artırılıyor.
        </p>

        <p className="text-white/60 text-base md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
          Binlerce öğrenci zaten AI Scale App'e katıldı ve finansal özgürlük yolunda ilerliyor.
        </p>

        {/* Lock in text */}
        <p className="text-white font-bold text-xl md:text-2xl mb-8">
          Yerinizi şimdi kilitleyin.
        </p>

        {/* CTA Button */}
        <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
          <button className="btn-primary text-lg px-12 py-5 shadow-glow-strong hover:shadow-glow-hover">
            AI Scale App'e Katıl →
          </button>
        </a>
      </div>
    </section>
  );
}
