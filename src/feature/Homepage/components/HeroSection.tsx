// // HeroSection.tsx
// import Image from "next/image";

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-screen h-[100dvh] w-full">
//       <Image
//         src="/assets/images/nighttime-taxi-scene-stockcake.webp"
//         alt="Luxury Car"
//         fill
//         priority
//         className="object-cover"
//       />

// <div className="absolute inset-0 bg-black/50" />

// {/* Right Side Widget */}
// <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center justify-end px-6">
// <div
//   className="
//     w-full
//     max-w-[375px]
//     h-[85vh]
//     max-h-[710px]
//     rounded-2xl
//     overflow-hidden
//     shadow-2xl
//     border
//     border-black/20
//     bg-white
//   "
// >
//     <iframe
//       src="https://portail.driverconnect.fr/vtc-fils/template?src=se&tkn=00001_3739617_-1157023572_1769256160266"
//       name="driver-widget-frame"
//       id="driver-widget-frame"
//       allow="geolocation"
//       className="w-full h-full"
//       scrolling="no"
//     />
//   </div>
// </div>
//     </section>
//   );
// }
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen h-[100dvh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/nighttime-taxi-scene-stockcake.webp"
        alt="Luxury Car"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center justify-end px-6 py-10">
      
        {/* Widget Container */}
        <div
          className="
            w-full
            max-w-[400px] 
            h-[90vh]
            max-h-[750px]
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
                display: 'block',
                overflow: 'hidden' 
            }}
           
          />
        </div>
      </div>
    </section>
  );
}