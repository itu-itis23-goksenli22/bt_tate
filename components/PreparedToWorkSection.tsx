import Image from "next/image";
import { getStorageImageUrl } from "@/lib/images";

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
                <span className="text-white font-semibold">Para kazanmak bir beceridir.</span> Diğer her beceri gibi öğrenilebilir ve öğrenilme hızı, onu öğrendiğiniz ortama ve çaba düzeyinize bağlıdır.
              </p>

              <p>
                AI Scale App'de mentörlerinizin size öğrettikleri iş modellerini kullanacaksınız.
              </p>

              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
                <p className="text-white font-semibold mb-2">
                  Koçlarımız öğrettikleri iş modellerini profesyonel bir şekilde aktarır.
                </p>
                <p className="text-white/60 text-sm">
                  Tüm eğitimleri özenle hazırlanır.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Phone mockups */}
          <div className="relative">
            {/* Two phone mockups */}
            <div className="relative flex justify-center items-center gap-4">
              {/* Phone 1 - Behind - Dashboard/Spaces View */}
              <div className="relative aspect-[9/19.5] w-48 bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] border-4 border-primary-light shadow-2xl overflow-hidden transform -rotate-6 translate-x-4">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-primary-dark rounded-b-3xl z-10"></div>

                {/* Screen content - Real Dashboard Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={getStorageImageUrl("WhatsApp Image 2025-11-24 at 15.55.25.jpeg")}
                    alt="AI SCALE Dashboard - Spaces"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Phone 2 - Front - Masterclass Course View */}
              <div className="relative aspect-[9/19.5] w-56 bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] border-4 border-primary-light shadow-2xl overflow-hidden z-10 transform rotate-6 -translate-x-4">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-primary-dark rounded-b-3xl z-10"></div>

                {/* Screen content - Real Course Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={getStorageImageUrl("WhatsApp Image 2025-11-24 at 15.55.25 (1).jpeg")}
                    alt="AI SCALE Masterclass Course"
                    fill
                    className="object-cover"
                  />
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
