// TestimonialsSection.tsx

import Image from "next/image";

import TestimonialCard from "./TestimonialCard";
import Section from "./Section";
import { Container, Typography } from "@mui/material";

export default function TestimonialsSection() {
  return (
    <Section>
      <Container >
        
        {/* Top Divider (optional for continuity) */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C8A96A]/40 to-transparent mb-16" />

       <Typography variant="h2" component="h2" className="text-center text-[#C8A96A] mb-12">
          What Our Customers Say
        </Typography>

      
          <TestimonialCard
            quote="Excellent service, always right on time."
            author="Jose Coll C"
          />

        {/* App Badges */}
        <div className="mt-16 flex justify-center gap-6">
          <Image
            src="/badges/google-play.png"
            alt="Google Play"
            width={160}
            height={50}
          />
          <Image
            src="/badges/app-store.png"
            alt="App Store"
            width={160}
            height={50}
          />
        </div>

        {/* Phone */}
        <div className="mt-10 text-[#C8A96A] text-2xl font-semibold text-center">
          +33 1 76 44 33 00
        </div>

        {/* Bottom Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C8A96A]/40 to-transparent mt-20" />

      </Container>
    </Section>
  );
}