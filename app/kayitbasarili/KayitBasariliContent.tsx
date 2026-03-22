"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { trackCompleteRegistration, setAdvancedMatching } from "@/lib/meta-pixel";

export default function KayitBasariliContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Değerli Katılımcı";
  const email = searchParams.get("email") || "";
  const [webinarDate, setWebinarDate] = useState<string>("");
  const [webinarDay, setWebinarDay] = useState<string>("");
  const [registrationDate, setRegistrationDate] = useState<string>("");

  useEffect(() => {
    const dayNames = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

    const now = new Date();
    const turkey = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
    const currentHour = turkey.getHours();

    // Seminer her gün 20:00'da. Saat 20:00 geçtiyse yarını göster.
    const eventDate = new Date(turkey);
    if (currentHour >= 20) {
      eventDate.setDate(eventDate.getDate() + 1);
    }
    eventDate.setHours(20, 0, 0, 0);

    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    setWebinarDate(`${day}.${month}.${year}`);
    setWebinarDay(dayNames[eventDate.getDay()]);

    // Registration date (today in Turkey timezone)
    const regDay = String(turkey.getDate()).padStart(2, "0");
    const regMonth = String(turkey.getMonth() + 1).padStart(2, "0");
    const regYear = turkey.getFullYear();
    setRegistrationDate(`${regDay}.${regMonth}.${regYear}`);

    // Advanced Matching — send user data to Meta Pixel
    if (email) {
      const nameParts = name.split(" ");
      setAdvancedMatching({
        em: email,
        fn: nameParts[0] || "",
        ln: nameParts.slice(1).join(" ") || "",
      });
    }
    // Track registration completion with value/currency
    trackCompleteRegistration({
      content_name: "Webinar Kayıt",
      status: "completed",
      value: 1,
      currency: "TRY",
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary via-primary-light to-primary">
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-light" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Success Badge */}
          <div className="mb-4">
            <div className="inline-block bg-gold/20 border-2 border-gold rounded-full p-3 mb-4">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white block">Kaydınız Tamamlandı</span>
            <span className="text-gold block mt-2">{name}!</span>
          </h1>

          <div className="flex items-center justify-center space-x-2 text-white/60 text-sm md:text-base mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            <p>Canlı seminere hoş geldiniz</p>
          </div>

          {/* Email Notification Banner */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-gold/10 border-2 border-gold rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg className="w-8 h-8 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 className="text-xl md:text-2xl font-bold text-gold">
                  Katılım Linkiniz E-posta Adresinize Gönderildi!
                </h2>
              </div>
              <p className="text-white/80 text-base md:text-lg">
                Seminere katılmak için e-posta kutunuzu kontrol edin ve <strong className="text-white">{webinarDate} {webinarDay} saat 20:00{"'"}da</strong> gelen katılım linkine tıklayarak seminere katılın. Spam klasörünü de kontrol etmeyi unutmayın.
              </p>
              {registrationDate && (
                <p className="text-white/50 text-sm mt-3">
                  Kayıt tarihiniz: {registrationDate}
                </p>
              )}
            </div>
          </div>

          {/* Video Section */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative aspect-video bg-primary-light/50 rounded-3xl overflow-hidden border border-gold/30 shadow-[0_0_40px_rgba(251,191,36,0.3)]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/cIbDH0lWMc0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Webinar Details Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-primary-light/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Webinar Detayları
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Tarih</p>
                    <p className="text-white font-semibold text-lg">{webinarDate} {webinarDay && `(${webinarDay})`}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeWidth="2" d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Saat</p>
                    <p className="text-white font-semibold text-lg">20:00 (Türkiye Saati)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Katılım Linki</p>
                    <p className="text-white font-semibold">Email adresinize gönderilecek</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bonus Package CTA */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-primary-light/50 backdrop-blur-lg border border-gold/40 rounded-2xl p-8">
              <div className="mb-6">
                <svg className="w-16 h-16 text-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  500$ Değerinde Bonus Paket
                </h2>
                <p className="text-white/70 mb-6">
                  Yapay Zeka Başlangıç Paketinize hemen erişin
                </p>
              </div>
              <a
                href="https://www.notion.so/Yapay-Zeka-H-zl-Ba-lang-Paketi-2aea3d46179c81f28341ea38e05b15f8?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-gold text-black font-bold text-lg px-12 py-4 rounded-xl shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:shadow-[0_0_60px_rgba(251,191,36,0.5)] hover:brightness-110 transition-all w-full cursor-pointer">
                  Bonus Paketi İndir →
                </button>
              </a>
            </div>
          </div>

          {/* WhatsApp Group CTA */}
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              WhatsApp Grubuna Katıl
            </h3>
            <a
              href="https://chat.whatsapp.com/IEWk7BlPlgL37ngk8Xpu11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-gold text-black font-bold text-lg px-12 py-4 rounded-xl shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:shadow-[0_0_60px_rgba(251,191,36,0.5)] hover:brightness-110 transition-all w-full flex items-center justify-center gap-3 cursor-pointer">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Grubuna Katıl
              </button>
            </a>
          </div>

          {/* Social Media Section */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              Sosyal Medya Hesaplarımızdan Bizi Takip Et
            </h3>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.instagram.com/baturalp.tunali/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center hover:bg-gold/30 hover:scale-110 transition-all"
              >
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@baturalp.tunali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center hover:bg-gold/30 hover:scale-110 transition-all"
              >
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
