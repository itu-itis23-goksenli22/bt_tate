const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=12084509523&text=Pro+üyelik+hakkında+bilgi+almak+istiyorum&type=phone_number&app_absent=0";

export default function WhatsAppSupportButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-green-500/30 border border-white/20 hover:scale-105 transition-transform"
      aria-label="WhatsApp destek hattı"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.78.73 5.51 2.11 7.91L.5 31.5l7.73-2.02C10.55 30.48 13.25 31.5 16 31.5 24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 29.09c-2.5 0-4.94-.66-7.07-1.92l-.51-.3-4.59 1.2 1.23-4.47-.33-.55C3.55 21.3 2.92 18.68 2.92 16 2.92 9.03 9.03 2.92 16 2.92c6.97 0 13.08 6.11 13.08 13.08 0 6.97-6.11 13.09-13.08 13.09z" />
      <path d="M23.2 18.45c-.4-.2-2.35-1.16-2.71-1.3-.36-.13-.62-.2-.88.2-.26.4-1.01 1.3-1.24 1.57-.23.26-.46.3-.86.1-2.35-1.16-3.89-2.07-5.44-4.69-.41-.7.41-.65 1.17-2.18.13-.26.07-.5-.04-.7-.1-.2-.88-2.13-1.21-2.91-.32-.77-.65-.66-.88-.67-.23-.01-.5-.01-.77-.01-.26 0-.7.1-1.06.5-.36.4-1.4 1.37-1.4 3.33s1.43 3.86 1.63 4.13c.2.26 2.82 4.3 6.83 6.02.95.41 1.7.65 2.28.83.96.31 1.82.27 2.51.16.77-.12 2.35-.96 2.68-1.9.33-.94.33-1.74.23-1.9-.1-.16-.36-.26-.77-.46z" />
    </svg>
  );
}
