// app/page.tsx

// import AppLayout from "@/src/components/common/Layout/AppLayout";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import CommitmentSection from "@/src/feature/Homepage/components/CommitmentSection";
import HeroSection from "@/src/feature/Homepage/components/HeroSection";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";

export default function HomePage() {
  return (
    // <AppLayout>
    <>
      <HeroSection />
      <DarkLuxuryBlock>
      <CommitmentSection />
      <TestimonialsSection />
      </DarkLuxuryBlock>
      </>
   
  );
}
