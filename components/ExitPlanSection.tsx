import { CHECKOUT_URL } from "@/lib/constants";

export default function ExitPlanSection() {
  const courses = [
    { icon: "📊", name: "İş Analizi" },
    { icon: "📈", name: "Büyüme Stratejileri" },
    { icon: "👥", name: "Topluluk Yönetimi" },
    { icon: "🌐", name: "Global Pazarlama" },
    { icon: "🏛️", name: "Finans Yönetimi" },
    { icon: "💝", name: "Marka Oluşturma" }
  ];

  return (
    <section className="py-20 px-4 bg-primary relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Text content */}
          <div>
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Sana Asla<br />
              <span className="text-accent">Öğretmedikleri</span><br />
              Çıkış Planı
            </h2>

            {/* Description */}
            <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed mb-10">
              <p>
                <span className="text-white font-semibold">Gerçek şu ki, sistem asla senin başarın için kurulmadı.</span> Seni bağımlı, maaş çeklerinde, asla gerçekleşmeyen vaatlerde tutmak için kuruldu.
              </p>

              <p className="text-white/60">
                Gerçek Dünya sadece başka bir platform değil.
              </p>

              <p>
                Hayat için yeni bir işletim sistemi. İçeride, <span className="text-white font-semibold">gerçek para kazandıran gerçek becerileri</span> öğreneceksiniz. Kanıtlanmış girişimciler tarafından mentorluk edileceksiniz.
              </p>

              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
                <p className="text-white font-semibold">
                  Nakit akışı, bağımsızlık ve en önemlisi kontrol inşa edeceksiniz.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
              <button className="btn-primary text-lg px-10 py-4 shadow-glow-strong hover:shadow-glow-hover">
                Gerçek Dünyaya Katıl →
              </button>
            </a>
          </div>

          {/* Right - Courses Grid */}
          <div>
            <div className="text-center mb-8">
              <p className="text-accent text-sm uppercase tracking-widest mb-3">
                KURSLARIMIZ
              </p>
              <h3 className="text-2xl font-bold text-white">
                Öğrenmeye Başla
              </h3>
            </div>

            {/* Hexagon-style grid */}
            <div className="relative max-w-md mx-auto">
              <div className="grid grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                    style={{
                      marginTop: index % 3 === 1 ? '2rem' : '0'
                    }}
                  >
                    <div className="relative aspect-square">
                      {/* Hexagon shape using clip-path */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary-dark border-2 border-accent/30 rounded-2xl group-hover:border-accent/60 transition-all duration-300 group-hover:scale-110">
                        <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300 rounded-2xl"></div>

                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                              {course.icon}
                            </div>
                            <p className="text-white/70 text-xs font-medium px-2 leading-tight">
                              {course.name}
                            </p>
                          </div>
                        </div>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-accent/20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/5 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
