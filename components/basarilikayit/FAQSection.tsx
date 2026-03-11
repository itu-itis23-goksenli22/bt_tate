"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Teknik bilgiye ihtiyacım var mı? Daha önce hiç otomasyon kurmadım.",
    answer: "Hayır! Programımız sıfırdan başlayanlar için tasarlanmıştır. N8N ve Claude Code'u adım adım öğretiyoruz. Teknik bilgi gerektirmeden, drag-and-drop arayüzüyle otomasyonlar kurabilirsiniz.",
  },
  {
    question: "N8N nedir ve neden N8N kullanıyorsunuz?",
    answer: "N8N, açık kaynaklı bir otomasyon platformudur. Zapier veya Make'e göre çok daha esnek ve güçlüdür. Kendi sunucunuzda barındırabilir, sınırsız workflow oluşturabilir ve müşterilerinize özel çözümler sunabilirsiniz.",
  },
  {
    question: "Claude Code nedir ve nasıl kullanılıyor?",
    answer: "Claude Code, Anthropic'in geliştirdiği AI asistanıdır. Programımızda Claude Code'u kullanarak müşterileriniz için AI chatbot'lar, içerik üretim sistemleri ve akıllı otomasyon araçları oluşturmayı öğreneceksiniz.",
  },
  {
    question: "B2B SaaS satarak ne kadar kazanabilirim?",
    answer: "Üyelerimiz aylık birkaç bin TL'den 100.000+ TL'ye kadar farklı gelir seviyeleri elde etmektedir. Otomasyon paketleri genellikle müşteri başına aylık 2.000-15.000 TL arasında fiyatlandırılır. Başarınız çalışma disiplininize bağlıdır.",
  },
  {
    question: "Mentörlük nasıl çalışıyor?",
    answer: "Haftalık canlı Q&A oturumları, özel Discord/Slack kanallarında 7/24 topluluk desteği ve deneyimli AI ajans sahiplerinden birebir rehberlik alabilirsiniz. Masterclass paketinde ek olarak canlı mentörlük seansları bulunur.",
  },
  {
    question: "Gerçekten para iade garantisi var mı?",
    answer: "Evet! 365 günlük para iade garantimiz var. Kayıt tarihinden itibaren ilk 365 gün içinde basit iade koşullarını yerine getirmeniz halinde size tam bir geri ödeme sağlıyoruz.",
  },
  {
    question: "Tam zamanlı işim var. Günde ne kadar süre ayırmam gerekiyor?",
    answer: "Programımız esnek bir yapıda tasarlanmıştır. Günde 1-2 saat ayırarak bile ilerleme kaydedebilirsiniz. Birçok üyemiz tam zamanlı işlerinin yanında başarılı AI ajansları kurmuştur.",
  },
  {
    question: "Müşterilerimi nasıl bulacağım?",
    answer: "Programda B2B müşteri edinme stratejileri, Setter eğitimi, soğuk e-posta şablonları, LinkedIn outreach yöntemleri ve Ads stratejisi detaylı olarak öğretiliyor. Ayrıca topluluk içinde iş birliği fırsatları da bulabilirsiniz.",
  },
  {
    question: "Eğitim içeriğini ne kadar sürede tamamlayabilirim?",
    answer: "Temel modülleri 4-6 haftada tamamlayabilirsiniz. Ancak eğitim sürekli güncellenen bir yapıdadır ve yeni içerikler eklenmektedir. İlk müşterinizi ilk ay içinde almanız hedeflenmektedir.",
  },
  {
    question: "Diğer AI kurslarından farkınız ne?",
    answer: "Sadece teori değil, gerçek dünyada kanıtlanmış bir sistem öğretiyoruz. N8N + Claude Code kombinasyonu ile pratik otomasyon kurma, B2B satış stratejileri ve ajans yönetimi dahil uçtan uca bir program sunuyoruz.",
  },
  {
    question: "Dünyanın herhangi bir yerinden katılabilir miyim?",
    answer: "Evet! İnternet bağlantısı olan herhangi bir yerden çalışabilirsiniz. Üyelerimiz Türkiye, Almanya, İngiltere, ABD ve daha birçok ülkeden başarılı AI ajansları yönetmektedir.",
  },
  {
    question: "Kredi kartım reddedilirse ne yapmalıyım?",
    answer: "Endişelenmeyin, bu yaygın bir durumdur. Kartınızın arkasındaki numarayı arayarak bankanızla iletişime geçin ve işlemi onaylayın. Genellikle hemen çözülür.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns
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
          openIndex === globalIndex
            ? 'bg-gold text-black rotate-45'
            : 'bg-gold/20 text-gold'
        }`}>
          <span className="font-bold text-sm">+</span>
        </div>
        <span className="text-gray-800 font-medium text-sm leading-snug">
          {faq.question}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          openIndex === globalIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pl-14">
          <p className="text-gray-600 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 italic">
            SIKÇA SORULAN SORULAR
          </h2>
        </div>
        <p className="text-center text-gray-500 text-sm mb-10">
          Cevabı Görmek İçin Soruya Tıklayın
        </p>

        {/* Two-column FAQ grid */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-3">
            {leftColumn.map((faq, i) => renderFAQItem(faq, i))}
          </div>
          <div className="space-y-3">
            {rightColumn.map((faq, i) => renderFAQItem(faq, i + midPoint))}
          </div>
        </div>
      </div>
    </section>
  );
}
