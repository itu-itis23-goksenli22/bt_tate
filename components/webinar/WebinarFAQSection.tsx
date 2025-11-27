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
      question: "500$ değerindeki hediye paketi nedir?",
      answer: "Kaydolduktan hemen sonra ChatGPT prompts kitaplığı, Midjourney şablonları, freelance başlangıç kiti ve daha fazlasını içeren dijital kaynaklara anında erişim kazanacaksınız."
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
        <div className="text-center mb-14">
          <p className="text-accent text-sm uppercase tracking-wider mb-3 font-bold">SIKÇA SORULAN SORULAR</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Merak Ettikleriniz
          </h2>
          <p className="text-lg text-white/70">
            Webinar hakkında en çok sorulan sorular
          </p>
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
                <div className="px-6 pb-6 text-white/70 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center card-glass p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Hala Soru mu Var?
          </h3>
          <p className="text-white/70 mb-6">
            Webinara katılın ve tüm sorularınızı canlı soru-cevap bölümünde sorun
          </p>
          <button
            onClick={scrollToForm}
            className="btn-accent text-lg px-12 py-5 shadow-glow-strong hover:shadow-glow-hover"
          >
            ÜCRETSİZ SEMINERE KATIL
          </button>
        </div>
      </div>
    </section>
  );
}
