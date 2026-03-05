import Image from "next/image";

const discoveries = [
  {
    title: "AI Otomasyonu ile Gelir Üretin",
    description:
      "ChatGPT ve Midjourney gibi araçlarla otomatik gelir sistemleri kurmayı öğrenin... Teknik bilgiye gerek kalmadan, sıfırdan başlayarak.",
  },
  {
    title: "Freelance Stratejiler ile Hızlı Kazanç",
    description:
      "Upwork ve Fiverr gibi platformlarda yapay zeka destekli hizmetler sunarak ilk müşterilerinizi nasıl bulacağınızı keşfedin.",
  },
  {
    title: "E-Ticaret Sırlarını Açığa Çıkarın",
    description:
      "Shopify ve Etsy üzerinde yapay zekanın gücüyle ürün bulma, listeleme ve satış yapma stratejilerini öğrenin.",
  },
  {
    title: "Sosyal Medyada Patlama Yapın",
    description:
      "Instagram, TikTok ve YouTube'da yapay zeka ile içerik üretip organik büyüme sağlamanın formülünü öğrenin.",
  },
  {
    title: "Copywriting Temelleri ile Satışlarınızı Katlayın",
    description:
      "AI destekli copywriting ile satış yapan metinler yazmanın ve dönüşüm oranlarınızı artırmanın yollarını keşfedin.",
  },
  {
    title: "İlk 1,000$ Yol Haritanızı Alın",
    description:
      "ARTIK: Adım adım ilk 1,000$'ınızı kazanacağınız net bir yol haritası ile webinardan ayrılın... ve nasıl 10,000$'a ölçekleyeceğinizi görün!",
  },
];

export default function DiscoverSection() {
  return (
    <section className="py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-gold text-2xl md:text-3xl font-semibold mb-12 text-center md:text-left">
          Bu %100 Ücretsiz Webinarda Keşfedecekleriniz...
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Bullet points */}
          <div className="space-y-6">
            {discoveries.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Instructor photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-72 h-96 md:w-80 md:h-[440px] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/instructor.jpg"
                  alt="Baturalp Tunalı - AI Scale Kurucusu"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                />
              </div>
              {/* Name badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 rounded-b-2xl border-t border-white/10">
                <p className="text-gold font-semibold text-lg italic">
                  Baturalp Tunalı
                </p>
                <p className="text-white/60 text-sm">AI Scale Kurucusu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
