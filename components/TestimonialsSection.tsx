export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mehmet Y.",
      role: "E-Commerce",
      content: "3 ayda ilk $10,000'ımı yaptım. Amazon FBA modülü hayatımı değiştirdi.",
      rating: 5,
    },
    {
      name: "Ayşe K.",
      role: "Copywriter",
      content: "Copywriting öğrendikten sonra aylık $5000+ kazanıyorum. Evden çalışıyorum.",
      rating: 5,
    },
    {
      name: "Can D.",
      role: "Crypto Trader",
      content: "Crypto Trading modülü sayesinde portföyüm 10 kat büyüdü. İnanılmaz.",
      rating: 5,
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
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-glass group hover:border-gold/30"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-accent-light"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center border-t border-white/5 pt-4">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-accent-light font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-white/40 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
