'use client';

import Image from 'next/image';
import { getStorageImageUrl } from '@/lib/images';

export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  const logoUrl = getStorageImageUrl('logo.png');

  return (
    <div className={className}>
      <Image
        src={logoUrl}
        alt="AI Scale Logo"
        width={48}
        height={48}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}
