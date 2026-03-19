"use client";

import { Box } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { getIconComponent } from "@/src/components/common/utils/iconMap";
import { VerifiedUser } from "@mui/icons-material";
import { useMemo } from "react";

interface CommitmentSectionProps {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  secureBookingTitle?: string | null;
  reliableServiceTitle?: string | null;
  fairPriceTitle?: string | null;
  customerServiceTitle?: string | null;

  secureBooking?: string | null;
  reliableService?: string | null;
  fairPrice?: string | null;
  customerService?: string | null;

  secureBookingIcon?: string | null;
  reliableServiceIcon?: string | null;
  fairPriceIcon?: string | null;
  customerServiceIcon?: string | null;
}

export default function CommitmentSection({
  title,
  subtitle,
  description,
  secureBookingTitle,
  reliableServiceTitle,
  fairPriceTitle,
  customerServiceTitle,

  secureBooking,
  reliableService,
  fairPrice,
  customerService,

  secureBookingIcon,
  reliableServiceIcon,
  fairPriceIcon,
  customerServiceIcon,
}: Readonly<CommitmentSectionProps>) {
  // ✅ SAME AS BEFORE
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
      title: secureBookingTitle,
      description: secureBooking,
      iconName: secureBookingIcon || "check",
    },
    {
      title: reliableServiceTitle,
      description: reliableService,
      iconName: reliableServiceIcon || "check",
    },
    {
      title: fairPriceTitle,
      description: fairPrice,
      iconName: fairPriceIcon || "check",
    },
    {
      title: customerServiceTitle,
      description: customerService,
      iconName: customerServiceIcon || "check",
    },
  ];

  return (
    <section
      className="relative py-12"
      // style={{
      //   backgroundImage: "url('/assets/bg-1.png')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <Box className="max-w-7xl mx-auto px-6">
        {/* ✅ HEADING SAME MOTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-start "
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7 },
              },
            }}
            className="text-3xl md:text-3xl font-heading text-[#2A2A2A] "
          >
            {title || "Luxury Chauffeur Paris"}
          </motion.h2>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7 },
              },
            }}
            className="text-xl md:text-2xl font-heading my-4 text-gray-600 tracking-wide"
          >
            {subtitle || "Private Transfer & Premium VTC Services in Paris"}
          </motion.h2>
        </motion.div>

        {/* ✅ GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* LEFT */}
          <motion.div variants={cardVariants}>
            <p className="text-gray-500 font-sans mb-6">
              {description ||
                "Travel in comfort, discretion and elegance with our premium chauffeur service in Paris."}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {["24/7 Availability", "Fixed Price", "Discreet Chauffeurs"]
                .slice(0, 3)
                .map((item, i) => {
                  return (
                    <div key={i} className="flex gap-2 items-center">
                      <VerifiedUser sx={{ fontSize: 20, color: "#C9A45C" }} />
                      <span className="text-[#2A2A2A]">{item}</span>
                    </div>
                  );
                })}
            </div>

            <button className="btn-primary font-logo! ">
              Book Your Chauffeur
            </button>
          </motion.div>

          {/* RIGHT FEATURES */}
          <motion.div variants={containerVariants} className="space-y-3">
            {features.map((item, i) => {
              const plainText = useMemo(() => {
                return item?.description?.replace(/<[^>]+>/g, "") ?? "";
              }, [item?.description]);

              // Approximate length check (adjust 250 if needed)
              // const isLongContent = plainText.length > 250;
              if (!item.description) return null;

              const Icon = getIconComponent(item.iconName);

              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="flex gap-4"
                >
                  <Icon sx={{ fontSize: 20, mt: 0.5, color: "#C9A45C" }} />

                  <div>
                    <h4 className="font-heading text-gray-600 text-xl ">
                      {item.title}
                    </h4>

                    <p className="text-sm text-gray-600">{plainText}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Box>
    </section>
  );
}
