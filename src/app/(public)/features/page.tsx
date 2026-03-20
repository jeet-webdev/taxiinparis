import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { FeatureItem } from "@/src/feature/page-editor/features/types/feature.types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WhyChooseUsSection() {
  const features = await prisma.feature.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading (UNCHANGED STYLE) */}
        <h2
          className="text-3xl md:text-4xl font-semibold text-center mb-12 text-[#C8954A]"
          style={{ fontFamily: "Georgia, serif", color: "#C8954A" }}
        >
          Why Choose Us
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item: FeatureItem) => (
            <article
              key={item.id}
              className="group flex flex-col h-full rounded-md overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Image (RESPONSIVE FIX ONLY) */}
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-5">
                {/* Category (EXACT SAME) */}
                {item.category && (
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block"
                    style={{ color: "#C8954A" }}
                  >
                    {item.category}
                  </span>
                )}

                {/* Title (EXACT SAME) */}
                <h3
                  className="text-base font-semibold text-gray-900 mb-3 leading-snug"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {item.title}
                </h3>

                {/* Description (EXACT SAME) */}
                <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-5">
                  {item.description}
                </p>

                {/* CTA (EXACT SAME) */}
                <Link
                  href={item.buttonLink || "#"}
                  target={item.openInNewTab ? "_blank" : "_self"}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="group/cta flex items-center justify-between pt-4 border-t border-gray-100"
                >
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-800 group-hover/cta:text-gray-500 transition-colors duration-200 pr-4 leading-relaxed">
                    {item.buttonText || "Explore"}
                  </span>

                  <div className="shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover/cta:bg-gray-50 transition-colors duration-200">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
