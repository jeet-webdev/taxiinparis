// src/app/(public)/[lang]/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getLanguagePageBySlug } from "@/src/actions/languagePageActions";
import type { Metadata } from "next";
import HeroSection from "@/src/components/common/Ui/HeroSection";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import Content from "@/src/components/common/Ui/Content";
import TestimonialCard from "@/src/feature/Homepage/components/TestimonialCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

const safe = (value?: string | null) => value ?? undefined;

// ─────────────────────────────────────────────
// Dynamic metadata
// ─────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const fullSlug = `${lang}/${slug}`;

  const page = await getLanguagePageBySlug(fullSlug);
  if (!page) return { title: "Page Not Found" };

  const title = page.metaTitle ?? page.title ?? undefined;
  const description = safe(page.metaDescription);

  return {
    title,
    description,
    keywords: safe(page.metaKeywords),
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────
export default async function LanguagePageFrontend({ params }: Props) {
  const { lang, slug } = await params;
  const fullSlug = `${lang}/${slug}`;

  const page = await getLanguagePageBySlug(fullSlug);

  if (!page || page.status === "inactive") {
    notFound();
  }

  return (
    <>
      <HeroSection img={page.imageUpload || undefined} alt={page.imageAlt} />

      <DarkLuxuryBlock>
        <TestimonialCard />
        <Content
          data={{
            title: page.title,
            content: page.content,
          }}
        />
      </DarkLuxuryBlock>
    </>
  );
}
