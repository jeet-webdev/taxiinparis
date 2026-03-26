import { getPageBySlug } from "@/src/actions/page/getPage";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import HeroSection from "@/src/components/common/Ui/HeroSection";
import CommitmentSection from "@/src/feature/Homepage/components/CommitmentSection";
import TestimonialCard from "@/src/feature/Homepage/components/TestimonialCard";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
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
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Luxury Limo Paris",
            alternateName: "Luxury Chauffeur Paris",
            url: "https://www.luxurylimoparis.fr",
          }),
        }}
      />
      <Script
        id="org-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Luxury Limo Paris",
            url: "https://www.luxurylimoparis.fr",
            logo: "https://www.luxurylimoparis.fr/logo.png",
          }),
        }}
      />
      <div className="">
        <HeroSection img={page?.imageUpload} alt={page?.imageAlt} />

        <DarkLuxuryBlock>
          <TestimonialCard />

          <CommitmentSection
            highlightText={page?.heroColorTitle}
            subtitle={page?.heroSubtitle}
            description={page?.heroDescription}
            ctaButtonText={page?.heroButtonText}
            heroButtonLink={page?.heroButtonLink}
            heroTrustText={page?.heroTrustText}
            heroPoint1={page?.heroPoint1}
            heroPoint2={page?.heroPoint2}
            heroCard1Title={page?.heroCard1Title}
            heroCardFootnote={page?.heroCardFootnote}
            heroCard2Title={page?.heroCard2Title}
            heroCard3Title={page?.heroCard3Title}
            heroPoint3={page?.heroPoint3}
            title={page?.title}
          />
          <TestimonialsSection />
        </DarkLuxuryBlock>
      </div>
    </>
  );
}
