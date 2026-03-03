"use client";

export default function GuaranteeSection() {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Guarantee badge */}
        <div className="flex-shrink-0">
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            {/* Outer gold ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-dark p-1">
              <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gold text-3xl md:text-4xl mb-1">🏅</div>
                  <p className="text-white font-bold text-xs md:text-sm leading-tight">PARA İADE</p>
                  <p className="text-gold font-bold text-lg md:text-xl">%100</p>
                  <p className="text-white font-bold text-xs md:text-sm">GARANTİ</p>
                </div>
              </div>
            </div>
            {/* Ribbon tabs */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-4 h-6 bg-gradient-to-b from-gold to-gold-dark rounded-b-sm transform -rotate-12" />
              <div className="w-4 h-6 bg-gradient-to-b from-gold to-gold-dark rounded-b-sm transform rotate-12" />
            </div>
          </div>
        </div>

        {/* Guarantee text */}
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-wide">
            365 GÜN PARA İADE GARANTİSİ İLE DESTEKLENMEKTEDİR
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            Programa katıldıktan sonra memnun kalmazsanız, kayıt tarihinden itibaren ilk 365 gün içinde
            basit iade koşullarını yerine getirmeniz halinde, <span className="text-white font-semibold">size tam bir geri ödeme sağlayacağız.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
