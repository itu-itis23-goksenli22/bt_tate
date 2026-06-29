"use client";

import { useEffect, useState } from "react";
import VipEmbeddedCheckout from "@/components/VipEmbeddedCheckout";

// /canli thank-you VIP upsell — embedded checkout (sayfa içi, /katil gibi).
// returnTo = ŞU ANKİ sayfanın kendi URL'i (kişiye özel ?t=...&r=...) →
// ödeme sonrası kullanıcı KENDİ seminer sayfasına döner, sayaç devam eder,
// watch room'a otomatik girer. Kişiye özel link böyle korunur.

const BONUSES = [
  { name: "Manychat Kurulum Rehberi", value: "$497" },
  { name: "AI Automation Kiti", value: "$997" },
  { name: "AI Destekli İş Ölçekleme", value: "$500" },
  { name: "Lifetime Replay Access", value: "$97" },
];

export default function CanliVipBlock() {
  const [returnTo, setReturnTo] = useState("/canli/kayitbasarili");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    setReturnTo("/canli/kayitbasarili" + search);
    const p = new URLSearchParams(search);
    setEmail(p.get("email") || "");
  }, []);

  return (
    <div id="canli-vip-cta" className="w-full max-w-2xl mx-auto mt-16 scroll-mt-20">
      {/* Başlık */}
      <p className="text-center text-white text-lg md:text-2xl font-bold leading-snug mb-2">
        <span className="zk-text-gold-gradient">$2.000+ değerindeki VIP paketi</span>,{" "}
        <span className="underline decoration-gold decoration-2 underline-offset-4">
          sadece bu sayfaya özel
        </span>.
      </p>
      <p className="text-center text-white text-base md:text-xl font-extrabold mb-6">
        Seminere başlamadan, sana bunu{" "}
        <span className="bg-gold text-black px-2 py-0.5 rounded">SADECE $9.90</span>{" "}
        karşılığında veriyoruz.
      </p>

      {/* Değer tablosu */}
      <div className="rounded-2xl border-2 border-dashed border-gold/40 bg-gold/[0.06] p-5 md:p-6 mb-6">
        <h3 className="text-center text-white font-extrabold text-lg md:text-xl mb-4">
          $2.000+ Değer <span className="zk-text-gold-gradient italic">Sadece $9.90</span>
        </h3>
        <ul className="space-y-2.5 mb-4">
          {BONUSES.map((b, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-sm md:text-base">
              <span className="flex items-center gap-2 text-white/90">
                <span className="text-green-500">✅</span> {b.name}
              </span>
              <span className="text-white/40 line-through flex-shrink-0">{b.value}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
          <span className="text-gold font-semibold text-sm md:text-base">Tek Seferlik Yatırımınız:</span>
          <span className="zk-text-gold-gradient font-extrabold text-xl md:text-2xl">Sadece $9.90</span>
        </div>
      </div>

      {/* Embedded checkout — ödeme sonrası returnTo ile kişiye özel sayfaya döner */}
      <VipEmbeddedCheckout
        email={email}
        priceVariant="vip"
        funnelTag="CanliVIP"
        ctaId="canli-vip-embed"
        returnTo={returnTo}
      />

      <p className="text-center text-white/40 text-xs mt-4">
        Tek seferlik ödeme · İstemezsen seminere böyle de katılabilirsin — yukarıdaki sayaç seni otomatik alır.
      </p>
    </div>
  );
}
