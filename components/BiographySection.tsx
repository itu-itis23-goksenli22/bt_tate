import Image from "next/image";
import { getStorageImageUrl } from "@/lib/images";

export default function BiographySection() {
  const timeline = [
    {
      period: "Balıkesir'den Başlayan Yolculuk",
      image: "bio/1.jpeg",
      content: "Balıkesir'de asker bir baba ve öğretmen bir annenin çocuğu olarak doğdum. Türkiye'nin neredeyse her şehrinde büyüdüm. Sürekli taşınmak karakterimi şekillendirdi. Lise dönemi yaramazlıklarla geçti ama %100 bursla Doğu Akdeniz Üniversitesi Makine Mühendisliği kazandım."
    },
    {
      period: "Amerika'da Mühendislik",
      image: "bio/2.jpeg",
      content: "Central Connecticut State University'de lazer güdümlü roket sistemleri projesiyle United Technologies Corporation'da staj yaptım. Türkiye'ye döndükten sonra Carrier ve Otis gibi dev şirketlerde Avrupa bölgesinde proje yönetimi, satış ve operasyon görevleri aldım."
    },
    {
      period: "Global Kariyerde Yükseliş",
      image: "bio/3.jpeg",
      content: "İstanbul Yeni Havalimanı gibi mega projelerde rol aldım. Almanya, İngiltere, İsviçre, Fransa'da çalıştım. %100 burslu MBA yaptım. Tezim holdingin dijital dönüşümü üzerineydi ve 55 milyon dolar katkı sağladı. Bu başarılar beni global CEO yetiştirme programına taşıdı."
    },
    {
      period: "Yeni Başlangıç: AiScale",
      image: "bio/4.jpg",
      content: "Laptop ile dünyayı dolaşan mühendislerle tanışınca hayatım değişti. E-ticaret ve dijital iş modellerine yöneldim. 66 ülke gezdim. Los Angeles'tan Miami'ye taşındım. Bugün AiScale ile yapay zeka, global ticaret ve eğitim projelerine odaklanıyorum. Amacım: Öğrendiklerimi paylaşmak ve yeni neslin global alanda güçlenmesine katkı sağlamak."
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-primary to-primary-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-dark rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-accent text-sm uppercase tracking-widest mb-2">
            YOLCULUK
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Baturalp <span className="text-accent">Kimdir?</span>
          </h2>
          <p className="text-white/60 text-base max-w-3xl mx-auto">
            Balıkesir'den başlayıp dünyaya uzanan bir başarı hikayesi
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/20"></div>

          {timeline.map((item, index) => (
            <div
              key={index}
              className={`relative mb-5 ${
                index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%]"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-6 ${
                  index % 2 === 0
                    ? "left-8 md:left-auto md:right-[-1.125rem]"
                    : "left-8 md:left-[-1.125rem]"
                } w-9 h-9 bg-accent rounded-full border-4 border-primary flex items-center justify-center z-10`}
              >
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>

              {/* Content card */}
              <div
                className={`ml-20 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                }`}
              >
                <div className="card-trw group hover:border-accent/50 transition-all">
                  {/* Image */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border border-white/10">
                    <Image
                      src={getStorageImageUrl(item.image)}
                      alt={item.period}
                      fill
                      className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                        index === 3 ? "object-top" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Period label */}
                  <div className="inline-block px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full mb-3">
                    <span className="text-accent font-semibold text-sm">{item.period}</span>
                  </div>

                  {/* Content */}
                  <div className="text-white/70 text-sm leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End badge */}
        <div className="flex justify-center mt-6">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full"></div>
            <div className="relative px-6 py-3 bg-gradient-to-r from-accent to-accent-dark rounded-full shadow-lg shadow-accent/30">
              <span className="text-white font-bold text-base">🚀 Macera Devam Ediyor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
