import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Derya Canlar",
      role: "E-Ticaret Mağaza Sahibi",
      content: "Geçen ay küçük bir e-ticaret mağazasının sahibi olan birine ulaştım. Ürünleri güzeldi, fiyatları rekabetçiydi ama satış artmıyordu. n8n ile tam otomatik 'üründen reklam videosu üreten' akışı gösterdim. Geçen hafta proje 5.750 USD karşılığında kapandı 🔥",
      rating: 5,
      imageUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/images/test/WhatsApp%20Image%202025-11-24%20at%2015.38.24%20(1).jpeg",
      earnings: "$5,750"
    },
    {
      name: "nurettin_yilmaz",
      role: "AI Otomasyon Uzmanı",
      content: "Haftaya harika haberlerle başlıyorum! 🎉 Yapay Zeka destekli Çağrı Asistanı otomasyonumuzu yerel bir işletmeye başarıyla sattık. Mesai saatleri dışında kaçan çağrıları yakalama değerini anında gördüler. Kurulum + 30 günlük optimizasyon için 5.000$ peşin ödeme aldık.",
      rating: 5,
      imageUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/images/test/WhatsApp%20Image%202025-11-24%20at%2015.38.24.jpeg",
      earnings: "$5,000"
    },
    {
      name: "Mert_Aydin26",
      role: "n8n Otomasyon Geliştirici",
      content: "Geçen hafta anlaşmayı kapattık: $4,800 USD kurulum + 1 ay destek 🔥. Burak Bey ile yaptığımız n8n otomasyonu işe yaradı! ✨ Destek olan ekibe teşekkürler 🙌 @baturalptunalı. Daha yapılacak çok iş var.",
      rating: 5,
      imageUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/images/test/WhatsApp%20Image%202025-11-24%20at%2015.39.22.jpeg",
      earnings: "$4,800"
    },
    {
      name: "hakann8n",
      role: "AI Call Agent Uzmanı",
      content: "Küçük bir yerel işletmeye, n8n ile geliştirdiğimiz Yapay Zeka Destekli Call Agent otomasyonunu başarıyla sattık. Müşteri, mesai saatleri dışında cevaplanmayan aramalar yüzünden ciddi şekilde potansiyel kaybediyordu. Zoom üzerinden kısa bir demo yaptık. Değeri anında gördüler ve 5.000 USD peşin olarak tam kuruluma + 30 günlük optimizasyon dönemine onay verdiler.",
      rating: 5,
      imageUrl: "https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/images/test/WhatsApp%20Image%202025-11-24%20at%2015.48.08.jpeg",
      earnings: "$5,000"
    },
  ];

  return (
    <section className="py-12 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="section-title">
            ÖĞRENCİ <span className="text-accent-light">BAŞARILARI</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Gerçek insanlar. Gerçek sonuçlar. Gerçek para.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-glass group hover:border-accent/30 relative overflow-hidden"
            >
              {/* Earnings badge */}
              <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
                <span className="text-white font-bold text-sm">{testimonial.earnings}</span>
              </div>

              {/* Profile Image from testimonial screenshot */}
              <div className="mb-4">
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-primary-dark">
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Stars */}
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-accent-light"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-white/70 text-sm mb-6 leading-relaxed line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-white/5 pt-4">
                <div className="text-white font-bold text-sm mb-1">
                  {testimonial.name}
                </div>
                <div className="text-white/40 text-xs">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
