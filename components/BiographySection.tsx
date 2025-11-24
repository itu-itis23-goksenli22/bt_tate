import Image from "next/image";
import { getStorageImageUrl } from "@/lib/images";

export default function BiographySection() {
  const timeline = [
    {
      period: "Balıkesir'den Başlayan Yolculuk",
      image: "bio/1.jpeg",
      content: "Balıkesir'de asker bir baba ve öğretmen bir annenin çocuğu olarak doğdum. Ailem sürekli tayin olduğu için çocukluğum ve gençliğim Türkiye'nin neredeyse her şehrinde geçti. Ağrı'dan Şırnak'a, İzmir'den Bursa'ya kadar sürekli taşınarak büyümek hem karakterimi şekillendirdi hem de keşfetme duygumu çok güçlendirdi.\n\nLise dönemim yaramazlıkla, sistemin dışına çıkma isteğiyle ve devamsızlıklarla geçti. Buna rağmen üniversite sınavına girip %100 bursla Doğu Akdeniz Üniversitesi Makine Mühendisliği kazandım."
    },
    {
      period: "Amerika'da Mühendislik ve Staj",
      image: "bio/2.jpeg",
      content: "Central Connecticut State University döneminde lazer güdümlü roket sistemleri üzerine proje yaptım ve bu projeyle United Technologies Corporation'da staja kabul edildim. Orada hem mühendislik açısından hem network açısından önüm açıldı.\n\nTürkiye'ye döndükten sonra kariyerim çok hızlı ilerledi. Carrier ve Otis gibi dev şirketlerde Avrupa bölgesinde proje yönetimi, mekanik sistemler, büyük ölçekli inşaat projeleri, satış ve operasyon tarafında önemli görevler aldım."
    },
    {
      period: "Global Kariyerde Yükseliş",
      image: "bio/3.jpeg",
      content: "İstanbul Yeni Havalimanı gibi mega projelerde aktif rol aldım. Almanya, İngiltere, İsviçre, Fransa ve birçok farklı ülkede çalıştım; sektörün en üst noktalarındaki insanlarla aynı masalarda oturdum.\n\nBu yoğun iş temposuna paralel olarak %100 burslu MBA yaptım. Tezimi, çalıştığım holdingin global operasyon süreçlerinin dijital dönüşümü üzerine yazdım. Hazırladığım proje daha sonra şirket içinde hayata geçirildi ve operasyonel verimliliğe 55 milyon dolar seviyesinde katkı sağladı.\n\nBu başarılar beni şirketin global CEO yetiştirme programına kadar taşıdı."
    },
    {
      period: "Yeni Başlangıç: AiScale",
      image: "bio/4.jpg",
      content: "Fakat bir seyahat sırasında laptop ile çalışan ve dünyayı dolaşan mühendislerle tanışmam hayatımı değiştirdi. E-ticaret, global satış ve dijital iş modellerine yöneldim. 66 ülkeye kadar uzanan bir yolculuğa çıktım.\n\nEn son Los Angeles'tan Miami'ye taşındım, dijital işlerimi büyütüyor ve farklı alanlara yatırımlar yapıyorum.\n\nBugün AiScale üzerinden yapay zeka, global ticaret, online gelir, eğitim ve yazılım projelerine odaklanıyorum. Amacımız net: Öğrendiklerimi paylaşmak, ürettiğim dijital işleri ölçeklemek ve yeni neslin global alanda daha güçlü bir şekilde yer almasına katkı sağlamak."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary to-primary-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-dark rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-accent text-sm uppercase tracking-widest mb-4">
            YOLCULUK
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Baturalp <span className="text-accent">Kimdir?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
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
              className={`relative mb-8 ${
                index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%]"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-8 ${
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
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-white/10">
                    <Image
                      src={getStorageImageUrl(item.image)}
                      alt={item.period}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Period label */}
                  <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
                    <span className="text-accent font-semibold text-sm">{item.period}</span>
                  </div>

                  {/* Content */}
                  <div className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End badge */}
        <div className="flex justify-center mt-12">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-accent to-accent-dark rounded-full shadow-lg shadow-accent/30">
              <span className="text-white font-bold text-lg">🚀 Macera Devam Ediyor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
