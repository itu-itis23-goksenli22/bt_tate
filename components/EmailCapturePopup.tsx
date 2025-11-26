"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail, Gift } from "lucide-react";

export default function EmailCapturePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem("email_popup_shown");
    console.log('Email popup - checking session storage:', popupShown);

    if (popupShown) {
      console.log('Email popup - already shown, skipping');
      setHasShown(true);
      return;
    }

    console.log('Email popup - setting timer for 15 seconds');

    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      console.log('Email popup - timer fired, showing popup');
      setIsVisible(true);
      setHasShown(true);
      sessionStorage.setItem("email_popup_shown", "true");
    }, 15000); // 15 seconds

    return () => {
      console.log('Email popup - cleanup timer');
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Load GoHighLevel form script in background
    if (isVisible) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name) return;

    setIsSubmitting(true);

    try {
      // Try to submit to hidden iframe form
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        // Send message to iframe to fill form
        iframe.contentWindow.postMessage({
          type: 'ghl_form_submit',
          data: { email, name }
        }, '*');
      }

      // Show success message
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);

        // Close popup after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      }, 1000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
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
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                    🎁 Özel Fırsat!
                  </h3>
                  <p className="text-white/90 text-sm">
                    Kaçırmadan önce bilgilerinizi bırakın
                  </p>
                </div>
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
          <div className="p-6 md:p-8 bg-primary-dark">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2">
                    İsim Soyisim
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-primary border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-white/70 text-sm font-medium mb-2">
                    Email Adresiniz
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-primary border-2 border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!email || !name || isSubmitting}
                  className="w-full bg-gradient-to-r from-accent to-accent-light text-white font-bold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 text-sm uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Gönderiliyor...
                    </span>
                  ) : (
                    "Özel Teklifimi Al 🎁"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-xl mb-2">Teşekkürler! 🎉</h4>
                <p className="text-white/70 text-sm">
                  Özel teklifimizi kısa süre içinde email adresinize göndereceğiz.
                </p>
              </div>
            )}
          </div>

          {/* Hidden iframe for GoHighLevel */}
          <iframe
            ref={iframeRef}
            src="https://api.leadconnectorhq.com/widget/form/QeP4SslzuVTa1nDxRQxg"
            style={{ display: 'none' }}
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
          />

          {/* Footer with urgency message */}
          {!isSuccess && (
            <div className="px-4 md:px-6 pb-4 md:pb-5 bg-primary-dark border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-white/60 text-xs md:text-sm">
                <svg className="w-4 h-4 text-accent-light animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-center">
                  🔥 Sınırlı sayıda! Bilgilerinizi şimdi bırakın
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
