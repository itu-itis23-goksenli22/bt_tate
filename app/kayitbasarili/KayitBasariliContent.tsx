"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { VIP_CHECKOUT_URL } from "@/lib/constants";

function getEventDateString(): string {
  const now = new Date();
  const turkeyOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();
  const turkeyNow = new Date(
    now.getTime() + (turkeyOffset + localOffset) * 60000
  );

  const target = new Date(turkeyNow);
  target.setHours(20, 0, 0, 0);

  // If past 20:00 Turkey time, show tomorrow's date
  if (turkeyNow.getHours() >= 20) {
    target.setDate(target.getDate() + 1);
  }

  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const days = [
    "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi",
  ];

  return `${days[target.getDay()]}, ${target.getDate()} ${months[target.getMonth()]} - Saat 20:00 (GMT+3)`;
}

const vipBonuses = [
  {
    name: "AI Prompt Kütüphanesi",
    value: "₺2,000",
    description:
      "Yüzlerce hazır prompt ile AI araçlarından maksimum verim alın.",
  },
  {
    name: "Hazır N8N Workflow Şablonları",
    value: "₺3,000",
    description:
      "Hemen kullanıma hazır otomasyon şablonları ile zamandan tasarruf edin.",
  },
  {
    name: "B2B Müşteri Edinme Rehberi",
    value: "₺2,500",
    description:
      "Adım adım B2B müşteri bulma ve satış stratejileri.",
  },
  {
    name: "Ömür Boyu Kayıt Erişimi",
    value: "₺2,500",
    description:
      "Tüm canlı etkinliklerin kayıtlarına sınırsız erişim.",
  },
];

const reviews = [
  {
    name: "Mehmet K.",
    role: "AI Otomasyon Uzmanı",
    text: "VIP paketi aldığım en iyi yatırımlardan biri oldu. Bonus şablonlar sayesinde ilk haftada 3 müşteri kazandım.",
    stars: 5,
  },
  {
    name: "Ayşe T.",
    role: "Dijital Girişimci",
    text: "Prompt kütüphanesi ve N8N şablonları inanılmaz değerli. Tek başıma haftalarca uğraşacağım işleri saatler içinde hallettim.",
    stars: 5,
  },
  {
    name: "Burak S.",
    role: "SaaS Kurucusu",
    text: "B2B rehberi ile ilk ayda 5 kurumsal müşteri edindim. VIP erişim kesinlikle karşılığını ödedi.",
    stars: 5,
  },
];

/* ─── Reusable sub-components ─── */

function TrustpilotBadge() {
  return (
    <div className="flex items-center justify-center gap-3">
      <svg className="h-6 w-auto" viewBox="0 0 126 31" fill="none">
        <path
          d="M33.4 12.7l-9.2-1.3-4.1-8.4-4.1 8.4-9.2 1.3 6.7 6.5-1.6 9.2 8.2-4.3 8.2 4.3-1.6-9.2 6.7-6.5z"
          fill="#00B67A"
        />
        <text x="40" y="22" fill="#fff" fontSize="14" fontWeight="700" fontFamily="system-ui">
          Trustpilot
        </text>
      </svg>
      <span className="text-gold font-bold text-sm">1,500+</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 bg-[#00B67A] flex items-center justify-center"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="#fff">
              <path d="M6 0l1.8 3.6L12 4.2 8.9 7.1l.7 4.2L6 9.3 2.4 11.3l.7-4.2L0 4.2l4.2-.6L6 0z" />
            </svg>
          </div>
        ))}
      </div>
      <span className="text-[#00B67A] font-bold text-sm">Reviews</span>
    </div>
  );
}

