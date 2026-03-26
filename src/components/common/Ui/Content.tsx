"use client";

import { motion } from "framer-motion";
import Section from "@/src/components/common/Ui/Section";
import Image from "next/image";
import Link from "next/link";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";

interface FooterData {
  btnText?: string | null;
  btnLink?: string | null;
}

interface ContentProps {
  data: {
    title?: string | null;
    content?: string | null;
  };
  footerData?: FooterData | null; // ← ADD THIS
}

export default function Content({
  data: { title, content },
  footerData,
}: ContentProps) {
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
            className="text-xl md:text-3xl font-heading font-medium tracking-wide text-center mb-12 text-[#8B6C26]"
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
            className="h-px bg-[#8B6C26] mx-auto mb-4"
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
               text-black
                leading-relaxed
                 [&_h1]:text-4xl
                [&_h1]:font-serif
                [&_h1]:text-[#8a6c26]
                [&_h1]:mt-12
                [&_h1]:mb-6
                [&_h1]:border-b
                [&_h1]:border-[#8a6c26]/30
                [&_h1]:pb-3

             
              [&_h2]:text-3xl
              [&_h2]:font-serif
              [&_h2]:text-[#8B6C26]
              [&_h2]:mt-12
              [&_h2]:mb-6
              [&_h2]:border-b
              [&_h2]:border-[#8B6C26]/30
              [&_h2]:pb-3
              [&_p]:mb-6
              [&_strong]:text-[#8B6C26]
              [&_strong]:font-heading
            
              [&_a]:text-[#8B6C26]
[&_a]:!no-underline
[&_a:hover]:!no-underline
[&_a]:decoration-0
              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_li]:mb-2
            "
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          />
        )}
        {footerData?.btnLink && (
          <Link
            href={footerData.btnLink}
            target="_blank"
            className="btn-primary cstm-navbtn font-logo! mt-8 inline-block"
          >
            {footerData.btnText || "Book Now"}
          </Link>
        )}
      </div>
    </Section>
  );
}
