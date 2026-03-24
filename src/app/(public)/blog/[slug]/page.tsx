import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug } from "@/src/actions/blog/getBlogs";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import HeroSection from "@/src/components/common/Ui/HeroSection";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>; // Next.js 15
}

/* ---------------- METADATA ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  const cleanDescription =
    blog.metaDescription || stripHtml(blog.text || "").slice(0, 160);

  const keywordsArray =
    blog.metaKeywords?.split(",").map((k) => k.trim()) || [];

  return {
    title: blog.metaTitle || blog.title,
    description: cleanDescription,
    keywords: keywordsArray,

    openGraph: {
      title: blog.metaTitle || blog.title,
      description: cleanDescription,
      type: "article",
      publishedTime: blog.createdAt?.toISOString(),
      modifiedTime: blog.updatedAt?.toISOString(),
    },

    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: cleanDescription,
    },
  };
}

/* ---------------- HELPERS ---------------- */

function formatDate(value: Date | string | null | undefined) {
  if (!value) return null;
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getReadingTimeMinutes(text: string) {
  const words = stripHtml(text).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/* ---------------- PAGE ---------------- */

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const publishedDate = formatDate(blog.createdAt);
  const updatedDate = formatDate(blog.updatedAt);
  const readingTime = getReadingTimeMinutes(blog.text || "");

  return (
    <main className="min-h-screen bg-[#0A0F1C]">
      <DarkLuxuryBlock>
        <HeroSection img={blog.bannerImage} alt={blog.bannerAlt} />

        {/* --- ARTICLE CONTENT SECTION --- */}
        <section className="py-14 md:py-18">
          <div className="max-w-5xl mx-auto px-6 py-2">
            <p className="text-center text-[#D4AF6A] font-semibold uppercase tracking-widest text-xs mb-6">
              Paris Black Car Journal
            </p>

            <h2 className="text-4xl md:text-5xl text-center mb-6 font-script text-[#D4AF6A]">
              {blog.title}
            </h2>

            <div className="h-px w-[140px] bg-[#D4AF6A] mx-auto mb-6" />

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-300 mb-10">
              {publishedDate && <span>Published {publishedDate}</span>}
              {updatedDate && <span>Updated {updatedDate}</span>}
              <span>{readingTime} min read</span>
            </div>

            <div
              className="
                text-gray-300
                leading-relaxed
                 [&_h1]:text-4xl
                [&_h1]:font-serif
                [&_h1]:text-[#D4AF6A]
                [&_h1]:mt-12
                [&_h1]:mb-6
                [&_h1]:border-b
                [&_h1]:border-[#D4AF6A]/30
                [&_h1]:pb-3

                [&_h2]:text-3xl
                [&_h2]:font-serif
                [&_h2]:text-[#D4AF6A]
                [&_h2]:mt-12
                [&_h2]:mb-6
                [&_h2]:border-b
                [&_h2]:border-[#D4AF6A]/30
                [&_h2]:pb-3
                [&_h3]:text-2xl
                [&_h3]:font-serif
                [&_h3]:text-[#D4AF6A]
                [&_h3]:mt-10
                [&_h3]:mb-4

                 [&_h4]:text-xl
  [&_h4]:font-semibold
  [&_h4]:mt-8
  [&_h4]:mb-3

  [&_h5]:text-lg
  [&_h5]:font-medium
  [&_h5]:mt-6
  [&_h5]:mb-2

  [&_h6]:text-base
  [&_h6]:font-medium
  [&_h6]:mt-6
  [&_h6]:mb-2
  [&_h6]:text-gray-400
                [&_p]:mb-6
                [&_strong]:text-[#D4AF6A]
                [&_a]:text-[#D4AF6A]
                [&_a]:no-underline
                [&_a:hover]:underline
                [&_ul]:list-disc
                [&_ul]:pl-6
                [&_li]:mb-2
              "
              dangerouslySetInnerHTML={{ __html: blog.text || "" }}
            />

            <div className="mt-14 h-px w-full bg-linear-to-r from-transparent via-[#D4AF6A]/40 to-transparent" />

            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#D4AF6A] px-7 py-3 text-sm font-semibold text-black hover:bg-amber-400 transition"
              >
                Book now
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Back to blogs
              </Link>
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS SECTION --- */}
        <section className="py-24 border-t border-white/10">
          <div className="max-w-378 mx-auto px-6">
            <TestimonialsSection />
          </div>
        </section>
      </DarkLuxuryBlock>
    </main>
  );
}
