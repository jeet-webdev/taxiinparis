

import { Lock, HeadsetMic, Check, AddRoad, PriceChange } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import FeatureCard from "./FeatureCard";
import Section from "@/src/components/common/Ui/Section";

interface CommitmentSectionProps {
  customerService?: string | null;
  fairPrice?: string | null;
  reliableService?: string | null;
  secureBooking?: string | null;
}

export default function CommitmentSection({customerService, fairPrice, reliableService, secureBooking}:CommitmentSectionProps) {
   const features = [
    {
      title: "Secure Booking",
      description: secureBooking,
      icon: <Lock sx={{ fontSize: 32, color: "#E7C27D" }} />,
    },
    {
      title: "Reliable Service",
      description: reliableService,
      icon: <AddRoad sx={{ fontSize: 32, color: "#E7C27D" }} />,
    },
    {
      title: "Fair Price",
      description: fairPrice,
      icon: <PriceChange sx={{ fontSize: 32, color: "#E7C27D" }} />,
    },
    {
      title: "Customer Service",
      description: customerService,
      icon: <HeadsetMic sx={{ fontSize: 32, color: "#E7C27D" }} />,
    },
  ];
  return (
    <Section>
      <Box className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="hidden md:block h-0.5 w-40 bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent" />

          <h2 className="text-4xl md:text-5xl text-[#D4AF6A] font-script">
            Our Commitment to Excellence
          </h2>

          <div className="hidden md:block h-0.5 w-40 bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent" />
        </div>

        {/* 4 Column Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 text-center">
          {features.map((item, index) =>
            item.description ? (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ) : null
          )}
        </div>
      </Box>
    </Section>
  );
}
