"use client";
import { Box } from "@mui/material";
import { motion, Variants } from "framer-motion";

interface CommitmentSectionProps {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  heroCard1Title?: string | null;
  heroCard2Title?: string | null;
  heroCard3Title?: string | null;
  ctaButtonText?: string | null;
  heroButtonLink?: string | null;
  highlightText?: string | null;
  heroTrustText?: string | null;
  heroPoint1?: string | null;
  heroPoint2?: string | null;
  heroPoint3?: string | null;
  heroCardFootnote?: string | null;
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
  highlightText,
  heroTrustText,
  heroPoint1,
  heroPoint2,
  heroPoint3,
  heroCardFootnote,
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



const iconPulse = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      repeat: Infinity,
      duration: 1.5,
    },
  },
};


  return (
    <section
      className="relative border-y-2 border-[#8b6c26] py-12"

    >
      <Box className="max-w-378 mx-auto px-6">
        {/* ✅ HEADING SAME MOTION */}
        {/* LEFT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 items-start"
        >
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
              className="text-3xl md:text-3xl italic font-heading text-[#8b6c26] "
            >
              {highlightText || "in Paris"}
            </motion.h2>
            {/* ✅ GRID */}

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
                className="text-xl md:text-2xl font-heading my-4 text-black tracking-wide"
              >
                {subtitle ||
                  "Private Airport Transfer & Premium VTC Services in Paris"}
              </motion.h2>

              <motion.div variants={cardVariants}>
                <p className="text-black font-sans mb-6">
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
          </motion.div>
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

              <span className="text-xl text-[#A88435] lg:text-black ">
                {heroTrustText || "Trusted by international travelers"}
              </span>
            </motion.div>

            {/* small info */}

            <motion.div
              variants={cardVariants}
              className="w-full max-w-xs mx-auto text-start text-black"
            >
              {/* Points */}
              <div className="space-y-1 text-sm leading-relaxed">
                <p>✔ {heroPoint1 || "Fixed price"}</p>
                <p>✔ {heroPoint2 || "No hidden fees"}</p>
                <p>✔ {heroPoint3 || "Instant confirmation"}</p>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center mt-1.5">
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
                    <div key={i} className="flex items-start gap-2 w-35">
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
             {heroCardFootnote || "Experience the best of Paris with us!"}
            </motion.div>
          </motion.div>
        </motion.div>
      </Box>
    </section>
  );
}
