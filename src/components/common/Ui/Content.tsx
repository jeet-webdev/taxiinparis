"use client";

import { motion } from "framer-motion";
import Section from "@/src/components/common/Ui/Section";
import Image from "next/image";
import Link from "next/link";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";

interface ContentProps {
  data: {
    title?: string | null;
    content?: string | null;
  };
}

export default function Content({ data: { title, content } }: ContentProps) {
  return (
    <Section>
      <div className="max-w-5xl mx-auto px-6 py-2">
        {/* Animated Title */}
        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-4xl text-center mb-6  text-[#D4AF6A]"
          >
            {title}
          </motion.h1>
        )}

        {/* Elegant Divider Animation */}
        {title && (
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-px bg-[#D4AF6A] mx-auto mb-4"
          />
        )}

        {/* Animated Content */}
        {content && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="
              text-gray-300
              leading-relaxed
              [&_h2]:text-3xl
              [&_h2]:font-serif
              [&_h2]:text-[#D4AF6A]
              [&_h2]:mt-12
              [&_h2]:mb-6
              [&_h2]:border-b
              [&_h2]:border-[#D4AF6A]/30
              [&_h2]:pb-3
              [&_p]:mb-6
              [&_strong]:text-[#D4AF6A]
              [&_a]:text-[#D4AF6A]
              [&_a]:no-underline
              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_li]:mb-2
            "
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          />
        )}
      </div>
    </Section>
  );
}
