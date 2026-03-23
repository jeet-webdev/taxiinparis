// TestimonialsSection.tsx

import Image from "next/image";
import { prisma } from "@/src/lib/prisma";
// import TestimonialCard from "./TestimonialCard";
import { Container } from "@mui/material";
import Section from "@/src/components/common/Ui/Section";
import Link from "next/link";
// import WhyChooseUsSection from "@/src/app/(public)/features/page";
import WhyChooseUsSection from "@/src/app/(public)/features/page";
import TestimonialCard from "./TestimonialCard";
type AppLink = {
  url: string;
  platform: "google_play" | "app_store";
  isVisible: boolean;
};
export default async function TestimonialsSection() {
  const footer = await prisma.footer.findFirst();
  const features = await prisma.feature.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });
  const appLinks = (footer?.appLinks as AppLink[]) || [];

  const visibleLinks = appLinks.filter((app) => app.isVisible);
  return (
    <Section>
      <WhyChooseUsSection features={features} />

      <Container className="relative z-10 py-2 text-center">
        {/* Phone */}
        {/* <div className="mt-0.5 text-[#D4AF6A] text-2xl font-semibold tracking-widest">
          +33 1 76 44 33 00
        </div> */}
      </Container>
    </Section>
  );
}
