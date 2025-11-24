'use client';

import Image from 'next/image';
import { getStorageImageUrl } from '@/lib/images';

export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  const logoUrl = getStorageImageUrl('logo.png');

  return (
    <Image
      src={logoUrl}
      alt="Logo"
      width={36}
      height={36}
      className={className}
      priority
    />
  );
}
