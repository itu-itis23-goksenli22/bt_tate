"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "AI SCALE nedir ve nasıl çalışır?",
      answer: "AI SCALE, yapay zeka destekli yeni nesil bir online eğitim platformudur. 6 farklı yüksek gelirli beceri alanında uzman mentorlardan öğrenecek, canlı grup eğitimleri izleyecek ve global bir toplulukta yer alacaksınız. Amacımız size AI ile para kazanma sistemini öğretmek ve finansal özgürlüğe ulaşmanızı sağlamaktır."
    },
    {
      question: "Hangi becerileri öğreneceğim?",
      answer: "E-Commerce, Copywriting, Freelancing, Amazon FBA, Crypto Trading ve Content Creation olmak üzere 6 yüksek gelirli beceri alanında eğitim alacaksınız. Her modülde uzman mentorlar tarafından hazırlanan videolar, canlı grup eğitimleri ve pratik ödevler bulunur."
    },
    {
      question: "Önceden deneyim gerekli mi?",
      answer: "Hayır, hiçbir ön deneyim gerekli değil. Eğitimlerimiz sıfırdan başlayanlara uygun şekilde tasarlanmıştır. İster hiç deneyiminiz olmasın, ister var olan becerilerinizi geliştirmek isteyin, size uygun içerikler bulacaksınız."
    },
    {
      question: "Ne kadar sürede para kazanmaya başlarım?",
      answer: "Bu tamamen sizin çalışma temponuza ve seçtiğiniz beceriye bağlıdır. Bazı öğrenciler ilk ayda kazanç elde ederken, bazıları 2-3 ay içinde ilk gelirlerini alır. Önemli olan tutarlı çalışma ve mentor tavsiyelerini uygulamaktır."
    },
    {
      question: "Canlı eğitimler hangi saatlerde?",
      answer: "Canlı grup eğitimleri hafta içi her gün farklı saatlerde düzenlenir. Tüm eğitimler kaydedilir, bu yüzden canlı katılamasanız bile daha sonra izleyebilirsiniz. Ayrıca 24/7 topluluk desteği sayesinde sorularınızı istediğiniz zaman sorabilirsiniz."
    },
    {
      question: "Mentorlara nasıl ulaşabilirim?",
      answer: "Platform içinde mentorlarla direkt iletişim kurabilirsiniz. Canlı grup eğitimlerinde soru sorabilir ve topluluk forumlarında uzmanlardan geri bildirim alabilirsiniz."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="section-title">
            SIKÇA SORULAN <span className="text-accent-light">SORULAR</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Aklınızdaki soruların cevapları burada
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-glass !p-0 overflow-hidden transition-all duration-300 hover:border-accent/40"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 group"
              >
                <span className="font-bold text-white text-base md:text-lg group-hover:text-accent-light transition-colors">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-accent-light flex-shrink-0 transition-transform duration-300 ${
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
      </div>
    </section>
  );
}
