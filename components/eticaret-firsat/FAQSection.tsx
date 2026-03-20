"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "E-ticaret deneyimim yok. Bu program bana uygun mu?",
    answer: "Evet! Programımız sıfırdan başlayanlar için tasarlanmıştır. Amazon FBA, Shopify ve ETSY'yi adım adım öğretiyoruz. Hesap açma, ürün bulma, listeleme ve satış stratejilerini detaylıca anlatıyoruz.",
  },
  {
    question: "Amazon FBA mı yoksa Shopify Dropshipping mi daha iyi?",
    answer: "İkisi de farklı avantajlara sahip. Amazon FBA'da Amazon'un altyapısını kullanırsınız, Dropshipping'de kendi mağazanızı yönetirsiniz. Programımızda her ikisini de öğrenip hangisinin size uygun olduğuna karar verebilirsiniz.",
  },
  {
    question: "Ne kadar sermaye gerekiyor?",
    answer: "Dropshipping ile 0 sermaye ile başlayabilirsiniz. Amazon FBA için minimum 500-1.000$ başlangıç sermayesi önerilir. ETSY'de ise neredeyse sıfır maliyetle dijital ürün satışı yapabilirsiniz.",
  },
  {
    question: "Türkiye'den Amazon'da satış yapabilir miyim?",
    answer: "Evet! Eğitimde TR şahıs şirketi ile Amazon Avrupa hesap açılışı, Payoneer hesap kurulumu ve tüm gerekli belgeleri detaylıca anlatıyoruz. Birçok üyemiz Türkiye'den başarılı şekilde satış yapıyor.",
  },
  {
    question: "AI araçları e-ticarette nasıl kullanılıyor?",
    answer: "AI ile ürün açıklamaları yazabilir, ürün fotoğraflarını düzenleyebilir, rakip analizi yapabilir ve müşteri hizmetlerini otomatikleştirebilirsiniz. Eğitimimizde AI'ı e-ticarette verimli kullanmayı öğretiyoruz.",
  },
  {
    question: "Günde ne kadar vakit ayırmam gerekiyor?",
    answer: "Günde 1-2 saat yeterlidir. Programımız esnek bir yapıda tasarlanmıştır. Birçok üyemiz tam zamanlı işlerinin yanında e-ticaret geliri elde etmektedir.",
  },
  {
    question: "Ürün bulmakta zorlanır mıyım?",
    answer: "Hayır! Eğitimde 10'dan fazla farklı ürün bulma yöntemi öğretiyoruz: Black Box araştırma, keyword analizi, Pinterest yöntemi, sezonsal ürünler, retail arbitrage ve daha fazlası.",
  },
  {
    question: "Mentörlük ve topluluk desteği nasıl çalışıyor?",
    answer: "Haftalık canlı Q&A oturumları, özel Discord/Slack kanallarında 7/24 topluluk desteği ve deneyimli e-ticaret girişimcilerinden rehberlik alabilirsiniz.",
  },
  {
    question: "Eğitim içerikleri sürekli güncelleniyor mu?",
    answer: "Evet! Amazon, Shopify ve ETSY sürekli değişiyor. Eğitim içeriklerimiz güncel tutulur ve yeni stratejiler eklenir. Ayrıca canlı yayınlarda güncel konuları işliyoruz.",
  },
  {
    question: "Kredi kartım reddedilirse ne yapmalıyım?",
    answer: "Endişelenmeyin, bu yaygın bir durumdur. Kartınızın arkasındaki numarayı arayarak bankanızla iletişime geçin ve işlemi onaylayın. Ayrıca havale/EFT ile de ödeme yapabilirsiniz.",
  },
];

export default function EticaretFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midPoint);
  const rightColumn = faqs.slice(midPoint);

  const renderFAQItem = (faq: FAQItem, globalIndex: number) => (
    <div key={globalIndex} className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleFAQ(globalIndex)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-cream-dark/50 transition-colors"
      >
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          openIndex === globalIndex ? 'bg-gold text-black rotate-45' : 'bg-gold/20 text-gold'
        }`}>
          <span className="font-bold text-sm">+</span>
        </div>
        <span className="text-gray-800 font-medium text-sm leading-snug">{faq.question}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${openIndex === globalIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pl-14">
          <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 italic">SIKÇA SORULAN SORULAR</h2>
        </div>
        <p className="text-center text-gray-500 text-sm mb-10">Cevabı Görmek İçin Soruya Tıklayın</p>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-3">{leftColumn.map((faq, i) => renderFAQItem(faq, i))}</div>
          <div className="space-y-3">{rightColumn.map((faq, i) => renderFAQItem(faq, i + midPoint))}</div>
        </div>
      </div>
    </section>
  );
}
