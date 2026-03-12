import React, { cache } from "react";
import { getPageBySlug } from "@/src/actions/page/getPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import Content from "@/src/components/common/Ui/Content";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";

// Cache the database call for this request cycle
const getPrivacyPage = cache(() => getPageBySlug("privacy"));
const safe = (value?: string | null) => value ?? undefined;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPrivacyPage();
  const title = page?.metaTitle ?? page?.title ?? "Privacy Policy";
  const description = safe(page?.metaDescription);

  return {
    title,
    description,
    keywords: safe(page?.metaKeywords),
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PrivacyPage() {
  const page = await getPrivacyPage();

  // If page doesn't exist or is set to inactive by admin, show 404
  if (!page || page.status === "inactive") {
    notFound();
  }

  return (
    <DarkLuxuryBlock>
      <Content
        data={{
          title: page.title,
          content: page.content,
        }}
      />
      <TestimonialsSection />
    </DarkLuxuryBlock>
  );
}
