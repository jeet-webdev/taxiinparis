"use client";

import { motion } from "framer-motion";
import Section from "@/src/components/common/Ui/Section";
import Image from "next/image";
import Link from "next/link";

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
            className="text-4xl md:text-5xl text-center mb-6 font-script text-[#D4AF6A]"
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
            className="h-[1px] bg-[#D4AF6A] mx-auto mb-1"
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

      <div className="mt-2 flex justify-center gap-6">
        <Link
          href="https://play.google.com/store/apps/details?id=com.vtcParis"
          target="_blank"
        >
          <Image
            src="/assets/images/google-play-store.png"
            alt="Google Play"
            width={170}
            className="transition-transform duration-300 hover:scale-105 cursor-pointer"
            height={55}
          />
        </Link>
        <Link
          href="https://portail.driverconnect.fr/vtc-fils/template?act=storeIos&site=00001_3987058_-1157023572_1730893992059&app=CL&soc=Chauffeur_priv"
          target="_blank"
        >
          <Image
            src="/assets/images/app-store-1.png"
            alt="App Store"
            width={170}
            className="transition-transform duration-300 hover:scale-105 cursor-pointer"
            height={55}
          />
        </Link>
      </div>
    </Section>
  );
}
