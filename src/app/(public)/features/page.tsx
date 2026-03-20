import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WhyChooseUsSection() {
  const features = await prisma.feature.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });

  return (
    <section className="py-2 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading (UNCHANGED STYLE) */}
        <h2 className="text-xl md:text-3xl font-heading font-medium tracking-wide text-center mb-12 text-[#C8954A]">
          Simplify your travel with our chauffeur service in Paris.Book now and
          experience the ultimate in comfort, style, and reliability.
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col h-full overflow-hidden bg-[#f1eee7]  shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Image (RESPONSIVE FIX ONLY) */}
              <div className="relative w-full aspect-4/3 bg-gray-100">
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
                    className="text-base font-medium uppercase  block"
                    style={{ color: "#9C7A2B" }}
                  >
                    {item.category}
                  </span>
                )}

                {/* Title (EXACT SAME) */}
                <h3 className="text-lg font-medium text-black my-1.5 leading-snug">
                  {item.title}
                </h3>

                {/* Description (EXACT SAME) */}
                <p className="text-sm text-gray-600 leading-relaxed grow">
                  {item.description}
                </p>

                {/* CTA (EXACT SAME) */}
                <Link
                  href={item.buttonLink || "#"}
                  target={item.openInNewTab ? "_blank" : "_self"}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="group/cta flex items-center gap-4 justify-end pt-4 "
                >
                  <span className="text-base text-gray-800 group-hover/cta:text-gray-500 transition-colors duration-200 pr-4 leading-relaxed">
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
