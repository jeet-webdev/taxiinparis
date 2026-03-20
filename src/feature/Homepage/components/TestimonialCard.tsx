import Image from "next/image";
import React from "react";

interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="text-sm  font-semibold">
    <span className="text-[#C6A85A] ">{"★".repeat(rating)}</span>
    <span className="text-[#C6A85A] ml-1">5/5</span>
  </div>
);

// async function getReviews(): Promise<GoogleReview[]> {
//   const apiKey = process.env.GOOGLE_PLACES_API_KEY;
//   const placeId = "ChIJm_rvs3hm5kcRtcMPDil_et4";

//   const res = await fetch(
//     `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`,
//     { next: { revalidate: 3600 } },
//   );

//   const data = await res.json();
//   const reviews = (data.result?.reviews || []) as GoogleReview[];

//   // Filter 4+ star, shuffle, and take 6 to fill two rows of 3
//   return reviews
//     .filter((r) => r.rating >= 4)
//     .sort(() => 0.5 - Math.random())
//     .slice(0, 6);
// }
async function getReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = "ChIJm_rvs3hm5kcRtcMPDil_et4-testtesttest";

  // Google only returns up to 5 reviews in a single Place Details request.
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`,
    { next: { revalidate: 3600 } },
  );

  const data = await res.json();
  const allReviews = (data.result?.reviews || []) as GoogleReview[];

  // This filters the results to ONLY include 5-star ratings
  const fiveStarOnly = allReviews.filter((r) => r.rating === 5);
  // const fiveStarOnly = allReviews.filter((r) => r.rating >= 1);
  return fiveStarOnly.slice(0, 5);
}

export default async function TestimonialCard() {
  const reviews = await getReviews();

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Image Layer */}

      {/* Content Layer */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-xl md:text-3xl font-heading text-[#2A2A2A] font-medium tracking-wide text-center">
            Trusted by Travelers in{" "}
            <span className="text-[#C6A85A]">Paris</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-[#2A2A2A] font-medium">
            <span>4.0</span>
            <span className="text-[#C6A85A]">★★★★☆</span>
            <span>based on 56 verified Google reviews</span>
          </div>
        </div>
        <div className="px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-left shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    height={48}
                    width={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {review.author_name}
                    </h4>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 italic">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJm_rvs3hm5kcRtcMPDil_et4"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary font-logo shadow-lg"
          >
            View All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