function CTABlock({ noThanksUrl }: { noThanksUrl?: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-4">
      <a
        href={VIP_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="zk-btn-cta bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-bold text-xl md:text-2xl px-8 py-5 rounded-lg hover:brightness-110 transition-all cursor-pointer border border-gold/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
          Şimdi VIP Üye Ol &raquo;
          <p className="text-sm font-normal mt-1 text-black/70">
            AI Shortcut&apos;a Hemen Erişin
          </p>
        </div>
      </a>
      <a
        href={noThanksUrl || "/webinarkayit"}
        className="block bg-white/10 hover:bg-white/15 transition-colors text-white/80 text-sm md:text-base py-4 px-6 rounded-lg cursor-pointer"
      >
        <p className="font-bold">Hayır, Teşekkürler.</p>
        <p className="text-white/50 text-xs mt-1">
          &ldquo;Özel VIP Deneyimi&rdquo;ni kaçıracağım
        </p>
      </a>
    </div>
  );
}

function AvatarGroup() {
  const avatarColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
  ];
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-3">
        {avatarColors.map((color, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full ${color} border-2 border-black flex items-center justify-center text-white text-xs font-bold`}
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
      <p className="ml-4 text-white/70 text-sm">
        <span className="font-bold text-white">50,000+</span> girişimci
        eğitimlerimize katıldı
      </p>
    </div>
  );
}

/* ─── Main Component ─── */

export default function KayitBasariliContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || searchParams.get("first_name") || "";
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    setDateString(getEventDateString());
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-display">
      {/* ── 1. Confirmation Banner ── */}
      <section className="pt-8 pb-6 px-4">
        <div className="max-w-3xl mx-auto border-2 border-gold/60 rounded-xl p-6 md:p-8 text-center bg-gold/5">
          <p className="text-gold font-bold text-lg md:text-xl leading-relaxed">
            Canlı Etkinliğe Kaydınız Onaylandı!{" "}
            <span className="block mt-1 text-base md:text-lg">
              {dateString || "Pazar - Saat 20:00 (GMT+3)"}
            </span>
            <span className="block mt-2 text-white/80 font-normal text-base">
              Devam etmeden önce aşağıdaki önemli daveti izleyin.
            </span>
          </p>
        </div>
      </section>

      {/* ── 2. Video Section ── */}
      <section className="pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
            Aşağıdaki Videoyu İzleyenler
            <br />
            <span className="zk-text-gold-gradient">Büyük Avantaj</span> Elde
            Ediyor...
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8">
            Özel bir{" "}
            <span className="font-bold text-gold">VIP Üye</span> olma
            davetiniz var
          </p>

          {/* YouTube Embed */}
          <div className="relative aspect-video bg-primary-light/50 rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_40px_rgba(251,191,36,0.15)]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/cIbDH0lWMc0?rel=0"
              title="VIP Davet Videosu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── 3. Warning ── */}
      <section className="pb-4 px-4 text-center">
        <p className="text-gold/90 text-sm md:text-base">
          ⚠ VIP Yerler <span className="font-bold">SINIRLI</span> - AI
          Toolkit&apos;in özel yapısı nedeniyle.
        </p>
      </section>

      {/* ── 4. Trustpilot ── */}
      <section className="pb-8 px-4">
        <TrustpilotBadge />
      </section>

      {/* ── 5. First CTA ── */}
      <section className="pb-12 px-4">
        <CTABlock />
      </section>

      {/* ── 6. 5x Value Guarantee ── */}
      <section className="pb-12 px-4">
        <div className="max-w-2xl mx-auto border border-gold/30 rounded-2xl p-8 md:p-10 text-center bg-gold/5">
          {/* Badge */}
          <div className="inline-flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-b from-gold to-gold-dark flex items-center justify-center border-4 border-gold/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              <div className="text-center">
                <span className="text-black font-bold text-2xl block leading-none">
                  5x
                </span>
                <span className="text-black text-[10px] font-bold uppercase tracking-wider">
                  Değer
                </span>
              </div>
            </div>
            <div className="mt-2 bg-danger px-4 py-1 rounded text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span>★</span> GARANTİ <span>★</span>
            </div>
          </div>

          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Etkinliğe katılın ve VIP kaynaklarını kullanın. Eğer{" "}
            <span className="font-bold text-white">
              ₺2.100&apos;ünüzün en az 5 katı değer
            </span>{" "}
            almadığınızı düşünüyorsanız,{" "}
            <a
              href="mailto:info@aiscale.app"
              className="text-gold underline hover:text-gold-light"
            >
              info@aiscale.app
            </a>{" "}
            adresine mail atın - paranızı soru sormadan iade ediyoruz.
          </p>
          <a
            href="/webinarkayit"
            className="inline-block mt-6 text-white/40 text-xs underline hover:text-white/60"
          >
            Hayır teşekkürler, ücretsiz webinar yeterli
          </a>
        </div>
      </section>

      {/* ── 7. Social Proof ── */}
      <section className="pb-8 px-4">
        <AvatarGroup />
      </section>

      {/* ── 8. Second CTA ── */}
      <section className="pb-12 px-4">
        <CTABlock />
      </section>

      {/* ── 9. VIP Value Card ── */}
      <section className="pb-12 px-4">
        <div className="max-w-2xl mx-auto bg-primary-light/80 border border-gold/20 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            VIP Üye Olarak
            <br />
            <span className="text-gold">Neler Kazanıyorsunuz</span>
          </h2>
          <div className="mt-8 space-y-6">
            {vipBonuses.map((bonus, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold">
                    {bonus.name}{" "}
                    <span className="text-gold">({bonus.value} Değer)</span>
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {bonus.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Pricing Breakdown Card ── */}
      <section className="pb-12 px-4">
        <div className="max-w-2xl mx-auto border border-gold/30 rounded-2xl p-8 md:p-10 bg-gradient-to-b from-gold/5 to-transparent">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
            <span className="text-gold">₺10,000+</span> Değer,{" "}
            <span className="text-gold">Sadece ₺2,100</span>
          </h2>
          <div className="w-16 h-0.5 bg-gold/40 mx-auto my-6" />

          <div className="space-y-3">
            {vipBonuses.map((bonus, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm md:text-base"
              >
                <span className="text-white/80">{bonus.name}</span>
                <span className="text-white/60">(Değer: {bonus.value})</span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-white/10 my-6" />

          <div className="flex items-center justify-between text-sm md:text-base mb-2">
            <span className="text-white/80">Toplam Değer:</span>
            <span className="text-white font-bold">₺10,000+</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gold font-bold text-base md:text-lg">
              Sizin Yatırımınız:
            </span>
            <span className="text-gold font-bold text-base md:text-lg">
              Sadece ₺2,100
            </span>
          </div>
        </div>
      </section>

      {/* ── 11. Third CTA ── */}
      <section className="pb-12 px-4">
        <CTABlock />
      </section>

      {/* ── 12. Reviews ── */}
      <section className="pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="zk-text-gold-gradient">
              Diğer VIP Üyeler Ne Diyor...
            </span>
          </h2>

          <div className="space-y-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-primary-lighter/80 border border-white/10 rounded-xl p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(review.stars)].map((_, j) => (
                    <span key={j} className="text-gold text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-white/80 text-sm md:text-base mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/30 border border-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {review.name}
                    </p>
                    <p className="text-white/50 text-xs">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. Trustpilot again ── */}
      <section className="pb-8 px-4">
        <TrustpilotBadge />
      </section>

      {/* ── 14. Final CTA ── */}
      <section className="pb-16 px-4">
        <CTABlock />
      </section>
    </main>
  );
}
