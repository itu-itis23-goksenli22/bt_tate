export default function PreparedToWorkSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-light to-primary relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text content */}
          <div>
            {/* Subtitle */}
            <p className="text-accent text-sm uppercase tracking-widest mb-4">
              KENDİNE SOR
            </p>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Sıkı Çalışmaya<br />
              <span className="text-accent">Hazır mısın?</span>
            </h2>

            {/* Description */}
            <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed">
              <p>
                <span className="text-white font-semibold">Para kazanmak bir beceridir.</span> Diğer her beceri gibi öğrenilebilir ve öğrenilme hızı, onu öğrettiğiniz ortama ve çaba düzeyinize bağlıdır.
              </p>

              <p>
                Gerçek Dünya'da multi-milyoner profesörler size öğrettikleri iş modellerini kullanacaksınız.
              </p>

              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
                <p className="text-white font-semibold mb-2">
                  Koçlarımız öğrettikleri iş modellerini kullanır
                </p>
                <p className="text-white/60 text-sm">
                  onların size öğretecekleri hakkında her şeyi bildiklerini nasıl anlamaz.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Phone mockups */}
          <div className="relative">
            {/* Two phone mockups */}
            <div className="relative flex justify-center items-center gap-4">
              {/* Phone 1 - Behind */}
              <div className="relative aspect-[9/19.5] w-48 bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] border-4 border-primary-light shadow-2xl overflow-hidden transform -rotate-6 translate-x-4">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-primary-dark rounded-b-3xl z-10"></div>

                {/* Screen content */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light p-4">
                  <div className="space-y-3 mt-8">
                    {/* Chat message bubbles */}
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-accent/20 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-1.5 bg-white/10 rounded w-full"></div>
                          <div className="h-1.5 bg-white/10 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-accent/20 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-1.5 bg-white/10 rounded w-full"></div>
                          <div className="h-1.5 bg-white/10 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent/10 rounded-2xl p-3 border border-accent/20 ml-auto max-w-[80%]">
                      <div className="space-y-1">
                        <div className="h-1.5 bg-accent/30 rounded w-full"></div>
                        <div className="h-1.5 bg-accent/30 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/10 text-[0.5rem] text-center mt-16">
                    phone1-chat.png
                  </p>
                </div>
              </div>

              {/* Phone 2 - Front */}
              <div className="relative aspect-[9/19.5] w-56 bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] border-4 border-primary-light shadow-2xl overflow-hidden z-10 transform rotate-6 -translate-x-4">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-primary-dark rounded-b-3xl z-10"></div>

                {/* Screen content */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary-dark p-5">
                  <div className="space-y-4 mt-10">
                    {/* Stats card */}
                    <div className="bg-white/5 rounded-2xl p-4 border border-accent/20 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent/40">
                          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div className="text-accent font-bold text-lg">+156%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-white/10 rounded w-full"></div>
                        <div className="h-2 bg-white/10 rounded w-4/5"></div>
                      </div>
                    </div>

                    {/* Progress card */}
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent/40">
                          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-accent/30 rounded-full w-full mb-2">
                            <div className="h-2 bg-accent rounded-full w-3/4"></div>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/10 text-[0.5rem] text-center mt-20">
                    phone2-dashboard.png
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-dark/10 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
