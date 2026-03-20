import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

import { CategoryPage, Category } from "@/src/generated/prisma/client";
import { prisma } from "@/src/lib/prisma";

// Components
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import HeroSection from "@/src/components/common/Ui/HeroSection";

/* ---------------- TYPES ---------------- */

interface CategoryPageContentJson {
  type: string;
  content: string;
  updatedAt: string;
}

type CategoryPageWithRelation = CategoryPage & {
  category: Category | null;
};

interface Props {
  params: Promise<{
    categorySlug: string;
    categoryPageSlug: string;
  }>;
}

/* ---------------- FETCH FUNCTION ---------------- */

async function getCategoryPage(
  categorySlug: string,
  pageSlug: string,
): Promise<CategoryPageWithRelation | null> {
  try {
    const page = await prisma.categoryPage.findFirst({
      where: {
        slug: pageSlug,
        category: {
          slug: categorySlug,
        },
      },
      include: {
        category: true,
      },
    });

    return page;
  } catch (error) {
    console.error("Error fetching category page:", error);
    return null;
  }
}

/* ---------------- METADATA ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, categoryPageSlug } = await params;

  const page = await getCategoryPage(categorySlug, categoryPageSlug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const keywordsArray = page.metaKeywords
    ? page.metaKeywords.split(",").map((k: string) => k.trim())
    : [];

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || "",
    keywords: keywordsArray,
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || "",
      type: "website",
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function CategoryDetailPage({ params }: Props) {
  const { categorySlug, categoryPageSlug } = await params;

  const page = await getCategoryPage(categorySlug, categoryPageSlug);

  if (!page) {
    notFound();
  }

  /* -------- CONTENT PARSE -------- */
  let displayContent = "";

  if (page.content) {
    if (typeof page.content === "string") {
      try {
        const parsed = JSON.parse(page.content) as CategoryPageContentJson;
        displayContent = parsed.content || page.content;
      } catch {
        displayContent = page.content;
      }
    } else if (typeof page.content === "object") {
      const casted = page.content as unknown as CategoryPageContentJson;
      displayContent = casted.content || "";
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0F1C]">
      <DarkLuxuryBlock>
        {/* Hero */}
        <HeroSection img="/images/luxury-hero-bg.jpg" alt={page.title} />

        <section className="py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            {/* Category Name */}
            <p className="text-center text-[#D4AF6A] font-semibold uppercase tracking-widest text-xs mb-4">
              {page.category?.name || "Premium Service"}
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl text-center mb-8 font-serif text-[#D4AF6A] leading-tight">
              {page.title}
            </h1>

            <div className="h-px w-32 bg-[#D4AF6A] mx-auto mb-12" />

            {/* Content */}
            <article
              className="
                text-gray-300
                leading-relaxed
                text-lg
                [&_h2]:text-3xl
                [&_h2]:font-serif
                [&_h2]:text-[#D4AF6A]
                [&_h2]:mt-12
                [&_h2]:mb-6
                [&_h2]:border-b
                [&_h2]:border-[#D4AF6A]/20
                [&_h2]:pb-2

                [&_h3]:text-2xl
                [&_h3]:font-serif
                [&_h3]:text-[#D4AF6A]
                [&_h3]:mt-10
                [&_h3]:mb-4

                [&_p]:mb-6
                [&_strong]:text-[#D4AF6A]
                [&_ul]:list-disc
                [&_ul]:pl-6
                [&_li]:mb-2
                [&_a]:text-[#D4AF6A]
                [&_a]:underline
                [&_a:hover]:text-white
              "
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />

            {/* Buttons */}
            <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/booking"
                  className="bg-[#D4AF6A] text-black px-10 py-4 rounded-full font-bold uppercase hover:bg-amber-400 transition"
                >
                  Book Your Transfer Now
                </Link>

                <Link
                  href={`/category/${categorySlug}`}
                  className="border border-white/20 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  View More in {page.category?.name}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <TestimonialsSection />
          </div>
        </section>
      </DarkLuxuryBlock>
    </main>
  );
}
