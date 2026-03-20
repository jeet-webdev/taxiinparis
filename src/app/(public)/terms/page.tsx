import React, { cache } from "react";
import { getPageBySlug } from "@/src/actions/page/getPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import Content from "@/src/components/common/Ui/Content";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
const getTermsPage = cache(() => getPageBySlug("terms"));
const safe = (value?: string | null) => value ?? undefined;
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function generateMetadata(): Promise<Metadata> {
  const page = await getTermsPage();
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

export default async function TermsPage() {
  const page = await getTermsPage();

  if (!page || page.status === "inactive") {
    notFound();
  }

  return (
    <>
      <DarkLuxuryBlock>
        <Content data={{ title: page?.title, content: page?.content }} />
        <TestimonialsSection />
      </DarkLuxuryBlock>
    </>
  );
}
