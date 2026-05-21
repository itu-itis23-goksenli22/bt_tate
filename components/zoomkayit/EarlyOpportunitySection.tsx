"use client";

import { useEffect, useRef } from "react";

// "For Once In Your Life You Are Early..." section (aifreelancer.ai uyarlaması).
// Beyaz arka planlı 2.500 nokta chart'ı — global AI kullanım oranını görsel-
// leştirir, koyu sayfanın ortasında dikkat çeker. Facebook 1M users (2004)
// analogisi ile super-early kavramını rasyonelleştirir.

export default function EarlyOpportunitySection() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const total = 2500;
    const greenCount = 400;  // ~16% free chatbot users
    const yellowCount = 8;   // ~0.3% paid AI
    const redCount = 1;      // ~0.04% advanced (Claude code, Cursor)
    let html = "";
    for (let i = 0; i < total; i++) {
      const fromBottom = total - 1 - i;
      let cls = "bg-[#d8d6cf]";
      if (fromBottom < redCount) cls = "bg-[#ef4444]";
      else if (fromBottom < redCount + yellowCount) cls = "bg-[#fbbf24]";
      else if (fromBottom < redCount + yellowCount + greenCount) cls = "bg-[#4ade80]";
      html += `<span class="block aspect-square ${cls}"></span>`;
    }
    chartRef.current.innerHTML = html;
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        {/* Başlık */}
        <h2 className="text-white text-[28px] md:text-[44px] font-extrabold leading-tight text-center mb-6">
          Hayatında Bir Kez Gerçekten{" "}
          <span className="text-[#ff6b1f]">Erken</span> Davranıyorsun…
        </h2>

        <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed text-center max-w-2xl mx-auto mb-12">
          Geçmişin büyük fırsatlarını kaçırdıysan (dot-com dönemi, Bitcoin,
          erken e-ticaret, erken sosyal medya gibi) — bu sefer bir sonraki
          büyük devrime{" "}
          <strong className="text-white">ilk dalan sen olacaksın</strong>.
        </p>

        {/* Chart card */}
        <div className="bg-[#f5f3ee] text-[#1a1a1a] rounded-2xl p-5 md:p-8 mb-12">
          <h3
            className="text-center text-[20px] md:text-[26px] font-bold mb-1"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Her bir nokta ≈ 3.2 milyon kişi
          </h3>
          <p className="text-center text-[12px] md:text-[14px] text-[#555] mb-5">
            2.500 nokta = 8.1 milyar insan. Renk = en ileri AI etkileşimi, Şubat 2026.
          </p>
          <div
            ref={chartRef}
            className="grid gap-[1.5px] mb-5"
            style={{ gridTemplateColumns: "repeat(50, minmax(0, 1fr))" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-[12px] md:text-[13px]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3.5 h-3.5 bg-[#d8d6cf] flex-shrink-0" />
              <span>
                AI hiç kullanmamış · <strong>~6.8B</strong> (%84)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3.5 h-3.5 bg-[#4ade80] flex-shrink-0" />
              <span>
                Ücretsiz chatbot kullanmış · <strong>~1.3B</strong> (%16)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3.5 h-3.5 bg-[#fbbf24] flex-shrink-0" />
              <span>
                Aylık $20+ ödüyor · <strong>~15-25M</strong> (%0.3)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3.5 h-3.5 bg-[#ef4444] flex-shrink-0" />
              <span>
                Claude Code / Cursor · <strong>~2-5M</strong> (%0.04)
              </span>
            </div>
          </div>
        </div>

        {/* Body paragraphs */}
        <div className="space-y-5 text-white/80 text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
          <p>
            Yukarıdaki görsel{" "}
            <strong className="text-white">
              2026 itibarıyla dünyanın AI kullanım durumunu
            </strong>{" "}
            gösteriyor.
          </p>
          <p>
            Dünyanın %16'sı ChatGPT'nin ücretsiz versiyonunu kullanmış.
          </p>
          <p>
            %0.3'ü Claude veya benzer ücretli bir AI aracı kullanmış.
          </p>
          <p>
            Ve dünyanın yalnızca <strong className="text-white">%0.04'ü</strong>{" "}
            — Claude Code, Codex veya Cursor gibi ileri seviye araçlara
            dokunmuş. Yani küresel olarak yaklaşık{" "}
            <strong className="text-gold">2.5 milyon kişi</strong>.
          </p>
          <p>
            Bu demek oluyor ki sen sadece erken değilsin —{" "}
            <strong className="text-white">ÇOK erkensin</strong>. Karşılaştırmak
            için: Facebook 2004'te yani yaklaşık <strong>yirmi yıl önce</strong>{" "}
            1 milyon kullanıcıya ulaştı.
          </p>
          <p>
            İnternetin, sosyal medyanın ve erken teknolojinin avantajını
            alanlar hayatlarını kurdu ve{" "}
            <strong className="text-white">
              dünyanın en zenginleri arasına girdi
            </strong>
            .
          </p>
          <p className="text-gold font-semibold text-center text-[16px] md:text-[18px] pt-4">
            Pazar gecesi canlı yayında, bu erken avantajı nasıl kullanacağını
            ve bir hafta içinde AI ile gelir üretmeye nasıl başlayacağını
            göstereceğiz.
          </p>
        </div>
      </div>
    </section>
  );
}
