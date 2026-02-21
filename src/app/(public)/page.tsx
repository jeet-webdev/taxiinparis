// app/page.tsx

import AppLayout from "@/src/components/common/Layout/AppLayout";
import CommitmentSection from "@/src/feature/Homepage/components/CommitmentSection";
import DarkLuxuryBlock from "@/src/feature/Homepage/components/DarkLuxuryBlock";
import HeroSection from "@/src/feature/Homepage/components/HeroSection";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";

export default function HomePage() {
  return (
    <AppLayout>
      <HeroSection />
      <DarkLuxuryBlock>

      <CommitmentSection />
      <TestimonialsSection />
      </DarkLuxuryBlock>
    </AppLayout>
  );
}
