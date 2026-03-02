import { getPageBySlug } from "@/src/actions/page/getPage";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import HeroSection from "@/src/components/common/Ui/HeroSection";
import CommitmentSection from "@/src/feature/Homepage/components/CommitmentSection";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import { Metadata } from "next";
import { notFound } from "next/navigation";
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
  if (!page || page.status === "inactive") {
    notFound();
  }
  return (
    <>
      <HeroSection img={page?.imageUpload} alt={page.imageAlt} />
      <DarkLuxuryBlock>
        <CommitmentSection
          title={page?.title}
          reliableServiceTitle={page?.reliableServiceTitle}
          customerServiceTitle={page?.customerServiceTitle}
          secureBookingTitle={page?.secureBookingTitle}
          fairPriceTitle={page?.fairPriceTitle}
          customerService={page?.customerService}
          fairPrice={page?.fairPrice}
          reliableService={page?.reliableService}
          secureBooking={page?.secureBooking}
        />
        <TestimonialsSection />
      </DarkLuxuryBlock>
    </>
  );
}
