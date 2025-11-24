"use client";

import { CHECKOUT_URL } from "@/lib/constants";
import Image from "next/image";
import { getStorageImageUrl } from "@/lib/images";

export default function UrgencySection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-light to-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-dark/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-wider mb-3">ZAMAN KAYBEDEMEZSİNİZ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bu Sizin <span className="text-accent">Son Şansınız</span>
          </h2>
        </div>

        {/* Two Column Layout: Phone + List */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Phone Mockup */}
          <div className="relative flex justify-center">
            <div className="relative aspect-[9/19.5] max-w-sm w-full bg-gradient-to-br from-primary-light to-primary-dark rounded-[3rem] border-8 border-primary-light shadow-2xl overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-primary-dark rounded-b-3xl z-10"></div>

              {/* Screen content - Dashboard Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={getStorageImageUrl("WhatsApp Image 2025-11-24 at 15.55.25.jpeg")}
                  alt="AI SCALE Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-dark/10 rounded-full blur-xl"></div>
          </div>

          {/* Right - Numbered List */}
          <div className="space-y-8">
            {/* Item 1 */}
            <div className="relative pl-20">
              <div className="absolute left-0 top-0 w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border-2 border-accent/30">
                <span className="text-3xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Zamanınız<br />Tükeniyor
              </h3>
              <p className="text-white/70 leading-relaxed mb-3">
                Dünya 2025'te sonsuza kadar değişecek. Sizi <span className="text-white font-semibold">tuzağa düşürmek</span> için yeni yollar geliştiriyorlar.
              </p>
              <p className="text-white/60 text-sm mb-2">
                Hazırlanmak için ne yaptınız?
              </p>
              <p className="text-white font-semibold">
                Anlamalısınız, şimdi ya da asla.
              </p>
            </div>

            {/* Item 2 */}
            <div className="relative pl-20">
              <div className="absolute left-0 top-0 w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border-2 border-accent/30">
                <span className="text-3xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Yaklaşan AI<br />Devrimi
              </h3>
              <p className="text-white/70 leading-relaxed mb-3">
                İşinize uygulayabileceğiniz bir iksir olduğunu hayal edin.
              </p>
              <p className="text-white/60 text-sm mb-2">
                Ve bu <span className="text-white font-semibold">BİR GECEDE çıktınızı 10 kat artırıyor.</span>
              </p>
              <p className="text-white/70 leading-relaxed">
                Siz UYURKEN bir robot sizin için para kazanabilir... Ama siz harekete geçmemeyi seçtiniz.
              </p>
            </div>

            {/* Item 3 */}
            <div className="relative pl-20">
              <div className="absolute left-0 top-0 w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border-2 border-accent/30">
                <span className="text-3xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Bir Beceri<br />Öğrenmelisiniz
              </h3>
              <p className="text-white/70 leading-relaxed mb-3">
                Sadece hayal edin...
              </p>
              <p className="text-white/60 text-sm mb-2">
                Kendinize yatırım yaptığınızda açılan kapılar—daha yüksek gelir, daha fazla özgürlük ve istediğiniz hayatı yaratma yeteneği.
              </p>
              <p className="text-white font-semibold">
                Başarının sizi bulmasını beklemeyin. <span className="text-accent">Kontrolü elinize alın.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary text-lg px-12 py-4 shadow-glow-strong hover:shadow-glow-hover">
              Gerçek Dünyaya Katıl →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
