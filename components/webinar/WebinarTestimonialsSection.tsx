"use client";

export default function WebinarTestimonialsSection() {
  const scrollToForm = () => {
    document.getElementById('webinar-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const testimonials = [
    {
      name: "Ahmet K.",
      role: "Freelance Developer",
      image: "👨‍💻",
      text: "Webinar sayesinde Upwork'te ilk müşterimi buldum. İlk ayda 2,500$ kazandım!",
      result: "İlk ayda $2,500"
    },
    {
      name: "Elif Y.",
      role: "E-Ticaret Sahibi",
      image: "👩‍💼",
      text: "Shopify mağazamı kurduktan 3 ay sonra aylık 5,000$ gelir elde ediyorum.",
      result: "Aylık $5,000"
    },
    {
      name: "Mehmet S.",
      role: "AI Freelancer",
      image: "🎨",
      text: "ChatGPT ile copywriting hizmeti sunmaya başladım. Müşteriler çok memnun!",
      result: "10+ Müşteri"
    },
    {
      name: "Zeynep A.",
      role: "Content Creator",
      image: "📱",
      text: "Instagram'da öğrendiğim stratejilerle 30k'ya ulaştım ve sponsorluk almaya başladım.",
      result: "30K Takipçi"
    },
    {
      name: "Can B.",
      role: "AI Automation",
      image: "🤖",
      text: "Şirketlere AI otomasyon hizmeti sunuyorum. Webinar hayatımı değiştirdi!",
      result: "Aylık $8,000"
    },
    {
      name: "Ayşe D.",
      role: "Etsy Satıcısı",
      image: "🎁",
      text: "Etsy mağazamda Midjourney ile oluşturduğum tasarımları satıyorum.",
      result: "Aylık $3,500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-wider mb-3 font-bold">KATILIMCI GÖRÜŞLERİ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Binlerce Kişi <span className="text-accent">Hayatını Değiştirdi</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Webinarımıza katılan katılımcılarımızdan gerçek sonuçlar
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-glass p-6 hover:border-accent/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-white/80 mb-4 leading-relaxed">"{testimonial.text}"</p>
              <div className="inline-block bg-accent/20 border border-accent text-accent px-3 py-1 rounded-full text-sm font-bold">
                {testimonial.result}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white/80 text-lg mb-6">
            Siz de bu başarı hikayelerinin bir parçası olun
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
