import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { prisma } from "@/src/lib/prisma";
import { Category, CategoryPage } from "@/src/generated/prisma/client";

/* ---------------- TYPES ---------------- */

type CategoryWithPages = Category & {
  categoryPages: CategoryPage[];
};

interface Props {
  params: Promise<{
    categorySlug: string;
  }>;
}

/* ---------------- FETCH ---------------- */

async function getCategoryData(slug: string): Promise<CategoryWithPages | null> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        categoryPages: {
          orderBy: { title: "asc" },
        },
      },
    });
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

/* ---------------- METADATA ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryData(categorySlug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: `Explore ${category.name}`,
    description: `Browse all services under ${category.name}`,
  };
}

/* ---------------- PAGE ---------------- */

export default async function CategoryOverviewPage({ params }: Props) {
  const { categorySlug } = await params;
  const category = await getCategoryData(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Explore Header Section */}
      <section className="pt-24 pb-12 text-center">
         <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-tight capitalize">
    {category.name}
  </h1>
        
        {/* Yellow Diamond Divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1.5px] w-16 bg-[#eab308]" />
          <div className="w-2.5 h-2.5 bg-[#eab308] rotate-45" />
          <div className="h-[1.5px] w-16 bg-[#eab308]" />
        </div>
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {category.categoryPages.map((page) => (
            <Link
              key={page.id}
              href={`/category/${categorySlug}/${page.slug}`}
              className="group flex flex-col bg-white rounded-md border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={page.imageUpload || "/assets/images/luxury-limo-chiah3.webp"}
                  alt={page.imageAlt || page.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <div className="p-8">
                <h3 className="text-2xl font-medium text-gray-800 mb-4 group-hover:text-[#eab308] transition-colors">
                  {page.title}
                </h3>
                
                <p className="text-gray-500 text-[15px] leading-relaxed line-clamp-2">
                  {page.metaDescription || "Professional transport services. Experience luxury and comfort with our elite fleet."}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {category.categoryPages.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No pages found in this category.
          </div>
        )}
      </section>
    </main>
  );
}