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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2
          className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Our Experiences
        </h2>
<div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4">
  {features.map((item: FeatureItem) => (
    <article
      key={item.id}
      className="
        min-w-[85%] 
        sm:min-w-[70%] 
        md:min-w-0 
        group flex flex-col overflow-hidden 
        bg-white shadow-sm hover:shadow-md 
        transition-shadow duration-300
      "
    >
              {/* Image container — explicit style position:relative required for Next fill */}
              <div
                className="w-full overflow-hidden bg-gray-100 shrink-0"
                style={{ height: "208px", position: "relative" }}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    // unoptimized bypasses next.config domain whitelist entirely
                    // so any external URL works without configuring remotePatterns
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

                {/* Arrow circle — z-10 so it sits above the image */}
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm border border-gray-200">
                  <svg
                    className="w-3.5 h-3.5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Card body */}
              <div className="flex bg-[#ece8df] flex-col flex-grow p-5">
                {item.category && (
                  <span
                    className="text-sm font-semibold tracking-[0.2em] uppercase mb-1 block"
                    style={{ color: "#C6A85A" }}
                  >
                    {item.category}
                  </span>
                )}

                <h3 className="text-base font-semibold text-gray-700 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-5">
                  {item.description}
                </p>

                <Link
                  href={item.buttonLink || "#"}
                  target={item.openInNewTab ? "_blank" : "_self"}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="group/cta flex items-center justify-between pt-1"
                >
                  <span className="text-base  text-gray-800 group-hover/cta:text-gray-500 transition-colors duration-200 pr-4 ">
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
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
