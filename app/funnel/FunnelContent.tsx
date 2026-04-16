"use client";

import Script from "next/script";

const MAGENTA_BG_SUBTLE = "linear-gradient(223deg, rgba(217,70,239,0.12) 0%, rgba(162,28,175,0.08) 100%)";
const CTA_GRADIENT_MAGENTA = "linear-gradient(135deg, #A21CAF 0%, #D946EF 50%, #E879F9 100%)";

const TESTIMONIAL_VIDEOS = [
  { id: "U17038k3dZs", name: "Müşteri 1", role: "Online Koç" },
  { id: "nWvImM9U2NQ", name: "Müşteri 2", role: "İş Danışmanı" },
  { id: "24sobDc1m-8", name: "Müşteri 3", role: "Fitness Koçu" },
  { id: "U17038k3dZs", name: "Müşteri 4", role: "Beslenme Uzmanı" },
  { id: "nWvImM9U2NQ", name: "Müşteri 5", role: "Mindset Koçu" },
  { id: "24sobDc1m-8", name: "Müşteri 6", role: "Pazarlama Danışmanı" },
];

export default function FunnelContent() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-[#0a0613] text-white"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* 1. TOP BAR */}
        <header className="border-b border-[#2a1f4a] bg-[#0a0613]/90 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center font-extrabold text-white text-[14px]"
                style={{ background: CTA_GRADIENT_MAGENTA }}
              >
                F
              </div>
              <span className="font-extrabold tracking-wide text-[16px] md:text-[18px]">
                AI SCALE <span className="text-[#D946EF]">FUNNEL</span>
              </span>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="px-4 pt-10 pb-12 md:pt-16 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* 2. PILL BADGE */}
            <div
              className="inline-block border border-[#D946EF]/40 rounded-full px-5 py-2 mb-6"
              style={{ background: MAGENTA_BG_SUBTLE }}
            >
              <p className="text-[#E879F9] text-[11px] md:text-[13px] font-bold uppercase tracking-[2px]">
                ONLİNE KOÇLAR & DANIŞMANLAR & İŞLETMELER İÇİN
              </p>
            </div>

            {/* 3. BIG HEADLINE */}
            <h1 className="text-[34px] md:text-[56px] font-extrabold leading-[1.08] mb-4">
              Sana 7 Gün İçinde Instagram&apos;ından
              <span className="block text-[#D946EF] mt-2">
                Aylık 100.000 TL Kazandıracak Funnel
              </span>
              Kuruyoruz
            </h1>

            {/* 4. SUB-LINE */}
            <p className="text-white/60 text-[14px] md:text-[18px] max-w-2xl mx-auto mb-8">
              Türkiye&apos;de 100+ koçun ve danışmanın kullandığı sistemin aynısı —
              Done-with-you & Done-for-you modelleriyle Instagram&apos;ını gelir makinesine dönüştür.
            </p>

            {/* 5. VSL VIDEO */}
            <div className="max-w-3xl mx-auto">
              <p className="text-center text-[10px] text-[#D946EF] uppercase tracking-[3px] mb-2 font-bold">
                ▼ VİDEOYU SONUNA KADAR İZLE ▼
              </p>
              <div
                className="relative rounded-xl overflow-hidden p-2"
                style={{ background: MAGENTA_BG_SUBTLE, border: "1px solid rgba(217,70,239,0.3)" }}
              >
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
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
              <p className="text-white/40 text-[12px] text-center mt-3 italic">
                ⚠️ Sesini açmayı unutma
              </p>
            </div>
          </div>
        </section>

        {/* 6 + 7. QUALIFY / TYPEFORM EMBED */}
        <section className="px-4 py-12 md:py-16 border-t border-[#2a1f4a]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[11px] text-[#E879F9] uppercase tracking-[3px] font-bold mb-2">
                SON ADIM
              </p>
              <h2 className="text-[28px] md:text-[40px] font-extrabold mb-3">
                Aşağıdan{" "}
                <span className="text-[#D946EF]">Uygun Olup Olmadığını</span> Gör
              </h2>
              <p className="text-white/50 text-[14px] md:text-[16px] max-w-xl mx-auto">
                12 kısa soruyu cevapla, takvimden uygun olduğun saati seç —
                seninle 1-on-1 stratejik görüşme yapalım.
              </p>
            </div>

            {/* Typeform Embed Placeholder */}
            <div
              className="rounded-[12px] border border-dashed border-[#D946EF]/40 p-2 md:p-4 max-w-3xl mx-auto"
              style={{ background: MAGENTA_BG_SUBTLE }}
            >
              {/* TODO: Buraya kullanıcının vereceği Typeform ID gelecek.
                  Aktif etmek için aşağıdaki div'in data-tf-live attribute'una
                  gerçek Typeform ID'sini koy ve placeholder mesajı sil. */}
              <div
                data-tf-live="REPLACE_WITH_TYPEFORM_ID"
                className="w-full"
                style={{ minHeight: "600px" }}
              />

              {/* Geçici placeholder mesaj — Typeform aktif olunca silinecek */}
              <div
                className="flex flex-col items-center justify-center text-center py-20 px-6"
                style={{ minHeight: "500px" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: CTA_GRADIENT_MAGENTA }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-[20px] md:text-[24px] font-bold mb-2">
                  Form Yakında Aktif Olacak
                </h3>
                <p className="text-white/50 text-[14px] max-w-md">
                  12 soruluk başvuru formu hazırlanıyor. Çok kısa sürede burada olacak.
                </p>
              </div>

              <p className="text-white/30 text-[12px] text-center mt-3 italic">
                Form yüklenmiyorsa sayfayı yenileyin.
              </p>
            </div>
          </div>
        </section>

        {/* 8 + 9. PROOF IT WORKS — TESTIMONIAL VIDEOS */}
        <section className="px-4 py-12 md:py-16 border-t border-[#2a1f4a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[11px] text-[#E879F9] uppercase tracking-[3px] font-bold mb-2">
                KANITI GÖR
              </p>
              <h2 className="text-[28px] md:text-[40px] font-extrabold mb-3">
                Müşterilerimizden{" "}
                <span className="text-[#D946EF]">Dinleyin</span>
              </h2>
              <p className="text-white/50 text-[14px] md:text-[16px] max-w-2xl mx-auto">
                Türkiye&apos;nin dört bir yanından koçlar, danışmanlar ve işletme sahipleri
                bu sistemle Instagram&apos;larını gerçek bir gelir makinesine dönüştürdü.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {TESTIMONIAL_VIDEOS.map((v, i) => (
                <TestimonialVideoCard
                  key={`${v.id}-${i}`}
                  videoId={v.id}
                  name={v.name}
                  role={v.role}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 10. TESTIMONIAL QUOTES */}
        <section className="px-4 py-12 md:py-16 border-t border-[#2a1f4a]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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

        {/* 11. EARNINGS DISCLAIMER */}
        <section className="px-4 py-10 border-t border-[#2a1f4a]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/30 text-[11px] md:text-[12px] leading-relaxed">
              <strong className="text-white/40">KAZANÇ & GELİR FERAGATNAMESİ:</strong>{" "}
              Lütfen paylaşılan sonuçların tipik olmadığını anlayın. Bu sonuçları
              tekrarlayacağınızı ima etmiyoruz. Doğrudan yanıt pazarlamasında ve
              reklamcılıkta yıllarca süren deneyimimiz ve bunun sonucunda oluşan bir
              kitlemiz var. Ortalama bir kişinin satın aldığı herhangi bir &quot;nasıl
              yapılır&quot; bilgisinden çok az sonuç aldığını biliyoruz. Sonuçlarınız
              geçmişiniz, deneyiminiz, çalışma etiğiniz dahil ancak bunlarla sınırlı
              olmayan birçok faktöre bağlı olarak değişecektir. Tüm işler kayıt
              gerektirir ve büyük ve sürekli çaba gerektirir. Bunu kabul etmeye
              istekli değilseniz, lütfen BU PROGRAMI ALMAYIN.
            </p>
          </div>
        </section>

        {/* 12. FOOTER */}
        <footer className="px-4 py-8 border-t border-[#2a1f4a]">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center font-extrabold text-white text-[12px]"
                style={{ background: CTA_GRADIENT_MAGENTA }}
              >
                F
              </div>
              <span className="font-extrabold tracking-wide text-[14px]">
                AI SCALE <span className="text-[#D946EF]">FUNNEL</span>
              </span>
            </div>
            <p className="text-white/30 text-[11px] mb-2">
              © 2026 AI Scale Funnel. Tüm hakları saklıdır.
            </p>
            <p className="text-white/20 text-[10px] max-w-xl mx-auto leading-relaxed">
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

function TestimonialVideoCard({
  videoId,
  name,
  role,
}: {
  videoId: string;
  name: string;
  role: string;
}) {
  return (
    <div className="bg-[#15102a] border border-[#2a1f4a] rounded-xl overflow-hidden hover:border-[#D946EF]/40 transition-colors">
      <div
        className="relative w-full bg-black"
        style={{ paddingBottom: "177.78%" }}
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`${name} — ${role}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <p className="text-[#D946EF] font-bold text-[14px] md:text-[15px]">
          {name}
        </p>
        <p className="text-white/50 text-[12px]">{role}</p>
      </div>
    </div>
  );
}

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
    <div className="bg-[#15102a] border border-[#2a1f4a] rounded-xl p-6 hover:border-[#D946EF]/40 transition-colors">
      <p className="text-[#D946EF] font-bold text-[14px] mb-1">{name}</p>
      <p className="text-white/40 text-[11px] mb-4 uppercase tracking-wider">
        {role}
      </p>
      <p className="text-white/80 text-[13px] md:text-[14px] italic leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}
