import Image from "next/image";
import { getStorageImageUrl } from "@/lib/images";

export default function KendineSorSection() {
  return (
    <section className="py-16 px-4 bg-primary relative">
      <div className="max-w-7xl mx-auto">
        {/* Image with fade edges */}
        <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden">
          <Image
            src={getStorageImageUrl("kendinesor.jpg")}
            alt="Kendine Sor"
            fill
            className="object-cover"
            priority
          />

          {/* Fade to transparent edges - all sides */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to right, rgba(10,10,10,1) 0%, transparent 15%, transparent 85%, rgba(10,10,10,1) 100%),
                linear-gradient(to bottom, rgba(10,10,10,1) 0%, transparent 15%, transparent 85%, rgba(10,10,10,1) 100%)
              `
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
