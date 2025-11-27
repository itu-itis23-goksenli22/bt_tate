"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, Gift, Rocket } from "lucide-react";

export default function WebinarSuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Değerli Katılımcı";

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary via-primary-light to-primary px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Success Card */}
        <div className="bg-gradient-to-br from-primary-light to-primary-dark rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-accent/30 relative overflow-hidden mb-8">
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
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              🎉 Tebrikler {name}!
            </h1>
            <p className="text-2xl text-accent mb-2 font-bold">
              Webinar Kaydınız Başarıyla Tamamlandı
            </p>
            <p className="text-white/70 text-lg">
              Canlı seminere hoş geldiniz! 🚀
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mb-8"></div>

          {/* Gift Section - 5000$ Notion Paketi */}
          <div className="bg-gradient-to-br from-accent/10 to-accent-dark/10 rounded-2xl p-6 mb-8 border border-accent/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                  🎁 5000$ Değerinde Notion Paketiniz Hazır!
                </h2>
                <p className="text-white/80 text-base mb-2">
                  Size özel olarak hazırladığımız <span className="text-accent font-bold">5000$ Değerinde AI & Freelance Kapsamlı Paketi</span> hemen indirin ve başarıya giden yolculuğunuza başlayın!
                </p>
                <p className="text-accent font-black text-lg">
                  💎 Değer: $5,000 - Sizin İçin TAMAMEN BEDAVA!
                </p>
              </div>
            </div>

            {/* CTA Button - Notion Embedding */}
            <a
              href="https://www.notion.so/Yapay-Zeka-H-zl-Ba-lang-Paketi-2aea3d46179c81f28341ea38e05b15f8?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full bg-gradient-to-r from-accent to-accent-light text-white font-black text-lg py-5 px-8 rounded-xl hover:shadow-glow-strong transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group">
                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                5000$ DEĞERİNDEKİ PAKETİ HEMEN İNDİR! →
              </button>
            </a>
          </div>

          {/* WhatsApp Section */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/20 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-black text-white mb-2">
                💬 WhatsApp Grubuna Katıl!
              </h3>
              <p className="text-white/80">
                Webinar hakkında güncellemeler ve bonus içerikler için WhatsApp grubuna katılın
              </p>
            </div>
            <a
              href="https://chat.whatsapp.com/your-group-link"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WHATSAPP GRUBUNA KATIL
              </button>
            </a>
          </div>

          {/* Video Section */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 text-center">
              📺 Önemli: Bu Videoyu İzleyin!
            </h3>
            <div className="aspect-video bg-primary-light/50 rounded-2xl overflow-hidden border border-accent/30 shadow-glow-strong">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/cIbDH0lWMc0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Webinar Info */}
          <div className="bg-primary/50 rounded-xl p-6 border border-white/10 mb-6">
            <h3 className="text-white font-bold text-xl mb-3 text-center">📅 Webinar Detayları</h3>
            <div className="space-y-2 text-white/70">
              <p className="text-center">
                <span className="text-accent font-semibold">Tarih:</span> Her Salı ve Pazar
              </p>
              <p className="text-center">
                <span className="text-accent font-semibold">Saat:</span> 20:00 (Türkiye Saati)
              </p>
              <p className="text-center text-sm">
                Katılım linki email adresinize gönderilecektir
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-white/60 mb-4">Bizi takip edin:</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/baturalp.adonis/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@baturalp.adonis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a
                href="https://chat.whatsapp.com/your-group-link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center">
          <p className="text-white/40 text-sm">
            AI Scale ile başarıya giden yolculuğunuz başladı 🚀
          </p>
        </div>
      </div>
    </main>
  );
}
