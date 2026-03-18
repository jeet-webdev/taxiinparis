import Image from "next/image";
import Script from "next/script";

interface HeroSectionProps {
  img?: string | null;
  alt?: string | null;
}
export default function HeroSection({ img, alt }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full">
      {/* Background Image */}
      <Image
        src={img ?? "/assets/images/hero-img.jpeg"}
        alt={alt || "Luxury Car"}
        fill
        priority
        className="
    object-cover object-center
    max-[640px]:!relative
    max-[640px]:!h-[250px]
  "
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-end px-0 md:px-6 py-0 md:py-10">
        <div
          className="
  w-full md:w-[375px] h-[710px]
  rounded-xl
  taxi-calculator
"
        >
          <iframe
            src="https://portail.driverconnect.fr/vtc-fils/template?src=se&tkn=00001_2769650_-1157023572_1772012786065"
            allow="geolocation"
            title="Booking Widget"
            className="w-full md:w-[375px] h-[710px] border-none rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
