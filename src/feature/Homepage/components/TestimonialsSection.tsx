import Section from "@/src/components/common/Ui/Section";
import { Container } from "@mui/material";
import { prisma } from "@/src/lib/prisma";
import WhyChooseUsSection from "@/src/app/(public)/features/page";

export default async function TestimonialsSection() {
  // Use Promise.all to run queries in parallel
  const [features, firstFeature] = await Promise.all([
    prisma.feature.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
    }),
    prisma.feature.findFirst({
      where: { isActive: true },
      select: { mainTitle: true },
    }),
  ]);

  return (
    <Section>
      <WhyChooseUsSection
        features={features}
        mainTitle={firstFeature?.mainTitle ?? "Why Choose Us"}
      />
      <Container className="relative z-10 py-2 text-center">
        {/* Phone */}
        {/* <div className="mt-0.5 text-[#8B6C26] text-2xl font-semibold tracking-widest">
          +33 1 76 44 33 00
        </div> */}
      </Container>
    </Section>
  );
}
