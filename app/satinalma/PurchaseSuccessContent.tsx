"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, Gift, Rocket, Clock } from "lucide-react";

export default function PurchaseSuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Değerli Üyemiz";

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary via-primary-light to-primary flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-gradient-to-br from-primary-light to-primary-dark rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-accent/30 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-dark/10 rounded-full blur-3xl -z-10"></div>

          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center shadow-glow animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              {/* Pulse animation */}
              <div className="absolute inset-0 w-24 h-24 bg-accent/30 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🎉 Tebrikler {name}!
            </h1>
            <p className="text-xl text-accent mb-2 font-semibold">
              Satın Alma İşleminiz Başarıyla Tamamlandı
            </p>
            <p className="text-white/70 text-lg">
              AI Scale ailesine hoş geldiniz! 🚀
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mb-8"></div>

          {/* Gift Section */}
          <div className="bg-gradient-to-br from-accent/10 to-accent-dark/10 rounded-2xl p-6 mb-8 border border-accent/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  🎁 Özel Hediyeniz Hazır!
                </h2>
                <p className="text-white/80 text-base">
                  Size özel olarak hazırladığımız <span className="text-accent font-semibold">Yapay Zeka Başlangıç Paketi</span>'ni hemen indirin ve AI dünyasına adım atın!
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full bg-gradient-to-r from-accent to-accent-light text-white font-bold py-4 px-8 rounded-xl hover:shadow-glow-strong transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group">
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Yapay Zeka Başlangıç Paketini Al →
              </button>
            </a>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* Platform Access */}
            <div className="bg-primary/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Platform Erişimi</h3>
                  <p className="text-white/60 text-sm">
                    En kısa sürede eğitim platformuna ekleneceksiniz
                  </p>
                </div>
              </div>
            </div>

            {/* Email Notification */}
            <div className="bg-primary/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Bildirimi</h3>
                  <p className="text-white/60 text-sm">
                    Giriş bilgileriniz email'inize gönderilecek
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center bg-primary/30 rounded-xl p-4 border border-white/5">
            <p className="text-white/60 text-sm">
              Herhangi bir sorunuz mu var?{" "}
              <a href="mailto:info@aiscale.app" className="text-accent hover:text-accent-light underline">
                info@aiscale.app
              </a>
              {" "}adresinden bize ulaşabilirsiniz.
            </p>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-xs">
              AI Scale ile başarıya giden yolculuğunuz başladı 🚀
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-sm">
            Bu sayfa sadece satın alma işlemi sonrası erişilebilir
          </p>
        </div>
      </div>
    </main>
  );
}
