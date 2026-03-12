"use client";

import { useState } from "react";

export default function IbanSection() {
  const [copied, setCopied] = useState(false);

  const copyIban = () => {
    navigator.clipboard.writeText("TR60 0010 3000 0000 0052 0583 71");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-10 md:py-14 bg-primary border-t border-white/10">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="text-3xl mb-3">🏦</div>
          <h3 className="text-white font-bold text-lg md:text-xl mb-2">
            Havale / EFT ile Ödeme
          </h3>
          <p className="text-white/60 text-sm mb-5">
            Ödemede sıkıntı yaşıyorsanız, aşağıdaki IBAN&apos;a
            havale / EFT yapabilirsiniz.
          </p>

          <div className="bg-black/30 rounded-xl p-4 md:p-5 mb-4 text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="text-white/50 text-sm min-w-[80px]">IBAN:</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono text-sm md:text-base font-semibold tracking-wide">
                  TR60 0010 3000 0000 0052 0583 71
                </span>
                <button
                  onClick={copyIban}
                  className="text-white/40 hover:text-white transition-colors flex-shrink-0"
                  title="IBAN Kopyala"
                >
                  {copied ? (
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="text-white/50 text-sm min-w-[80px]">
                Ad Soyad:
              </span>
              <span className="text-white font-semibold text-sm md:text-base">
                Baturalp Tunalı
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="text-white/50 text-sm min-w-[80px]">
                Tutar:
              </span>
              <span className="text-gold font-bold text-sm md:text-base">
                ₺15,000
              </span>
            </div>
          </div>

          <p className="text-white/50 text-xs md:text-sm mb-4">
            Açıklamaya{" "}
            <span className="text-white font-semibold">
              adınızı ve telefon numaranızı
            </span>{" "}
            yazın, size hemen ulaşalım.
          </p>

          <a
            href="https://wa.me/12084509523?text=Merhaba%2C%20havale%20ile%20%C3%B6deme%20yapmak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp&apos;tan Hemen Ulaşın
          </a>
        </div>
      </div>
    </section>
  );
}
