"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Bu webinar gerçekten ücretsiz mi?",
    answer:
      "Evet, %100 ücretsizdir. Herhangi bir ücret talep edilmez. Kayıt olun ve canlı olarak katılın.",
  },
  {
    question: "E-ticaret deneyimim yok, katılabilir miyim?",
    answer:
      "Kesinlikle! Webinar sıfırdan başlayanlar için tasarlanmıştır. Hiçbir e-ticaret veya teknik deneyim gerekmiyor. AI araçlarıyla her şeyi adım adım gösteriyoruz.",
  },
  {
    question: "Webinara nasıl katılırım?",
    answer:
      "Kayıt olduktan sonra Zoom webinar davetiyesi e-posta adresinize otomatik olarak gönderilecek. Her gün 20:00'da linke tıklayarak katılabilirsiniz.",
  },
  {
    question: "Kayıt olduktan sonra ne olacak?",
    answer:
      "E-postanıza Zoom davetiyesi ve hatırlatma mesajları gönderilecek. Ayrıca bonus paketinize nasıl erişeceğiniz hakkında bilgi alacaksınız.",
  },
  {
    question: "Webinarı kaçırırsam tekrar izleyebilir miyim?",
    answer:
      "Webinar canlı olarak düzenleniyor ve tekrar gösterimi sınırlıdır. En iyi deneyim için canlı katılmanızı öneririz, böylece sorularınızı da sorabilirsiniz.",
  },
  {
    question: "Bu bir satış sunumu mu?",
    answer:
      "Webinar boyunca gerçek değer ve uygulanabilir stratejiler paylaşıyoruz. Etkinlik sonunda daha ileri düzey eğitim programımızdan bahsediyoruz, ancak bu tamamen opsiyoneldir.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          Sık Sorulan Sorular
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-primary-light border border-primary-lighter rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="text-white font-medium pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
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
                  openIndex === i ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-white/60 text-sm leading-relaxed px-5">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
