import type { ReactNode } from "react";

interface HeroSectionProps {
  // Variant'lar için opsiyonel override'lar. Belirtilmezse main funnel
  // metinleri kullanılır.
  eyebrow?: ReactNode;
  headline?: ReactNode;
  subheadline?: ReactNode;
  // compact: mobilde başlık/metin küçülür + boşluklar daralır → form ilk
  // ekranda görünür. Default false (/katil vb. aynen kalır).
  compact?: boolean;
}

const DEFAULT_EYEBROW = "%100 Ücretsiz Canlı Etkinlik";
const DEFAULT_HEADLINE = (
  <>
    <span className="zk-text-gold-gradient">Aylık 10.000$</span> Kazandıran{" "}
    <em className="not-italic zk-text-gold-gradient">Yapay Zeka Sistemi</em>
  </>
);
const DEFAULT_SUBHEADLINE = (
  <>
    Stok yok. Depo yok. Teknik bilgi gerekmiyor. Sadece siz, yapay zeka ve
    kanıtlanmış bir sistem.
  </>
);

export default function HeroSection({
  eyebrow,
  headline,
  subheadline,
  compact = false,
}: HeroSectionProps = {}) {
  return (
    <section className={`relative px-4 ${compact ? "pt-4 pb-1" : "pt-6 pb-2"}`}>
      {/* Trustpilot-style badge */}
      <div className={`flex items-center justify-center gap-3 ${compact ? "mb-3" : "mb-8"}`}>
        <div className="flex items-center gap-1 bg-[#00B67A] px-3 py-1 rounded">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className={`${compact ? "w-4 h-4 md:w-5 md:h-5" : "w-5 h-5"} text-white`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="text-white/80 text-xs md:text-sm font-medium">
          4.9/5 &bull; 500+ Olumlu Değerlendirme
        </span>
      </div>

      {/* Main headline */}
      <div className="max-w-4xl mx-auto text-center">
        <div className={`inline-block ${compact ? "mb-2" : "mb-4"}`}>
          <span
            className={`text-gold font-semibold tracking-wide uppercase ${
              compact ? "text-sm md:text-xl" : "text-base md:text-xl"
            }`}
          >
            {eyebrow ?? DEFAULT_EYEBROW}
          </span>
        </div>

        <h1
          className={`font-bold text-white md:text-5xl lg:text-6xl ${
            compact
              ? "text-[24px] leading-[1.2] mb-3"
              : "text-[34px] leading-[1.15] mb-6"
          }`}
        >
          {headline ?? DEFAULT_HEADLINE}
        </h1>

        <p
          className={`text-white/75 leading-relaxed max-w-2xl mx-auto mb-2 ${
            compact ? "text-[14px] md:text-lg" : "text-[17px] md:text-lg"
          }`}
        >
          {subheadline ?? DEFAULT_SUBHEADLINE}
        </p>
      </div>
    </section>
  );
}
