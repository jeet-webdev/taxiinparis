"use client";
import { Lock, HeadsetMic, AddRoad, PriceChange } from "@mui/icons-material";
import { Box } from "@mui/material";
import FeatureCard from "./FeatureCard";
import Section from "@/src/components/common/Ui/Section";
import { motion, Variants } from "framer-motion";

interface CommitmentSectionProps {
  title?: string | null;
  customerService?: string | null;
  fairPrice?: string | null;
  reliableService?: string | null;
  secureBooking?: string | null;
}

export default function CommitmentSection({
  title,
  customerService,
  fairPrice,
  reliableService,
  secureBooking,
}: CommitmentSectionProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: { opacity: 1, scaleX: 1 },
            }}
            transition={{ duration: 0.6 }}
            className="hidden md:block h-0.5 w-40 bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent origin-left"
          />

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl text-[#D4AF6A] font-script"
          >
            {title || " Our Commitment to Excellence "}
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: { opacity: 1, scaleX: 1 },
            }}
            transition={{ duration: 0.6 }}
            className="hidden md:block h-0.5 w-40 bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent origin-right"
          />
        </motion.div>

        {/* 4 Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 text-center"
        >
          {features.map((item, index) =>
            item.description ? (
              <motion.div key={index} variants={cardVariants}>
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ) : null,
          )}
        </motion.div>
      </Box>
    </Section>
  );
}
