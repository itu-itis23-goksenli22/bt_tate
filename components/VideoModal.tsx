"use client";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  videoUrl?: string;
}

export default function VideoModal({ isOpen, onClose, videoTitle, videoUrl }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
      >
        <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal content */}
      <div className="relative w-full max-w-5xl aspect-video bg-primary-light rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl shadow-accent/20 animate-scaleIn">
        {videoUrl ? (
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src={videoUrl}
            title={videoTitle}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent/50">
                <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{videoTitle}</h3>
              <p className="text-white/60 text-sm">Video yakında eklenecek</p>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      <div
        onClick={onClose}
        className="absolute inset-0 -z-10"
      />
    </div>
  );
}
