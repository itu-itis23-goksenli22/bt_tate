"use client";

import { useState } from "react";
import { CHECKOUT_URL } from "@/lib/constants";

export default function EmailFormSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect directly to checkout
    window.open(CHECKOUT_URL, '_blank');
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-primary-light to-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="text-center mb-10">
            <h2 className="section-title mb-6">
              <span className="text-accent-light">ÜCRETSİZ</span> SEMİNERE KATIL
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-4">
              AI ile para kazanmanın sırlarını öğren. İlk adımı at.
            </p>
            <p className="text-sm md:text-base text-white/60">
              Email adresini bırak, ücretsiz seminere katıl.
            </p>
          </div>

          {/* Form */}
          <div className="card-glass !p-8 md:!p-10 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email adresinizi girin"
                  required
                  className="w-full px-6 py-4 bg-primary border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-all duration-300 text-base"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full !py-4 !text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Kaydediliyor..." : "Ücretsiz Erişim Kazan"}
              </button>

              {message && (
                <div className="text-center text-accent-light text-sm font-medium animate-fadeIn">
                  {message}
                </div>
              )}

              <p className="text-center text-white/40 text-xs">
                Kaydolarak, şartlar ve koşulları kabul etmiş olursunuz.
              </p>
            </form>
          </div>

          {/* Trust elements */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-light mb-1">10K+</div>
              <div className="text-xs md:text-sm text-white/60">Öğrenci</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-accent-light mb-1">6+</div>
              <div className="text-xs md:text-sm text-white/60">Modül</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-light mb-1">24/7</div>
              <div className="text-xs md:text-sm text-white/60">Destek</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
