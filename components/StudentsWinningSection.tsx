"use client";

import { useState } from "react";
import { CHECKOUT_URL } from "@/lib/constants";
import { getStorageImageUrl } from "@/lib/images";

export default function StudentsWinningSection() {
  // Öğrenci testimonial'ları - image path'leri Supabase'den gelecek
  const testimonials = [
    {
      name: "Mehmet Y.",
      age: "27",
      country: "🇹🇷",
      achievement: "İlk 3 ayda $5,000 kazandı",
      description: "AI Automation Agency kampüsündeki eğitimlerle ilk müşterimi buldum ve şimdi aylık $5000+ kazanıyorum.",
      imagePath: "testimonials/mehmet-y.jpg", // Supabase path
      earnings: "$5K",
      reactions: { fire: 52, money: 21, rocket: 12 }
    },
    {
      name: "Ayşe K.",
      age: "24",
      country: "🇹🇷",
      achievement: "E-Commerce ile ayda $8,500",
      description: "E-Commerce kampüsü sayesinde kendi online mağazamı kurdum. İlk 6 ayda $8,500 kazandım.",
      imagePath: "testimonials/ayse-k.jpg",
      earnings: "$8.5K",
      reactions: { fire: 75, money: 32, rocket: 18 }
    },
    {
      name: "Can D.",
      age: "29",
      country: "🇹🇷",
      achievement: "Crypto Trading ile $12K",
      description: "Crypto Trading kampüsündeki stratejilerle portföyüm 10 kat büyüdü. Hayatım değişti.",
      imagePath: "testimonials/can-d.jpg",
      earnings: "$12K",
      reactions: { fire: 62, money: 45, rocket: 25 }
    },
    {
      name: "Zeynep A.",
      age: "22",
      country: "🇹🇷",
      achievement: "Copywriting ile aylık $6K",
      description: "Copywriting öğrendikten sonra freelance olarak çalışmaya başladım. Evden aylık $6000 kazanıyorum.",
      imagePath: "testimonials/zeynep-a.jpg",
      earnings: "$6K",
      reactions: { fire: 83, money: 48, rocket: 31 }
    },
    {
      name: "Burak M.",
      age: "31",
      country: "🇹🇷",
      achievement: "Content Creation ile $15K",
      description: "Content Creation kampüsü sayesinde sosyal medyadan para kazanmayı öğrendim. İlk yılda $15K.",
      imagePath: "testimonials/burak-m.jpg",
      earnings: "$15K",
      reactions: { fire: 94, money: 67, rocket: 42 }
    },
    {
      name: "Elif S.",
      age: "26",
      country: "🇹🇷",
      achievement: "Freelancing ile 6 ayda $10K",
      description: "Freelancing kampüsündeki eğitimlerle global müşteriler buldum. 6 ayda $10,000'dan fazla kazandım.",
      imagePath: "testimonials/elif-s.jpg",
      earnings: "$10K",
      reactions: { fire: 71, money: 39, rocket: 28 }
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-light to-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-dark rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-widest mb-4">
            GERÇEK DÜNYA KAZANIYOR
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Öğrencilerimiz <span className="text-accent">Kazanıyor</span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            Teknoloji yeni bir endüstriyi devrimleştirdiğinde, Gerçek Dünya bundan nasıl faydalanacağınızı öğretecek ilk ve tek yer olacak.
          </p>
          <p className="text-white/50 text-base mt-4 max-w-2xl mx-auto">
            Öğrencilerimiz her gün saat 8'de en son bilgileri alır.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-trw group hover:border-accent/30 transition-all"
            >
              {/* Image with placeholder */}
              <div className="relative aspect-square bg-primary-dark rounded-lg overflow-hidden mb-4 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary-dark flex items-center justify-center">
                  {/* Placeholder - Supabase image will load here */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-accent/30">
                      <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-white/30 text-xs">
                      Görsel: {testimonial.imagePath}
                    </p>
                  </div>
                  {/* TODO: Replace with actual Supabase image */}
                  {/* <Image src={getStorageImageUrl(testimonial.imagePath)} alt={testimonial.name} fill className="object-cover" /> */}
                </div>

                {/* Earnings badge */}
                <div className="absolute top-4 right-4 bg-accent px-3 py-1 rounded-full">
                  <span className="text-white font-bold text-sm">{testimonial.earnings}</span>
                </div>
              </div>

              {/* User info */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white font-bold">
                    {testimonial.name} {testimonial.country}
                  </p>
                  <p className="text-white/40 text-xs">{testimonial.age} yaş</p>
                </div>
              </div>

              {/* Achievement */}
              <p className="text-accent font-semibold text-sm mb-2">
                {testimonial.achievement}
              </p>

              {/* Description */}
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                "{testimonial.description}"
              </p>

              {/* Reactions */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1 text-orange-400">
                  <span className="text-sm">🔥</span>
                  <span className="text-xs font-medium">{testimonial.reactions.fire}</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <span className="text-sm">💰</span>
                  <span className="text-xs font-medium">{testimonial.reactions.money}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400">
                  <span className="text-sm">🚀</span>
                  <span className="text-xs font-medium">{testimonial.reactions.rocket}</span>
                </div>
                <button className="ml-auto text-white/40 hover:text-white/70 text-xs">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-white/60 text-lg mb-6">
            <span className="text-accent font-semibold">155,000+</span> benzer düşünen öğrenci
          </p>
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary text-lg px-12 py-4 shadow-glow-strong">
              Gerçek Dünyaya Katıl →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
