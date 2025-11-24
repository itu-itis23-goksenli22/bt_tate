export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left ring - Green/Gray gradient */}
      <circle
        cx="35"
        cy="55"
        r="18"
        stroke="url(#grad1)"
        strokeWidth="6"
        fill="none"
        opacity="0.9"
      />

      {/* Right ring - Green gradient */}
      <circle
        cx="65"
        cy="55"
        r="18"
        stroke="url(#grad2)"
        strokeWidth="6"
        fill="none"
        opacity="0.9"
      />

      {/* Top ring - Blue/Cyan gradient */}
      <circle
        cx="50"
        cy="35"
        r="18"
        stroke="url(#grad3)"
        strokeWidth="6"
        fill="none"
        opacity="0.9"
      />

      <defs>
        {/* Green to Gray gradient */}
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#6b7280" />
        </linearGradient>

        {/* Green gradient */}
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Blue/Cyan gradient */}
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
