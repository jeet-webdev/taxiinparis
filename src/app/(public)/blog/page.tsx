import React from "react";
import { getBlogPage } from "@/src/actions/blog/getBlogs";
import Link from "next/link";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import { Metadata } from "next";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import Image from "next/image";
// import BlogPagination from "@/src/feature/Blog/components/BlogPagination";
import BlogPagination from "@/src/feature/blogs/components/BlogPagination";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs | Taxi in paris",
    description:
      "Read the latest blogs, articles, and updates from our website.",
    keywords: ["blogs", "articles"],
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 6;

  const { blogs, totalPages } = await getBlogPage(currentPage, limit);

  return (
    <main className="min-h-screen bg-[#292d37]">
      <DarkLuxuryBlock>
        <section className="py-16 border-b border-amber-500">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-5xl font-light text-[#d4af6a] mb-2 tracking-tight">
              Our Blogs
            </h1>
            <div className="h-1 w-24 bg-[#d4af6a] mx-auto relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#d4af6a] rotate-45" />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          {blogs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No blog posts available.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => {
                  const previewText =
                    blog.text?.replace(/<[^>]*>/g, "").slice(0, 120) + "...";

                  const firstImageMatch = blog.text?.match(
                    /<img[^>]+src="([^">]+)"/,
                  );
                  const firstImage = firstImageMatch?.[1];

                  return (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-400 flex flex-col h-full"
                    >
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        {firstImage ? (
                          <Image
                            src={firstImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-black transition mb-3 line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="text-gray-500 text-sm flex-grow line-clamp-3">
                          {previewText}
                        </p>
                        <span className="mt-4 text-amber-500 font-medium text-sm uppercase tracking-wider">
                          Read More →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Added logic to only show pagination if there is more than 1 page */}
              {totalPages > 1 && (
                <BlogPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              )}
            </>
          )}
        </section>
        <TestimonialsSection />
      </DarkLuxuryBlock>
    </main>
  );
}
