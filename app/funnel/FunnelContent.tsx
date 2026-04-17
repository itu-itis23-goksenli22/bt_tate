"use client";

import Image from "next/image";
import Script from "next/script";

const DISCOVER_ITEMS = [
  {
    title: "DM Reklamlarıyla Kaliteli Lead'ler Yakalayın",
    desc: "Instagram DM reklamlarını sıfırdan kurarak hedef kitlenizden günlük tutarlı başvurular almanın formülünü öğrenin — hiçbir teknik bilgiye gerek olmadan.",
  },
  {
    title: "Funnel Mimarisini Sıfırdan Kurun",
    desc: "Reklamdan → DM'e → Strateji görüşmesine → Müşteriye dönüştüren 4 adımlı sistemi adım adım kurmayı öğrenin.",
  },
  {
    title: "İçerik Stratejisi ile Otorite Olun",
    desc: "Instagram'da koç ve danışman olarak konumlanmanızı sağlayan reels, story ve post formatlarını ve Türkiye'de işe yarayan örnekleri inceleyin.",
  },
  {
    title: "Manychat ile DM Otomasyonunu Devreye Alın",
    desc: "DM otomasyonu kurarak gece-gündüz lead toplamayı, otomatik kalifiye etmeyi ve Calendly randevularını sağlamayı öğrenin.",
  },
  {
    title: "Premium Fiyatlandırma & Yüksek Bilet Satışı",
    desc: "1.000$+ paketlerinizi DM görüşmelerinde nasıl konumlayacağınızı, fiyat itirazlarını nasıl aşacağınızı ve closing'i nasıl yapacağınızı öğrenin.",
  },
  {
    title: "İlk Yol Haritanızı Alın",
    desc: "ARTIK: Adım adım takip edebileceğiniz net bir 90 günlük plana sahip olun — ve onu nasıl ölçekleyeceğinizi görün.",
  },
];

// Palette:
// BG cream: #EFE7D2
// Sub-surface: #E6DBBF
// Deep olive text: #1A2A1F
// Terracotta accent: #C84B27
// Accent light: #E8794F

