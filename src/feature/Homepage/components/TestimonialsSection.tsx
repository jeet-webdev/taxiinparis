// TestimonialsSection.tsx

import Image from "next/image";

import TestimonialCard from "./TestimonialCard";
import { Container, Typography } from "@mui/material";
import Section from "@/src/components/common/Ui/Section";

export default function TestimonialsSection() {
  return (
    <Section>
      <Container className="relative z-10 py-2 text-center">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent mb-8" />
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="hidden md:block h-0.5 w-40 bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent" />
          <h2 className="text-4xl md:text-[42px] text-white">Testimonials</h2>
          <div className="hidden md:block h-0.5 w-40 bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent" />
        </div>

        {/* Testimonial Card */}
        <TestimonialCard
          quote="Excellent service, always right on time. I traveled with my parents (two old persons), and used the service three times during a week in Paris. The driver always placed all the luggage in and out and helped them with the doors."
          author="Jose Coll C"
        />

        {/* App Badges */}
        <div className="mt-8 flex justify-center gap-6">
          <Image
            src="/assets/images/google-play-store.png"
            alt="Google Play"
            width={170}
            height={55}
          />
          <Image
            src="/assets/images/app-store-1.png"
            alt="App Store"
            width={170}
            height={55}
          />
        </div>

        {/* Phone */}
        <div className="mt-0.5 text-[#D4AF6A] text-2xl font-semibold tracking-widest">
          +33 1 76 44 33 00
        </div>
      </Container>
    </Section>
  );
}
