// app/(marketing)/components/commitment/CommitmentSection.tsx

import { Lock, CheckCircle, HeadsetMic } from "@mui/icons-material";
import Section from "./Section";
import { Container, Typography } from "@mui/material";
import FeatureCard from "./FeatureCard";

export default function CommitmentSection() {
  return (
    <Section>
      <Container>
        {/* Top Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C8A96A]/40 to-transparent mb-16" />

        {/* Heading */}
        <Typography
          variant="h2"
          component="h2"
          className="text-center text-[#C8A96A] mb-12"
        >
          Our Commitment to Excellence
        </Typography>

        {/* 3 Column Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Vertical Dividers (desktop only) */}
          <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-px bg-[#C8A96A]/20" />
          <div className="hidden lg:block absolute left-2/3 top-0 bottom-0 w-px bg-[#C8A96A]/20" />

          <FeatureCard
            icon={<Lock sx={{ fontSize: 36, color: "#C8A96A" }} />}
            title="Secure Booking"
            description="When you are willing to know about the services we have, it is necessary to contact us first. This is the ultimate benefit for customers to know about the whole services and process."
          />

          <FeatureCard
            icon={<CheckCircle sx={{ fontSize: 36, color: "#C8A96A" }} />}
            title="Reliable Service"
            description="When comfort comes after quality, it depends on how one is meeting his necessity. We assure you the most reliable and professional chauffeurs."
          />

          <FeatureCard
            icon={<HeadsetMic sx={{ fontSize: 36, color: "#C8A96A" }} />}
            title="Customer Service"
            description="Business is not about money. It is about customers and satisfaction. We are committed to delivering excellence every time."
          />
        </div>

        {/* Bottom Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C8A96A]/40 to-transparent mt-20" />
      </Container>
    </Section>
  );
}