export default function FunnelContent() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-[#EFE7D2] text-[#1A2A1F]"
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        {/* HERO SECTION */}
        <section className="px-4 pt-14 pb-8 md:pt-20 md:pb-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-[#E6DBBF] text-[#1A2A1F] rounded-full px-4 py-1.5 mb-6 border border-[#1A2A1F]/15">
              <span className="w-1.5 h-1.5 bg-[#C84B27] rounded-full animate-pulse" />
              <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-wider">
                Aylık 50.000 – 300.000 TL Kazanan Online Koçlar İçin
              </p>
            </div>

            {/* Headline — no 100.000 TL reference */}
            <h1 className="text-[32px] md:text-[52px] font-extrabold leading-[1.1] mb-5 text-[#1A2A1F] tracking-tight">
              Bize 7 Gün Verin,
              <span className="block text-[#C84B27] mt-2">
                Müşteri Çeken Funnel
              </span>
              Sistemini Koçluk İşinize Kuralım
            </h1>

            {/* Sub-line */}
            <p className="text-[#1A2A1F]/70 text-[15px] md:text-[18px] max-w-2xl mx-auto mb-10">
              Türkiye&apos;de 100+ koçun ölçeklenmek için kullandığı sistemin aynısı.
            </p>

            {/* VSL VIDEO */}
            <div className="max-w-3xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-[#E6DBBF] p-2 shadow-2xl shadow-[#1A2A1F]/10 border border-[#1A2A1F]/10">
                <div className="relative aspect-video bg-[#1A2A1F] rounded-xl overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/cIbDH0lWMc0"
                    title="Instagram Funnel VSL"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <p className="text-[#1A2A1F]/60 text-[13px] mt-4">
                ▼ <span className="font-semibold">Son adım:</span> Aşağıdaki tarihten görüşme zamanını seç
              </p>
            </div>
          </div>
        </section>

        {/* QUALIFY / TYPEFORM EMBED */}
        <section id="apply" className="px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[11px] text-[#C84B27] uppercase tracking-[3px] font-bold mb-3">
                Son Adım
              </p>
              <h2 className="text-[28px] md:text-[40px] font-extrabold mb-3 text-[#1A2A1F] tracking-tight">
                Uygun Olup Olmadığını{" "}
                <span className="text-[#C84B27]">Aşağıdan Gör</span>
              </h2>
              <p className="text-[#1A2A1F]/70 text-[14px] md:text-[16px] max-w-xl mx-auto">
                12 kısa soruyu cevapla, takvimden uygun olduğun saati seç —
                seninle 1-on-1 stratejik görüşme yapalım.
              </p>
            </div>

            {/* Typeform Embed Card */}
            <div className="rounded-2xl border border-[#1A2A1F]/15 bg-[#E6DBBF] p-3 md:p-6 max-w-3xl mx-auto shadow-lg shadow-[#1A2A1F]/10">
              <div
                data-tf-live="REPLACE_WITH_TYPEFORM_ID"
                className="w-full"
                style={{ minHeight: "600px" }}
              />

              {/* Geçici placeholder mesaj — Typeform aktif olunca silinecek */}
              <div
                className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[#EFE7D2] rounded-xl border border-dashed border-[#1A2A1F]/25"
                style={{ minHeight: "500px" }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#C84B27] shadow-md">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-[20px] md:text-[24px] font-bold mb-2 text-[#1A2A1F]">
                  Form Yakında Aktif Olacak
                </h3>
                <p className="text-[#1A2A1F]/60 text-[14px] max-w-md">
                  12 soruluk başvuru formu hazırlanıyor. Çok kısa sürede burada olacak.
                </p>
              </div>

              <p className="text-[#1A2A1F]/50 text-[12px] text-center mt-3 italic">
                Form yüklenmiyorsa sayfayı yenileyin.
              </p>
            </div>
          </div>
        </section>

        {/* DISCOVER / WHAT YOU'LL LEARN — cream theme */}
        <section className="px-4 py-14 md:py-20 bg-[#EFE7D2] border-t border-[#1A2A1F]/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center md:text-left mb-10 md:mb-14 max-w-3xl">
              <p className="text-[11px] text-[#C84B27] uppercase tracking-[3px] font-bold mb-3">
                Bu Sistemde Ne Var?
              </p>
              <h2 className="text-[28px] md:text-[42px] font-extrabold leading-tight tracking-tight text-[#1A2A1F]">
                Bu <span className="text-[#C84B27]">7 Günlük Programda</span>{" "}
                Keşfedecekleriniz...
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
              {/* Left: 6-item list (2 columns wide) */}
              <div className="lg:col-span-2 space-y-6">
                {DISCOVER_ITEMS.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C84B27] flex items-center justify-center mt-0.5 shadow-lg shadow-[#C84B27]/30">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[15px] md:text-[17px] font-bold text-[#1A2A1F] mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-[#1A2A1F]/70 text-[13px] md:text-[14px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: instructor card */}
              <div className="relative max-w-sm mx-auto lg:mx-0 w-full">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#1A2A1F]/15 shadow-2xl shadow-[#1A2A1F]/10">
                  <Image
                    src="/images/instructor.jpg"
                    alt="Baturalp Tunalı"
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 380px, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A2A1F] via-[#1A2A1F]/70 to-transparent p-5">
                    <p className="text-[#E8794F] font-extrabold text-[18px] md:text-[20px] italic">
                      Baturalp Tunalı
                    </p>
                    <p className="text-white/80 text-[12px] md:text-[13px] mt-0.5">
                      InstaFunnel Eğitmeni & Kurucu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL QUOTES */}
        <section className="px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              <TestimonialQuoteCard
                name="Elif K."
                role="Yaşam Koçu"
                text="İlk reklamım daha ilk haftada işe yaradı ve hala çalışmaya devam ediyor."
              />
              <TestimonialQuoteCard
                name="Burak D."
                role="Airbnb Danışmanı"
                text="Funnel'i kurmadan önce tutarlı müşteri kazanma stratejim yoktu. Şimdi bir sistemim var."
              />
              <TestimonialQuoteCard
                name="Mert A."
                role="Mindset Koçu"
                text="Sonunda referanslara bağlı kalmadan, tahmin edilebilir şekilde müşteri kazanmanın yolunu buldum."
              />
            </div>
          </div>
        </section>

        {/* CTA REMINDER */}
        <section className="px-4 py-12 md:py-16 bg-[#C84B27] text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[26px] md:text-[36px] font-extrabold mb-4 tracking-tight">
              Hazırsan, başvurunu doldur
            </h2>
            <p className="text-white/85 text-[15px] md:text-[17px] mb-6">
              12 soru, 3 dakika. Uygun bulursak seninle ücretsiz strateji görüşmesi yaparız.
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-[#EFE7D2] text-[#1A2A1F] font-bold text-[15px] md:text-[16px] px-7 py-3.5 rounded-full hover:shadow-xl hover:scale-105 transition-all"
            >
              Başvuruyu Başlat
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>

        {/* FOOTER — no brand mark */}
        <footer className="px-4 py-10 bg-[#1A2A1F] text-white/60">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/50 text-[12px] mb-2">
              © 2026 Tüm hakları saklıdır.
            </p>
            <p className="text-white/40 text-[10px] max-w-xl mx-auto leading-relaxed">
              FACEBOOK&trade; veya Meta&trade; tarafından desteklenmemektedir.
              Bu site Facebook&trade;&apos;un bir parçası değildir.
            </p>
          </div>
        </footer>
      </main>

      {/* Typeform script — lazy load */}
      <Script src="//embed.typeform.com/next/embed.js" strategy="lazyOnload" />
    </>
  );
}

/* ─── Sub-components ─── */

function TestimonialQuoteCard({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) {
  return (
    <div className="bg-[#E6DBBF] border border-[#1A2A1F]/15 rounded-2xl p-7 hover:border-[#C84B27] hover:shadow-lg transition-all">
      <svg className="w-6 h-6 text-[#C84B27] mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-[#1A2A1F]/80 text-[14px] md:text-[15px] leading-relaxed mb-5">
        {text}
      </p>
      <div className="border-t border-[#1A2A1F]/15 pt-4">
        <p className="text-[#1A2A1F] font-bold text-[14px]">{name}</p>
        <p className="text-[#C84B27] text-[11px] font-medium uppercase tracking-wider mt-0.5">
          {role}
        </p>
      </div>
    </div>
  );
}
