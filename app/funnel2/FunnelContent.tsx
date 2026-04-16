"use client";

import Image from "next/image";
import Script from "next/script";

/* ────────────────────────────────────────────────────────────── DATA ── */

type Benefit = { num: string; title: string; desc: string };

const BENEFITS: Benefit[] = [
  {
    num: "01",
    title: "DM Reklamlarıyla Kaliteli Lead'ler Yakalayın",
    desc: "Instagram DM reklamlarını sıfırdan kurarak hedef kitlenizden günlük tutarlı başvurular almanın formülünü öğrenin — hiçbir teknik bilgiye gerek olmadan.",
  },
  {
    num: "02",
    title: "Funnel Mimarisini Sıfırdan Kurun",
    desc: "Reklamdan → DM'e → Strateji görüşmesine → Müşteriye dönüştüren 4 adımlı sistemi adım adım kurmayı öğrenin.",
  },
  {
    num: "03",
    title: "İçerik Stratejisi ile Otorite Olun",
    desc: "Instagram'da koç ve danışman olarak konumlanmanızı sağlayan reels, story ve post formatlarını ve Türkiye'de işe yarayan örnekleri inceleyin.",
  },
  {
    num: "04",
    title: "Manychat ile DM Otomasyonunu Devreye Alın",
    desc: "DM otomasyonu kurarak gece-gündüz lead toplamayı, otomatik kalifiye etmeyi ve Calendly randevularını sağlamayı öğrenin.",
  },
  {
    num: "05",
    title: "Premium Fiyatlandırma & Yüksek Bilet Satışı",
    desc: "1.000$+ paketlerinizi DM görüşmelerinde nasıl konumlayacağınızı, fiyat itirazlarını nasıl aşacağınızı ve closing'i nasıl yapacağınızı öğrenin.",
  },
  {
    num: "06",
    title: "İlk 100.000 TL Yol Haritanızı Alın",
    desc: "ARTIK: Adım adım takip edebileceğiniz net bir 90 günlük plana sahip olun — ve onu nasıl 500.000 TL'ye ölçekleyeceğinizi görün.",
  },
];

type Quote = { name: string; role: string; text: string };

const QUOTES: Quote[] = [
  {
    name: "Elif K.",
    role: "Yaşam Koçu",
    text: "İlk reklamım daha ilk haftada işe yaradı ve hâlâ çalışmaya devam ediyor.",
  },
  {
    name: "Burak D.",
    role: "Airbnb Danışmanı",
    text: "Funnel'i kurmadan önce tutarlı müşteri kazanma stratejim yoktu. Şimdi bir sistemim var.",
  },
  {
    name: "Mert A.",
    role: "Mindset Koçu",
    text: "Sonunda referanslara bağlı kalmadan, tahmin edilebilir şekilde müşteri kazanmanın yolunu buldum.",
  },
];

/* Grain texture data URL — generated SVG noise overlay */
const GRAIN_BG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")";

/* Color tokens (kept inline for clarity)
   Cream    #EFE7D2     surface
   Cream-2  #E5DCBC     deeper surface
   Olive    #1A2A1F     primary text
   Sienna   #C84B27     accent (CTA, highlights)
   Brown    #5C4F38     muted label
   Sage     #7B8B6F     tertiary accent (rarely used)
*/

/* ────────────────────────────────────────────────────────────── PAGE ── */

