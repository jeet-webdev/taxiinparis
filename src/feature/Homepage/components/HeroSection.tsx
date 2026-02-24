import Image from "next/image";

interface HeroSectionProps {
  img?: string | null;
}
export default function HeroSection({img}: HeroSectionProps) {
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
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center justify-end px-6 py-10">
        {/* Widget Container */}
        <div
          className="
    w-full
    max-w-100
    h-130
            sm:h-145
            md:h-172.5
    max-h-172.5
    rounded-2xl
    overflow-hidden
    shadow-[0_20px_50px_rgba(0,0,0,0.5)]
    border border-white/10
    bg-white
    relative
  "
        >
          {/* Iframe Adjustment */}
          <iframe
            src="https://portail.driverconnect.fr/vtc-fils/template?src=se&tkn=00001_3739617_-1157023572_1769256160266"
            name="driver-widget-frame"
            id="driver-widget-frame"
            allow="geolocation"
            title="Booking Widget"
            className="w-full h-full border-none"
            style={{
              display: "block",
              overflow: "hidden",
            }}
          />
        </div>
      </div>
    </section>
  );
}
