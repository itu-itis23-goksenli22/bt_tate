export default function TrustBadges() {
  const badges = [
    { name: "SSL Güvenli", icon: "🔒" },
    { name: "256-bit Şifreleme", icon: "🛡️" },
    { name: "Güvenli Ödeme", icon: "💳" },
    { name: "14 Gün İade", icon: "✓" },
  ];

  return (
    <div className="py-8 border-y border-white/5">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-white/60 hover:text-white/80 transition-colors"
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-sm font-medium uppercase tracking-wider">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
