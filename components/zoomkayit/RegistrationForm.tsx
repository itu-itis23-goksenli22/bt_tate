"use client";

import { useState } from "react";
import RegistrationModal from "./RegistrationModal";

export default function RegistrationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="max-w-md mx-auto px-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="zk-btn-cta w-full py-4 md:py-5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-bold text-xl md:text-2xl rounded-lg hover:brightness-110 transition-all cursor-pointer"
        >
          EVET! YERİMİ AYIRT
        </button>

        {/* Urgency section */}
        <div className="mt-6 text-center">
          <p className="text-danger font-semibold text-sm tracking-wide mb-3">
            DİKKAT: SINIRLI KONTENJAN
          </p>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div className="zk-progress-fill h-full bg-gradient-to-r from-danger via-orange-500 to-gold rounded-full" />
          </div>
          <p className="text-white/50 text-xs mt-2">
            Kontenjanın %78&apos;i doldu
          </p>
        </div>
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
