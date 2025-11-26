"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EmailCapturePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem("email_popup_shown");
    if (popupShown) {
      setHasShown(true);
      return;
    }

    // Show popup after 2 minutes (120000ms)
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShown(true);
      sessionStorage.setItem("email_popup_shown", "true");
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load GoHighLevel form script
    if (isVisible && !hasShown) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isVisible, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-fadeIn"
        onClick={handleClose}
      />

      {/* Popup container - left-center position */}
      <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[70] w-[calc(100%-2rem)] md:w-[450px] max-w-[95vw] animate-slideInLeft">
        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-dark border-2 border-accent/40 rounded-2xl shadow-2xl shadow-accent/20 overflow-hidden">
          {/* Header with close button */}
          <div className="relative bg-gradient-to-r from-accent to-accent-light p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                  🎁 Özel Fırsat Sizi Bekliyor!
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  Son şansınız! Email adresinizi bırakın, size özel teklifimizi gönderelim.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="ml-3 flex-shrink-0 text-white/80 hover:text-white hover:rotate-90 transition-all duration-300 p-1 hover:bg-white/10 rounded-lg"
                aria-label="Kapat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Animated pulse effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent animate-pulse pointer-events-none" />
          </div>

          {/* Form container */}
          <div className="p-4 md:p-6 bg-primary-dark">
            {/* GoHighLevel Form Embed */}
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/QeP4SslzuVTa1nDxRQxg"
              style={{
                width: '100%',
                height: '368px',
                border: 'none',
                borderRadius: '10px',
              }}
              id="popup-QeP4SslzuVTa1nDxRQxg"
              data-layout='{"id":"POPUP"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Low Ticket Mail Alma"
              data-height="368"
              data-layout-iframe-id="popup-QeP4SslzuVTa1nDxRQxg"
              data-form-id="QeP4SslzuVTa1nDxRQxg"
              title="Low Ticket Mail Alma"
              className="bg-white rounded-xl"
            />
          </div>

          {/* Footer with urgency message */}
          <div className="px-4 md:px-6 pb-4 md:pb-5 bg-primary-dark border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs md:text-sm">
              <svg className="w-4 h-4 text-accent-light animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <p className="text-center">
                Bu fırsat sınırlı sayıda! Şimdi email bırakın, kaçırmayın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
