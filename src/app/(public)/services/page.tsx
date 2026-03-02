import React, { cache } from "react";
import { getPageBySlug } from "@/src/actions/page/getPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import HeroSection from "@/src/components/common/Ui/HeroSection";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import Content from "@/src/components/common/Ui/Content";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
const getServicesPage = cache(() => getPageBySlug("services"));
const safe = (value?: string | null) => value ?? undefined;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();
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

export default async function ServicesPage() {
  const page = await getServicesPage();
  console.log(page?.imageUpload);

  if (!page || page.status === "inactive") {
    notFound();
  }

  return (
    <>
      <HeroSection img={page?.imageUpload || undefined} alt={page?.imageAlt} />
      <DarkLuxuryBlock>
        <Content data={{ title: page?.title, content: page?.content }} />
        <TestimonialsSection />
      </DarkLuxuryBlock>
    </>
  );
}
