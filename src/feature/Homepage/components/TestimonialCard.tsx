import { prisma } from "@/src/lib/prisma";
import TestimonialSlider from "./TestimonialSlider";

interface FormattedReview {
  name: string;
  image: string;
  text: string;
  time: string;
}

async function getReviews(): Promise<FormattedReview[]> {
  const reviews = await prisma.googleReview.findMany({
    orderBy: { created_at: "desc" },
    take: 15,
  });

  return reviews.map((r) => ({
    name: r.author_name || "Anonymous",
    image:
      r.profile_photo_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name || "A")}&background=C6A85A&color=fff`,
    text: r.review_text || "",
    time: r.review_time || "",
  }));
}

export default async function TestimonialCard() {
  const reviews = await getReviews();

  if (reviews.length === 0) return null;

  return (
    <section className="relative py-10 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-10">
          <h2 className="text-xl md:text-3xl font-heading text-[#2A2A2A] font-medium tracking-wide">
            Trusted by Travelers in{" "}
            <span className="text-[#8B6C26]">Paris</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-[#2A2A2A] font-medium mt-2">
            <span>5.0</span>
            <span className="text-[#8B6C26]">★★★★★</span>
            <span>based on verified Google reviews</span>
          </div>
        </div>

        <TestimonialSlider reviews={reviews} />
      </div>

      <div className="mt-6 flex items-center justify-center">
        <a
          href="https://maps.app.goo.gl/ZZCBrXr1VnDSDFiZ8"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary font-logo!"
        >
          View All Reviews on Google
        </a>
      </div>
    </section>
  );
}
