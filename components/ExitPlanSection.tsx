import { CHECKOUT_URL } from "@/lib/constants";
import Image from "next/image";
import { getStorageImageUrl } from "@/lib/images";

export default function ExitPlanSection() {
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

          {/* Right - MacBook Mockup */}
          <div className="relative">
            {/* MacBook mockup */}
            <div className="relative">
              {/* Screen */}
              <div className="relative bg-gradient-to-br from-primary-light to-primary-dark rounded-t-2xl border-4 border-primary-light shadow-2xl overflow-hidden">
                {/* Screen bezel */}
                <div className="relative aspect-[16/10] bg-black rounded-lg overflow-hidden border-8 border-black">
                  {/* Dashboard Image */}
                  <Image
                    src={getStorageImageUrl("WhatsApp Image 2025-11-24 at 15.52.58.jpeg")}
                    alt="AI SCALE Dashboard"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Camera notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-dark rounded-full"></div>
              </div>

              {/* Base/Bottom */}
              <div className="relative h-6 bg-gradient-to-b from-primary-light to-primary-dark rounded-b-lg shadow-lg">
                {/* Hinge */}
                <div className="absolute inset-x-0 top-0 h-1 bg-primary-dark/50"></div>
              </div>

              {/* Keyboard deck */}
              <div className="relative mx-auto w-[95%] h-3 bg-gradient-to-b from-primary-dark to-primary-light rounded-b-xl shadow-2xl -mt-1">
                {/* Trackpad hint */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary-light/30 rounded-sm"></div>
              </div>

              {/* Shadow underneath */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-accent/10 rounded-full blur-2xl"></div>

              {/* Glow effects */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-dark/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
