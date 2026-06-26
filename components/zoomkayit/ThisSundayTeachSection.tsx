import Image from "next/image";

// "This Sunday I'll Teach" — aifreelancer.ai'den uyarlanmış section.
// Hero ile Discover arasında durur. Talep argumentation:
// "Binlerce işletme AI uzmanına yalvarıyor, arz yetersiz" mesajı + LIVE WEBINAR
// whiteboard görseli + ASAP / next week earning urgency'sı.

export default function ThisSundayTeachSection() {
  return (
    <section className="py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        {/* Başlık */}
        <h2 className="text-white text-[26px] md:text-[40px] font-extrabold leading-tight text-center mb-10">
          Bu Pazar Sana Nasıl Tam Zamanlı Gelir Kuracağını
          Öğreteceğim —{" "}
          <span className="text-gold">AI Marketing Otomasyonu</span>,
          Manychat, Claude Code App ve Daha Fazlasıyla
        </h2>

        {/* Açılış body */}
        <div className="space-y-4 text-white/80 text-[15px] md:text-[17px] leading-relaxed text-center mb-10 max-w-2xl mx-auto">
          <p>
            Sıradan insanlar herhangi bir teknik bilgi, deneyim ya da kodlama
            becerisi olmadan kazançlı AI işleri kuruyor —{" "}
            <strong className="text-white">çünkü AI işin %90'ını yapıyor</strong>.
            Sen sadece onu nasıl kullanacağını ve diğer işletmelere nasıl
            kuracağını öğrenmelisin.
          </p>
          <p className="text-gold font-semibold text-[16px] md:text-[18px]">
            Bu Pazar 19:00'da sana tam olarak nasıl yapılacağını göstereceğiz:
          </p>
        </div>

        {/* LIVE WEBINAR görseli */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-[#111] mb-10">
          {/* LIVE rozet */}
          <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 bg-[#ff5722] text-white text-[10px] md:text-[11px] font-extrabold tracking-widest uppercase px-2.5 py-1.5 rounded">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            CANLI WEBINAR
          </div>
          <Image
            src="/images/instructor.jpg"
            alt="Canlı Webinar — AI Marketing Otomasyonu Workshop"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* Demand argumentation */}
        <div className="space-y-5 text-white/80 text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
          <p>
            <strong className="text-white">
              Binlerce işletme AI yardımı için yalvarıyor
            </strong>{" "}
            — ama yetecek kadar AI uzmanı yok.
          </p>
          <p>
            AI'yı öğrenip diğer işletmelere entegre edenler{" "}
            <strong className="text-white">
              önümüzdeki on yılda muazzam talep görecek
            </strong>
            .
          </p>
          <p>
            Web sitesi kurma, e-posta yazma, görsel tasarım, otomasyon kurulumu
            gibi AI ile kolayca yapılan işleri öğrenerek{" "}
            <strong className="text-white">
              yan gelir ya da tam zamanlı ciddi bir gelir
            </strong>{" "}
            kurabilirsin.
          </p>
          <p>
            Bu Pazar canlı yayında AI'da ustalaşmanın ve hemen başlayıp{" "}
            <span className="text-gold font-semibold">
              bir hafta içinde gelir üretmenin
            </span>{" "}
            tam haritasını göstereceğiz.
          </p>
        </div>
      </div>
    </section>
  );
}
