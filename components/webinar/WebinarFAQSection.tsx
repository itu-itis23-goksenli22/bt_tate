"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function WebinarFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const scrollToForm = () => {
    document.getElementById('webinar-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const faqs: FAQItem[] = [
    {
      question: "Webinar gerçekten ücretsiz mi?",
      answer: "Evet, webinarımız tamamen ücretsizdir. Herhangi bir ödeme yapmanıza gerek yok ve kredi kartı bilgisi istemiyoruz. Sadece kaydolun ve canlı eğitime katılın."
    },
    {
      question: "Webinar ne zaman yapılıyor?",
      answer: "Canlı webinarlarımız her Salı ve Pazar akşamı saat 20:00'de Türkiye saati ile gerçekleşiyor. Kaydolduktan sonra size katılım linki gönderilecektir."
    },
    {
      question: "Kaydı izleyebilir miyim?",
      answer: "Evet! Canlı webinara katılamazsanız, kayıt linkini email adresinize göndereceğiz. Ancak canlı katılımı öneriyoruz çünkü soru-cevap bölümü çok değerlidir."
    },
    {
      question: "Hiç deneyimim yok, katılabilir miyim?",
      answer: "Kesinlikle! Webinarımız özellikle başlangıç seviyesindeki kişiler için tasarlanmıştır. Sıfırdan başlayıp ilk gelirinizi elde etmeniz için gerekli her şeyi öğretiyoruz."
    },
    {
      question: "Hediye paketi nedir?",
      answer: "Kaydolduktan hemen sonra yapay zeka başlangıç paketine ücretsiz erişim kazanacaksınız."
    },
    {
      question: "Webinarda neler öğreneceğim?",
      answer: "AI otomasyonu, freelancing, e-ticaret, sosyal medya büyüme, copywriting ve ilk 1000$'ınızı kazanmanız için pratik stratejiler öğreneceksiniz. Her konu pratiğe dönük ve hemen uygulanabilir."
    }
  ];

  return (
    <section className="py-20 px-4 bg-primary-light">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm md:text-base uppercase tracking-widest font-semibold mb-4">
            SIKÇA SORULAN SORULAR
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Merak Ettikleriniz
          </h2>
          <div className="flex items-center justify-center space-x-2 text-white/60 text-sm md:text-base">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            <p>Tüm sorularınızın cevapları burada</p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-glass !p-0 overflow-hidden transition-all duration-300 hover:border-accent/40"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 group"
              >
                <span className="font-bold text-white text-base md:text-lg group-hover:text-accent transition-colors">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-accent flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-white/70 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="btn-primary text-lg px-12 py-4 shadow-glow-strong hover:shadow-glow-hover"
          >
            Ücretsiz Seminere Katıl →
          </button>
        </div>
      </div>
    </section>
  );
}
