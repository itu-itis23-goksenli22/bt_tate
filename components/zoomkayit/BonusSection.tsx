const bonuses = [
  {
    title: "AI Araçları Başlangıç Kiti",
    value: "$150",
    description:
      "ChatGPT, Midjourney ve diğer AI araçlarını en verimli şekilde kullanmanız için hazırlanmış kapsamlı rehber.",
  },
  {
    title: "Freelance Hızlı Başlangıç Şablonları",
    value: "$100",
    description:
      "Upwork ve Fiverr profilleriniz için hazır şablonlar, teklif yazma rehberi ve ilk müşteri bulma stratejileri.",
  },
  {
    title: "E-Ticaret Ürün Araştırma Rehberi",
    value: "$120",
    description:
      "Kazandıran ürünleri bulmak için AI destekli araştırma yöntemleri ve Shopify mağaza kurulum rehberi.",
  },
  {
    title: "Sosyal Medya İçerik Takvimi",
    value: "$80",
    description:
      "30 günlük hazır içerik planı, viral içerik formülleri ve AI ile içerik üretme workflow'u.",
  },
  {
    title: "Özel Discord Topluluğu Erişimi",
    value: "$50",
    description:
      "Diğer katılımcılarla networking yapın, sorularınızı sorun ve birlikte büyüyün.",
  },
];

export default function BonusSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
          Webinara Katılanlara Özel
        </h2>
        <p className="text-gold text-3xl md:text-5xl font-bold mb-4">
          $500 Değerinde Bonus Paket
        </p>
        <p className="text-white/50 mb-12">
          Ücretsiz kayıt olun ve aşağıdaki bonusların tamamını alın
        </p>

        <div className="space-y-4">
          {bonuses.map((bonus, i) => (
            <div
              key={i}
              className="bg-primary-light border border-primary-lighter rounded-xl p-5 md:p-6 flex items-start gap-4 text-left hover:border-gold/30 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-bold">{bonus.title}</h3>
                  <span className="text-gold text-sm font-semibold bg-gold/10 px-2 py-0.5 rounded">
                    {bonus.value} Değerinde
                  </span>
                </div>
                <p className="text-white/50 text-sm">{bonus.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gold/10 border border-gold/20 rounded-lg">
          <p className="text-white text-lg">
            Toplam Değer:{" "}
            <span className="line-through text-white/40">$500</span>{" "}
            <span className="text-gold font-bold text-2xl">ÜCRETSİZ</span>
          </p>
        </div>
      </div>
    </section>
  );
}
