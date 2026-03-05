// "use client";
// import { Lock, HeadsetMic, AddRoad, PriceChange } from "@mui/icons-material";
// import { Box } from "@mui/material";
// import FeatureCard from "./FeatureCard";
// import Section from "@/src/components/common/Ui/Section";
// import { motion, Variants } from "framer-motion";

// interface CommitmentSectionProps {
//   title?: string | null;
//   secureBookingTitle?: string | null;
//   reliableServiceTitle?: string | null;
//   fairPriceTitle?: string | null;
//   customerServiceTitle?: string | null;

//   secureBooking?: string | null;
//   reliableService?: string | null;
//   fairPrice?: string | null;
//   customerService?: string | null;
// }

// export default function CommitmentSection({
//   title,
//   secureBookingTitle,
//   reliableServiceTitle,
//   fairPriceTitle,
//   customerServiceTitle,

//   customerService,
//   fairPrice,
//   reliableService,
//   secureBooking,
// }: CommitmentSectionProps) {
//   const containerVariants: Variants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.25,
//       },
//     },
//   };

//   const cardVariants: Variants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };
//   const features = [
//     {
//       title: secureBookingTitle || "Secure Booking",
//       description: secureBooking,
//       icon: <Lock sx={{ fontSize: 32, color: "#E7C27D" }} />,
//     },
//     {
//       title: reliableServiceTitle || "Reliable 1 Service",
//       description: reliableService,
//       icon: <AddRoad sx={{ fontSize: 32, color: "#E7C27D" }} />,
//     },
//     {
//       title: fairPriceTitle || "Fair Price",
//       description: fairPrice,
//       icon: <PriceChange sx={{ fontSize: 32, color: "#E7C27D" }} />,
//     },
//     {
//       title: customerServiceTitle || "Customer Service",
//       description: customerService,
//       icon: <HeadsetMic sx={{ fontSize: 32, color: "#E7C27D" }} />,
//     },
//   ];
//   return (
//     <Section>
//       <Box className="relative max-w-7xl mx-auto z-10">
//         {/* Heading */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           transition={{ staggerChildren: 0.2 }}
//           className="flex items-center justify-center gap-6 mb-16"
//         >
//           <motion.div
//             variants={{
//               hidden: { opacity: 0, scaleX: 0 },
//               visible: { opacity: 1, scaleX: 1 },
//             }}
//             transition={{ duration: 0.6 }}
//             className="hidden md:block h-0.5 w-40 bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent origin-left"
//           />

//           <motion.h2
//             variants={{
//               hidden: { opacity: 0, y: 40 },
//               visible: { opacity: 1, y: 0 },
//             }}
//             transition={{ duration: 0.8 }}
//             // className="w-full text-center text-3xl md:text-4xl text-[#D4AF6A] px-4"
//             className="
//     w-full text-center
//     text-3xl md:text-4xl
//     font-semibold
//     tracking-wide
//     bg-gradient-to-r from-[#D4AF6A] via-[#e2c47c] to-[#D4AF6A]
//     bg-clip-text text-transparent
//     px-4
//     relative
//     drop-shadow-[0_2px_8px_rgba(212,175,106,0.4)]
//   "
//           >
//             {title || " Our Commitment to Excellence "}
//           </motion.h2>

//           <motion.div
//             variants={{
//               hidden: { opacity: 0, scaleX: 0 },
//               visible: { opacity: 1, scaleX: 1 },
//             }}
//             transition={{ duration: 0.6 }}
//             className="hidden md:block h-0.5 w-40 bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent origin-right"
//           />
//         </motion.div>

//         {/* 4 Column Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 text-center"
//         >
//           {features.map((item, index) =>
//             item.description ? (
//               <motion.div key={index} variants={cardVariants}>
//                 <FeatureCard
//                   icon={item.icon}
//                   title={item.title}
//                   description={item.description}
//                 />
//               </motion.div>
//             ) : null,
//           )}
//         </motion.div>
//       </Box>
//     </Section>
//   );
// }

"use client";

import { Box } from "@mui/material";
import FeatureCard from "./FeatureCard";
import Section from "@/src/components/common/Ui/Section";
import { motion, Variants } from "framer-motion";
import { getIconComponent } from "@/src/components/common/utils/iconMap";

interface CommitmentSectionProps {
  title?: string | null;
  secureBookingTitle?: string | null;
  reliableServiceTitle?: string | null;
  fairPriceTitle?: string | null;
  customerServiceTitle?: string | null;

  secureBooking?: string | null;
  reliableService?: string | null;
  fairPrice?: string | null;
  customerService?: string | null;

  // These must match the field names in your database/backend
  secureBookingIcon?: string | null;
  reliableServiceIcon?: string | null;
  fairPriceIcon?: string | null;
  customerServiceIcon?: string | null;
}

export default function CommitmentSection({
  title,
  secureBookingTitle,
  reliableServiceTitle,
  fairPriceTitle,
  customerServiceTitle,
  customerService,
  fairPrice,
  reliableService,
  secureBooking,
  secureBookingIcon,
  reliableServiceIcon,
  fairPriceIcon,
  customerServiceIcon,
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

  // Map the strings to actual components using your utility
  const features = [
    {
      title: secureBookingTitle || "Secure Booking",
      description: secureBooking,
      iconName: secureBookingIcon || "lock",
    },
    {
      title: reliableServiceTitle || "Reliable Service",
      description: reliableService,
      iconName: reliableServiceIcon || "road",
    },
    {
      title: fairPriceTitle || "Fair Price",
      description: fairPrice,
      iconName: fairPriceIcon || "price",
    },
    {
      title: customerServiceTitle || "Customer Service",
      description: customerService,
      iconName: customerServiceIcon || "support",
    },
  ];

  return (
    <Section>
      <Box className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
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
            className="w-full text-center text-3xl md:text-4xl font-semibold tracking-wide bg-gradient-to-r from-[#D4AF6A] via-[#e2c47c] to-[#D4AF6A] bg-clip-text text-transparent px-4 relative drop-shadow-[0_2px_8px_rgba(212,175,106,0.4)]"
          >
            {title || "Our Commitment to Excellence"}
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

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 text-center"
        >
          {features.map((item, index) => {
            // Only render if there is a description
            if (!item.description) return null;

            // Dynamically get the Icon Component based on the string name
            const IconComponent = getIconComponent(item.iconName);

            return (
              <motion.div key={index} variants={cardVariants}>
                <FeatureCard
                  // Pass the actual component with styles
                  icon={
                    <IconComponent sx={{ fontSize: 30, color: "#D4AF6A" }} />
                  }
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Box>
    </Section>
  );
}
