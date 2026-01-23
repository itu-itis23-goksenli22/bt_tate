'use client';

import Image from 'next/image';

export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/images/logo/ai-scale-logo.png"
        alt="AI Scale Logo"
        width={48}
        height={48}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}
