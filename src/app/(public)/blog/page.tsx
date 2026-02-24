import React from "react";
import { getBlogPage } from "@/src/actions/blog/getBlogs";
import Link from "next/link";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 6;

  const { blogs, totalCount, totalPages } = await getBlogPage(
    currentPage,
    limit,
  );

  return (
    <main className="min-h-screen pb-20 bg-[#292d37]">
      <DarkLuxuryBlock>
        <section className="py-16 border-b border-amber-500">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-5xl font-light text-amber-500 mb-4 tracking-tight">
              Our Blogs
            </h1>
            <div className="h-1 w-24 bg-amber-500 mx-auto relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rotate-45" />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          {blogs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No blog posts available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="group bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between min-h-[280px]"
                >
                  <h2 className="text-xl font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {blog.title}
                  </h2>
                  <Link
                    href={`/blog/${encodeURIComponent(blog.title)}`}
                    className="text-amber-500 font-medium text-sm flex items-center gap-1 group-hover:gap-2 uppercase tracking-wider"
                  >
                    Read More <span>→</span>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {totalCount > limit && (
            <div className="mt-16 flex justify-center items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/blog?page=${pageNum}`}
                    className={`w-10 h-10 rounded flex items-center justify-center font-medium transition-all ${
                      currentPage === pageNum
                        ? "bg-amber-500 text-white"
                        : "bg-gray-700 border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </Link>
                ),
              )}
            </div>
          )}
        </section>
      </DarkLuxuryBlock>
    </main>
  );
}