export default function FunnelContent() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,500;1,9..144,600&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div className="relative bg-[#EFE7D2] text-[#1A2A1F] min-h-screen overflow-hidden">
        {/* Persistent grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.18] mix-blend-multiply"
          style={{ backgroundImage: GRAIN_BG, backgroundSize: "200px 200px" }}
        />

        <main
          className="relative z-10"
          style={{ fontFamily: "'Geist', system-ui, sans-serif" }}
        >
          {/* ─────────────────────────────────────────── TOP BAR */}
          <header className="border-b border-[#1A2A1F]/15 bg-[#EFE7D2]/80 backdrop-blur-sm sticky top-0 z-40">
            <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-4 md:py-5 flex items-center justify-between">
              <a
                href="/funnel2"
                className="text-[22px] md:text-[26px] tracking-[-0.02em] leading-none"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'opsz' 144",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                Funnel<span className="text-[#C84B27]">.</span>
              </a>

              <nav className="flex items-center gap-6 md:gap-8">
                <span
                  className="hidden md:inline text-[10px] tracking-[0.25em] uppercase text-[#5C4F38]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Bölüm 01 — 04
                </span>
                <a
                  href="#apply"
                  className="group flex items-center gap-2 text-[12px] md:text-[13px] tracking-[0.15em] uppercase font-medium border-b border-[#1A2A1F] pb-0.5 hover:text-[#C84B27] hover:border-[#C84B27] transition-colors"
                >
                  Başvur
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </nav>
            </div>
          </header>

          {/* ─────────────────────────────────────────── HERO */}
          <section className="px-5 md:px-10 pt-14 md:pt-24 pb-20 md:pb-32 max-w-[1280px] mx-auto">
            {/* Section meta row */}
            <div className="flex items-baseline justify-between mb-10 md:mb-16">
              <span
                className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#5C4F38]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                No. 01 / Vizyon
              </span>
              <span
                className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#5C4F38]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                İST. — 2026
              </span>
            </div>

            {/* Audience pill — bracket-style instead of solid pill */}
            <div className="flex items-center gap-3 mb-10 md:mb-14">
              <span className="block w-8 md:w-12 h-px bg-[#1A2A1F]/40" />
              <span
                className="text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-[#1A2A1F]"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                }}
              >
                Aylık 50.000 – 300.000 TL Kazanan Online Koçlar İçin
              </span>
              <span className="hidden md:block flex-1 h-px bg-[#1A2A1F]/40" />
            </div>

            {/* Mega headline — Fraunces, mixed weights & italic */}
            <h1
              className="text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-[-0.035em] mb-12 md:mb-16 max-w-[1080px]"
              style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'opsz' 144",
                fontWeight: 400,
              }}
            >
              Bize <span className="font-medium">7 Gün</span> Verin —
              <br />
              <span
                className="italic text-[#C84B27]"
                style={{ fontVariationSettings: "'opsz' 144", fontWeight: 400 }}
              >
                Aylık 100.000 TL
              </span>{" "}
              Müşteri Getiren
              <br />
              <span className="font-medium">Funnel Sistemini</span> Koçluk
              İşinize Kuralım.
            </h1>

            {/* Body sub-line + meta column on the right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-14 md:mb-20">
              <div className="md:col-span-7 lg:col-span-6">
                <p className="text-[16px] md:text-[19px] leading-[1.55] text-[#1A2A1F]/75 max-w-[560px]">
                  Türkiye&apos;de{" "}
                  <span className="text-[#1A2A1F] font-medium underline decoration-[#C84B27] decoration-2 underline-offset-4">
                    100&apos;den fazla koç
                  </span>{" "}
                  aylık 100.000 TL&apos;ye ölçeklenmek için bu sistemin aynısını
                  kullandı. Şimdi senin işin için kuruyoruz.
                </p>
              </div>

              <div className="md:col-span-5 lg:col-span-4 lg:col-start-9 flex md:justify-end">
                <div className="flex items-center gap-3 text-[#5C4F38]">
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    İlk Adım
                  </div>
                  <span className="block w-6 h-px bg-[#5C4F38]/50" />
                  <a
                    href="#apply"
                    className="text-[13px] tracking-[0.05em] text-[#1A2A1F] hover:text-[#C84B27] transition-colors group"
                  >
                    Aşağıdaki videoyu izle{" "}
                    <span className="inline-block transition-transform group-hover:translate-y-1">
                      ↓
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Video — editorial frame with corner brackets */}
            <div className="relative">
              {/* Corner brackets */}
              <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#1A2A1F]" />
              <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#1A2A1F]" />
              <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#1A2A1F]" />
              <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#1A2A1F]" />

              <div className="relative aspect-video bg-[#1A2A1F] overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/cIbDH0lWMc0"
                  title="Funnel — Tanıtım Videosu"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Caption row below video */}
              <div className="mt-3 md:mt-4 flex items-baseline justify-between text-[#5C4F38]">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Vid. 01 / Sistem Tanıtımı
                </span>
                <span
                  className="text-[10px] tracking-[0.25em] uppercase italic"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Ses açmayı unutma —
                </span>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────── APPLY */}
          <section
            id="apply"
            className="border-t border-[#1A2A1F]/15 bg-[#E5DCBC]/40"
          >
            <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-14">
                <div className="md:col-span-6">
                  <span
                    className="block text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#5C4F38] mb-4"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    No. 02 / Uygunluk
                  </span>
                  <h2
                    className="text-[36px] md:text-[56px] lg:text-[68px] leading-[0.95] tracking-[-0.03em]"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontVariationSettings: "'opsz' 144",
                      fontWeight: 400,
                    }}
                  >
                    Programa{" "}
                    <span className="italic font-normal text-[#C84B27]">
                      uygun
                    </span>{" "}
                    musun?
                  </h2>
                </div>

                <div className="md:col-span-5 md:col-start-8 flex items-end">
                  <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#1A2A1F]/75 max-w-[460px]">
                    12 kısa soruyu cevapla, takvimden uygun olduğun saati seç.
                    Seninle <span className="italic">1-on-1 stratejik
                    görüşme</span> yapalım — tamamen ücretsiz.
                  </p>
                </div>
              </div>

              {/* Typeform card with editorial frame */}
              <div className="relative max-w-[840px] mx-auto">
                {/* Top label tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C84B27] text-[#EFE7D2] px-4 py-1.5">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Form / 12 Soru
                  </span>
                </div>

                <div className="bg-[#EFE7D2] border border-[#1A2A1F]/30 p-3 md:p-5">
                  {/* Typeform live target — kullanıcı ID'yi REPLACE_WITH_TYPEFORM_ID
                      yerine yapıştırınca aktif olur. Aşağıdaki placeholder
                      sonra silinmeli. */}
                  <div
                    data-tf-live="REPLACE_WITH_TYPEFORM_ID"
                    className="w-full"
                    style={{ minHeight: 600 }}
                  />

                  {/* Geçici placeholder */}
                  <div
                    className="bg-[#EFE7D2] border border-dashed border-[#1A2A1F]/30 px-6 py-20 md:py-28 text-center"
                    style={{ minHeight: 500 }}
                  >
                    <div className="inline-block mb-6">
                      <span
                        className="block text-[10px] tracking-[0.3em] uppercase text-[#5C4F38] mb-1"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        — Yakında —
                      </span>
                      <span
                        className="text-[28px] md:text-[40px] italic"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontWeight: 400,
                        }}
                      >
                        Form Hazırlanıyor
                      </span>
                    </div>
                    <p className="text-[14px] md:text-[15px] text-[#1A2A1F]/65 max-w-md mx-auto">
                      12 soruluk başvuru formu yakında bu alanda olacak.
                      Bu süreçte e-posta adresinden takvim daveti
                      gönderiyoruz.
                    </p>
                  </div>
                </div>

                {/* Bottom mono caption */}
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase text-[#5C4F38]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Şifrelenmiş — Yalnızca biz okuyoruz
                  </span>
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase text-[#5C4F38]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ≈ 3 dk
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────── DISCOVER / 7-DAY PROGRAM */}
          <section className="border-t border-[#1A2A1F]/15">
            <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-32">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-14 md:mb-24">
                <div className="md:col-span-7">
                  <span
                    className="block text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#5C4F38] mb-4"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    No. 03 / Program — 7 Gün
                  </span>
                  <h2
                    className="text-[40px] sm:text-[56px] md:text-[80px] lg:text-[96px] leading-[0.92] tracking-[-0.035em]"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontVariationSettings: "'opsz' 144",
                      fontWeight: 400,
                    }}
                  >
                    Bu 7 günde
                    <br />
                    <span className="italic font-normal text-[#C84B27]">
                      keşfedeceklerin
                    </span>
                    .
                  </h2>
                </div>
                <div className="md:col-span-4 md:col-start-9 flex md:items-end">
                  <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#1A2A1F]/75">
                    Her bir madde, programın bir gününe denk geliyor. Sonunda
                    tek başına yürütebileceğin tutarlı bir Instagram funnel
                    sistemine sahip oluyorsun.
                  </p>
                </div>
              </div>

              {/* Two-column: benefits list (8 cols) + instructor card (4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Benefits */}
                <ol className="lg:col-span-8 space-y-8 md:space-y-10">
                  {BENEFITS.map((b) => (
                    <li
                      key={b.num}
                      className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 pb-8 md:pb-10 border-b border-[#1A2A1F]/15 last:border-0 last:pb-0"
                    >
                      <span
                        className="text-[44px] md:text-[60px] leading-none text-[#C84B27] tracking-[-0.04em] tabular-nums"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontVariationSettings: "'opsz' 144",
                          fontWeight: 300,
                          fontStyle: "italic",
                        }}
                      >
                        {b.num}
                      </span>
                      <div>
                        <h3
                          className="text-[22px] md:text-[28px] leading-[1.15] tracking-[-0.015em] mb-3 md:mb-4"
                          style={{
                            fontFamily: "'Fraunces', serif",
                            fontVariationSettings: "'opsz' 144",
                            fontWeight: 500,
                          }}
                        >
                          {b.title}
                        </h3>
                        <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#1A2A1F]/75 max-w-[640px]">
                          {b.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Instructor card — sticky on desktop */}
                <aside className="lg:col-span-4 lg:sticky lg:top-28">
                  <div className="relative">
                    {/* Photo */}
                    <div className="relative aspect-[4/5] bg-[#1A2A1F] overflow-hidden border border-[#1A2A1F]">
                      <Image
                        src="/images/instructor.jpg"
                        alt="Baturalp Tunalı"
                        fill
                        sizes="(min-width: 1024px) 380px, 90vw"
                        className="object-cover"
                      />
                      {/* corner brackets */}
                      <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#EFE7D2]" />
                      <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#EFE7D2]" />
                      <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#EFE7D2]" />
                      <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#EFE7D2]" />
                    </div>

                    {/* Caption block */}
                    <div className="mt-4">
                      <span
                        className="block text-[10px] tracking-[0.3em] uppercase text-[#5C4F38] mb-2"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Eğitmen — Foto. 01
                      </span>
                      <h3
                        className="text-[28px] md:text-[34px] leading-none italic"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontVariationSettings: "'opsz' 144",
                          fontWeight: 400,
                        }}
                      >
                        Baturalp Tunalı
                      </h3>
                      <p
                        className="mt-2 text-[13px] md:text-[14px] tracking-[0.05em] text-[#1A2A1F]/75"
                        style={{ fontFamily: "'Geist', sans-serif" }}
                      >
                        InstaFunnel Eğitmeni{" "}
                        <span className="text-[#C84B27]">·</span> Kurucu
                      </p>
                      <div className="mt-3 h-px bg-[#1A2A1F]/20" />
                      <p className="mt-3 text-[12px] md:text-[13px] leading-[1.55] text-[#1A2A1F]/65 italic">
                        &ldquo;Bu sistem, beni de dahil olmak üzere 100&apos;den
                        fazla koçun aylık 6 haneli rakamlara ulaşmasını
                        sağladı.&rdquo;
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────── QUOTES */}
          <section className="border-t border-[#1A2A1F]/15 bg-[#E5DCBC]/40">
            <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28">
              <div className="flex items-baseline justify-between mb-12 md:mb-16">
                <span
                  className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#5C4F38]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  No. 04 / Sözler
                </span>
                <span
                  className="hidden md:inline text-[10px] tracking-[0.3em] uppercase text-[#5C4F38]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Müşterilerden — 2025/2026
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {QUOTES.map((q, i) => (
                  <figure
                    key={q.name}
                    className={`relative bg-[#EFE7D2] border border-[#1A2A1F]/20 p-7 md:p-9 ${
                      i === 1 ? "md:translate-y-6 lg:translate-y-10" : ""
                    }`}
                  >
                    {/* Big serif quote glyph */}
                    <span
                      aria-hidden
                      className="absolute -top-5 left-6 text-[80px] md:text-[110px] leading-none text-[#C84B27]"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'opsz' 144",
                        fontWeight: 400,
                      }}
                    >
                      &ldquo;
                    </span>

                    <blockquote
                      className="pt-6 text-[18px] md:text-[22px] leading-[1.35] tracking-[-0.005em]"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'opsz' 144",
                        fontWeight: 400,
                        fontStyle: "italic",
                      }}
                    >
                      {q.text}
                    </blockquote>

                    <figcaption className="mt-6 pt-5 border-t border-[#1A2A1F]/15 flex items-baseline justify-between">
                      <span
                        className="text-[15px] font-medium tracking-tight"
                        style={{ fontFamily: "'Geist', sans-serif" }}
                      >
                        {q.name}
                      </span>
                      <span
                        className="text-[10px] tracking-[0.25em] uppercase text-[#5C4F38]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {q.role}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────── CTA REMINDER */}
          <section className="border-t border-[#1A2A1F]/15 bg-[#1A2A1F] text-[#EFE7D2] relative overflow-hidden">
            {/* Marquee word backdrop — decorative, very low opacity */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "min(28vw, 320px)",
                lineHeight: 1,
                color: "#EFE7D2",
                opacity: 0.04,
                whiteSpace: "nowrap",
                letterSpacing: "-0.04em",
              }}
            >
              başvur · başvur · başvur ·
            </div>

            <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28 text-center">
              <span
                className="block text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#C84B27] mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                — Sıra Sende —
              </span>
              <h2
                className="text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.035em] mb-8 md:mb-10"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'opsz' 144",
                  fontWeight: 400,
                }}
              >
                Hazırsan,
                <br />
                <span className="italic">başvurunu</span> doldur.
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#EFE7D2]/70 mb-10 md:mb-12 max-w-xl mx-auto">
                12 soru. 3 dakika. Uygun bulduğumuz takdirde seninle ücretsiz
                strateji görüşmesi yaparız.
              </p>

              <a
                href="#apply"
                className="group inline-flex items-center gap-4 bg-[#C84B27] text-[#EFE7D2] px-7 md:px-9 py-4 md:py-5 hover:bg-[#EFE7D2] hover:text-[#1A2A1F] transition-colors border-2 border-[#C84B27] hover:border-[#EFE7D2]"
              >
                <span
                  className="text-[14px] md:text-[15px] tracking-[0.18em] uppercase font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Başvuruyu Başlat
                </span>
                <span className="text-[20px] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </section>

          {/* ─────────────────────────────────────────── DISCLAIMER */}
          <section className="border-t border-[#1A2A1F]/15 bg-[#EFE7D2]">
            <div className="max-w-[860px] mx-auto px-5 md:px-10 py-12 md:py-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="block w-8 h-px bg-[#1A2A1F]/40" />
                <span
                  className="text-[10px] tracking-[0.3em] uppercase text-[#5C4F38]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Yasal — Kazanç Feragatnamesi
                </span>
              </div>
              <p className="text-[12px] md:text-[13px] leading-[1.7] text-[#1A2A1F]/55">
                Lütfen paylaşılan sonuçların tipik olmadığını anlayın. Bu
                sonuçları tekrarlayacağınızı ima etmiyoruz. Doğrudan yanıt
                pazarlamasında ve reklamcılıkta yıllarca süren deneyimimiz ve
                bunun sonucunda oluşan bir kitlemiz var. Ortalama bir kişinin
                satın aldığı herhangi bir &ldquo;nasıl yapılır&rdquo;
                bilgisinden çok az sonuç aldığını biliyoruz. Sonuçlarınız
                geçmişiniz, deneyiminiz ve çalışma etiğiniz dahil ancak bunlarla
                sınırlı olmayan birçok faktöre bağlı olarak değişecektir. Tüm
                işler kayıt gerektirir ve büyük, sürekli çaba ister. Bunu kabul
                etmeye istekli değilseniz, lütfen bu programa başvurmayın.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────── FOOTER */}
          <footer className="border-t border-[#1A2A1F]/15 bg-[#EFE7D2]">
            <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-10 md:py-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <a
                    href="/funnel2"
                    className="text-[36px] md:text-[48px] leading-none tracking-[-0.03em] inline-block"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontVariationSettings: "'opsz' 144",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    Funnel<span className="text-[#C84B27]">.</span>
                  </a>
                  <p
                    className="mt-2 text-[11px] tracking-[0.2em] uppercase text-[#5C4F38]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Online Koçlar İçin Instagram Sistemi
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <span
                    className="text-[11px] tracking-[0.2em] uppercase text-[#1A2A1F]/55"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    © 2026 Funnel.
                  </span>
                  <span className="text-[11px] text-[#1A2A1F]/40 max-w-md md:text-right leading-[1.5]">
                    FACEBOOK&trade; veya Meta&trade; tarafından
                    desteklenmemektedir. Bu site Facebook&trade;&apos;un bir
                    parçası değildir.
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Typeform script — lazy load */}
      <Script
        src="//embed.typeform.com/next/embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
