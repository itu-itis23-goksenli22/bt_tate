export default function ToolsSection() {
  const tools = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Gerçek Zamanlı Gösterge Paneli",
      description: "İlerlemenizi takip edin, kazançlarınızı izleyin ve hedeflerinize ulaşın. Tüm başarı metrikleriniz tek bir yerde.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Küresel Topluluk Erişimi",
      description: "Dünya çapında binlerce başarılı girişimciyle bağlantı kurun. Ağınızı genişletin ve işbirliği fırsatları yakalayın.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "7/24 Mentor Desteği",
      description: "Uzman mentorlarımız her zaman yanınızda. Sorularınıza hızlı yanıtlar alın ve engelleri aşın.",
    },
  ];

  return (
    <section id="ozellikler" className="py-12 md:py-12 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-[60px]" />
      </div>

      <div className="relative z-10 container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            BÜYÜMENİZİ <span className="text-accent-light">MAKSİMİZE EDECEK ARAÇLAR</span>
          </h2>
          <p className="text-lg md:text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Başarınızı hızlandıracak özel olarak tasarlanmış araçlar ve kaynaklar
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="card-glass group hover:scale-105">
              {/* Image placeholder */}
              <div className="relative aspect-video bg-primary rounded-lg overflow-hidden mb-6 border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-light">
                  <div className="text-accent-light opacity-20 group-hover:opacity-30 transition-opacity">
                    {tool.icon}
                  </div>
                </div>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4 border border-gold/30 group-hover:border-gold transition-colors">
                <div className="text-accent-light">
                  {tool.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent-light transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
