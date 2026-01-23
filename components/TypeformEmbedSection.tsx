"use client";

import { useEffect, useRef } from "react";

export default function TypeformEmbedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the Typeform div
    const typeformDiv = document.createElement("div");
    typeformDiv.setAttribute("data-tf-live", "01K42GWRXQRVTSYFMQ2B8F2Y61");
    containerRef.current.appendChild(typeformDiv);

    // Load the Typeform script
    const script = document.createElement("script");
    script.src = "https://embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      const existingScript = document.querySelector('script[src="https://embed.typeform.com/next/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="pricing-card" className="py-12 px-4 bg-gradient-to-b from-primary-light to-primary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            HEMEN <span className="text-accent-light">BAŞLA</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto min-h-[600px]" ref={containerRef}>
          {/* Typeform will be loaded here dynamically */}
        </div>
      </div>
    </section>
  );
}
