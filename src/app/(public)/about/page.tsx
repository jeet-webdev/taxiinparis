import { getPageBySlug } from "@/src/actions/page/getPage";
import Content from "@/src/components/common/Ui/Content";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import HeroSection from "@/src/components/common/Ui/HeroSection";
import TestimonialCard from "@/src/feature/Homepage/components/TestimonialCard";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/src/lib/prisma";

const getAboutPage = cache(() => getPageBySlug("about"));
const safe = (value?: string | null) => value ?? undefined;
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
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

export default async function about() {
  // const page = await getAboutPage();
  const [page, footerData] = await Promise.all([
    getAboutPage(),
    prisma.footer.findFirst(),
  ]);
  if (!page || page.status === "inactive") {
    notFound();
  }
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url(${page?.imageUpload || "/assets/images/hero-img.jpeg"})`,
        }}
      >
        <HeroSection img={page?.imageUpload || undefined} alt={page.imageAlt} />

        <DarkLuxuryBlock>
          <TestimonialCard />
          <Content
            data={{ title: page?.title, content: page?.content }}
            footerData={footerData}
          />
          <TestimonialsSection />
        </DarkLuxuryBlock>
      </div>
    </>
  );
}
