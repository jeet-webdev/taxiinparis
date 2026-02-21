// HeroSection.tsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] w-full">
      <Image
        src="/images/hero.jpg"
        alt="Luxury Car"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center justify-end px-6">
        {/* <BookingCard /> */}
      </div>
    </section>
  );
}