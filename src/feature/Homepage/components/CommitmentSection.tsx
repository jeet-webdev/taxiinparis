"use client";
import { Box } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { getIconComponent } from "@/src/components/common/utils/iconMap";

interface CommitmentSectionProps {
  title?: string | null;
  subtitle?: string | null;
  highlightText?: string | null;
  heroPoint1?: string | null;
  heroPoint2?: string | null;

  heroCardFootnote?: string | null;
  heroPoint3?: string | null;
  heroTrustText?: string | null;
  description?: string | null;
  ctaButtonText?: string | null;
  heroButtonLink?: string | null;
  secureBookingTitle?: string | null;
  reliableServiceTitle?: string | null;
  fairPriceTitle?: string | null;
  customerServiceTitle?: string | null;
  heroCard1Title?: string | null;
  heroCard2Title?: string | null;
  heroCard3Title?: string | null;
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
  heroCard1Title,
  heroCard2Title,
  heroCard3Title,
  ctaButtonText,
  heroButtonLink,
  heroCardFootnote,
  secureBookingTitle,
  reliableServiceTitle,
  fairPriceTitle,
  customerServiceTitle,
  highlightText,
  secureBooking,
  reliableService,
  fairPrice,
  heroTrustText,
  heroPoint1,
  heroPoint2,
  heroPoint3,
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
      className="relative border-y-2 border-[#8b6c26] py-12"
      // style={{
      //   backgroundImage: "url('/assets/bg-1.jpg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <Box className="max-w-378 mx-auto px-6">
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
            className="text-3xl md:text-3xl italic font-heading text-[#C6A85A] "
          >
            {highlightText || "in Paris"}
          </motion.h2>
          {/* ✅ GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-30 items-start"
          >
            <motion.div>
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
                {subtitle ||
                  "Private Airport Transfer & Premium VTC Services in Paris"}
              </motion.h2>

              <motion.div variants={cardVariants}>
                <p className="text-gray-500 font-sans mb-6">
                  {description ||
                    "Travel in comfort, discretion and elegance with our premium chauffeur service in Paris."}
                </p>

                <button
                  className="btn-primary font-logo! "
                  onClick={() => {
                    if (heroButtonLink) {
                      window.location.href = heroButtonLink;
                    }
                  }}
                >
                  {ctaButtonText || "Book Your Chauffeur"}
                </button>
              </motion.div>
            </motion.div>
            {/* RIGHT TRUST BLOCK */}
            <motion.div
              variants={containerVariants}
              className="space-y-4 border-3 lg:p-4 p-2  border-[#8b6c26] rounded-xl  text-[#2A2A2A]"
            >
              {/* Stars */}
              <motion.div
                variants={cardVariants}
                className="flex items-start lg:items-center gap-2"
              >
                <span className="text-[#A88435] text-xl">★★★★★</span>

                <span className="text-xl text-[#A88435] lg:text-gray-600 ">
                  {heroTrustText || "Trusted by international travelers"}
                </span>
              </motion.div>

              {/* small info */}

              <motion.div
                variants={cardVariants}
                className="w-full max-w-xs mx-auto text-start text-gray-600"
              >
                {/* Points */}
                <div className="space-y-2 text-sm leading-relaxed">
                  <p>✔ {heroPoint1 || "Fixed price"}</p>
                  <p>✔ {heroPoint2 || "No hidden fees"}</p>
                  <p>✔ {heroPoint3 || "Instant confirmation"}</p>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center mt-4">
                  <div className="h-px bg-[#A88435] flex-1"></div>

                  {/* Diamond */}
                  <div className="mx-2 text-[#A88435] text-xs">◆</div>

                  <div className="h-px bg-[#A88435] flex-1"></div>
                </div>
              </motion.div>

              {/* icons row */}
              <motion.div
                variants={cardVariants}
                className="flex flex-wrap gap-2 mt-3"
              >
                {[
                  { title: heroCard1Title },
                  { title: heroCard2Title },
                  { title: heroCard3Title },
                ]
                  .slice(0, 3)
                  .map((item, i) => {
                    if (!item.title) return null;

                    return (
                      <div key={i} className="flex items-start gap-2 w-[140px]">
                        <span className="text-sm text-black-500 leading-tight">
                          {item.title}
                        </span>
                      </div>
                    );
                  })}
              </motion.div>

              {/* bottom text */}
              <motion.div
                variants={cardVariants}
                className="text-lg text-center border-t text-black-500 py-2"
              >
                We use Mercedes & luxury vehicles only.
              </motion.div>
            </motion.div>
          </motion.div>

          {/* LEFT */}
        </motion.div>
      </Box>
    </section>
  );
}
