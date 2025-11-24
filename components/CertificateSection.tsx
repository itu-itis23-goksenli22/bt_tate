"use client";

import { CHECKOUT_URL } from "@/lib/constants";

export default function CertificateSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary to-primary-light">
      <div className="max-w-6xl mx-auto">
        {/* Certificate Display */}
        <div className="relative mb-12">
          {/* Certificate Image Placeholder */}
          <div className="relative aspect-[16/10] bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl overflow-hidden border-4 border-gold/30 shadow-2xl">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/50"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/50"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold/50"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/50"></div>

            {/* Certificate Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12">
              <div className="text-center max-w-2xl">
                <p className="text-sm md:text-base text-gray-600 mb-4 italic">
                  This certificate is awarded to
                </p>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  [Your Name]
                </h3>
                <div className="border-t-2 border-gold/40 pt-6 mb-6">
                  <p className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                    Certificate Of Graduation
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    THE CERTIFICATE IS AN AWARDED TO
                  </p>
                </div>
                <p className="text-xs md:text-sm text-gray-500 italic mb-8">
                  In recognition of successful completion of the Wealth Creation Master Class Program
                  and has demonstrated the highest degrees of competency and skill to be
                  acknowledged as a professional in their respective industry.
                </p>
                <div className="flex items-center justify-center space-x-8 md:space-x-16">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 pt-2">
                      <p className="text-xs md:text-sm font-semibold text-gray-700">Prof. Michael J.</p>
                      <p className="text-xs text-gray-500">Program Director</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 pt-2">
                      <p className="text-xs md:text-sm font-semibold text-gray-700">Andrew Tate</p>
                      <p className="text-xs text-gray-500">Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom banner */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
              <p className="text-white/80 text-sm md:text-base text-center uppercase tracking-wider font-semibold">
                EARN YOUR DIPLOMA SIGNED BY ANDREW
              </p>
            </div>
          </div>
        </div>

        {/* Description Text */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-6">
            Only when you combine hard work with a world-class toolset, will you have the chance to
            achieve the freedom you've always dreamt of.
          </p>
          <p className="text-white/60 text-base leading-relaxed">
            When you do, a certificate of graduation awaits you.
          </p>
        </div>

        {/* Achievement Checkboxes */}
        <div className="max-w-2xl mx-auto space-y-4 mb-12">
          <div className="flex items-center space-x-4 bg-primary-light/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-base md:text-lg">Grow Your Business to Multi 7 Figures</p>
          </div>
          <div className="flex items-center space-x-4 bg-primary-light/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-base md:text-lg">Join A Network of like-minded students</p>
          </div>
          <div className="flex items-center space-x-4 bg-primary-light/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-base md:text-lg">Become a master of your industry</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary text-lg px-12 py-4 shadow-glow-strong">
              Join The Real World →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
