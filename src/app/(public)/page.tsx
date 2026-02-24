import { getPageBySlug } from "@/src/actions/page/getPage";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import CommitmentSection from "@/src/feature/Homepage/components/CommitmentSection";
import HeroSection from "@/src/feature/Homepage/components/HeroSection";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import { Metadata } from "next";
import { cache } from "react";

const getHomePage = cache(() => getPageBySlug("home"));

// small helper to remove null
const safe = (value?: string | null) => value ?? undefined;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();

  const title = page?.metaTitle ?? page?.title ?? undefined;
  const description = safe(page?.metaDescription);

  return {
    title,
    description,
    keywords: safe(page?.metaKeywords),

    openGraph: {
      title,
      description,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const page = await getHomePage();
  console.log("Home page data:", page); // Debug log to check the fetched data
  return (
    <>
      <HeroSection img={page?.imageUpload} />
      <DarkLuxuryBlock>
        <CommitmentSection customerService={page?.customerService} fairPrice={page?.fairPrice} reliableService={page?.reliableService} secureBooking={page?.secureBooking} />
        <TestimonialsSection />
      </DarkLuxuryBlock>
    </>
  );
}