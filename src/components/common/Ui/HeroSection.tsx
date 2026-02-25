import Image from "next/image";
import Script from "next/script";

interface HeroSectionProps {
  img?: string | null;
}
export default function HeroSection({ img }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full">
      {/* Background Image */}
      <Image
        src={img ?? "/assets/images/hero-img.jpeg"}
        
        alt="Luxury Car"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col md:flex-row items-center justify-end px-4 md:px-6 py-6 md:py-10">
        <div
          className="
      w-full
      taxi-calculator
      max-w-md
      h-[85vh] 
      md:h-[690px]
      rounded-2xl
      overflow-hidden
      shadow-[0_20px_50px_rgba(0,0,0,0.5)]
      border border-white/10
      bg-white
      relative
    "
        >
          <iframe
            src="https://portail.driverconnect.fr/vtc-fils/template?src=se&tkn=00001_3739617_-1157023572_1769256160266"
            allow="geolocation"
            title="Booking Widget"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </section>
  );
}
