import Link from "next/link";
import Image from "next/image";
import FeatureCardMotion from "./FeatureCardMotion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WhyChooseUsSection({
  features,
}: {
  features: any[];
}) {
  return (
    <section className=" py-2 sm:py-6 lg:py-8">
      <div className="max-w-378 mx-auto px-0 sm:px-6 lg:px-8">
        {/* Heading (UNCHANGED STYLE) */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-light  mb-12 text-black">
          Simplify your travel with our chauffeur service in Paris. Book now and
          experience the ultimate in comfort, style, and reliability.
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <FeatureCardMotion key={item.id}>
              <article className="group flex flex-col h-full overflow-hidden bg-[#faf8f2]">
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
                <div className="flex flex-col grow p-5">
                  {/* Category (EXACT SAME) */}
                  {item.category && (
                    <span className="text-base font-medium font-sans p-0.5 rounded-full bg-[#8b6c26] text-white w-fit">
                      <div className="border border-white px-3 py-1 rounded-full">
                        {item.category}
                      </div>
                    </span>
                  )}

                  {/* Title (EXACT SAME) */}
                  <h3 className="text-lg font-medium text-black my-1.5 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description (EXACT SAME) */}
                  <p className="text-sm text-black/75 leading-relaxed grow">
                    {item.description}
                  </p>

                  {/* CTA (EXACT SAME) */}
                  <Link
                    href={item.buttonLink || "#"}
                    target={item.openInNewTab ? "_blank" : "_self"}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className="group/cta mt-4  flex text-base items-center font-medium font-sans p-0.5 rounded-full bg-[#8b6c26] text-white w-fit transition-all duration-300 ease-out hover:bg-[#A88435] hover:text-white hover:shadow-lg hover:-translate-y-0.5 "
                  >
                    <div className="border border-white px-3 py-1 rounded-full flex items-center text-center justify-between gap-8 ">
                      <span className="text-base text-white transition-colors duration-200">
                        {item.buttonText || "Explore"}
                      </span>
                      <div className="ml-2 transition-all duration-300 group-hover/cta:translate-x-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="rtl:rotate-180"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="19"
                            height="19"
                            rx="9.5"
                            className="transition-all duration-300"
                          />

                          <path
                            d="M10.5 13.998C10.5 7.998 16 7.998 16 7.998M16 7.998C16 7.998 10.5 7.998 10.5 1.998M16 7.998H4"
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeLinejoin="bevel"
                            className="transition-all duration-300"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </article>
            </FeatureCardMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
