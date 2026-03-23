// import Image from "next/image";
// import React from "react";

// // --- Types ---

// interface GoogleReview {
//   author_name: string;
//   profile_photo_url: string;
//   rating: number;
//   text: string;
//   relative_time_description: string;
// }

// interface GMBReview {
//   reviewer: {
//     displayName: string;
//     profilePhotoUrl?: string;
//   };
//   starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
//   comment?: string;
//   updateTime: string;
// }

// const STAR_MAP: Record<GMBReview["starRating"], number> = {
//   ONE: 1,
//   TWO: 2,
//   THREE: 3,
//   FOUR: 4,
//   FIVE: 5,
// };

// // --- Helper Components ---

// const StarRating = ({ rating }: { rating: number }) => (
//   <div className="text-sm font-semibold">
//     <span className="text-[#C6A85A]">{"★".repeat(rating)}</span>
//     <span className="text-[#C6A85A] ml-1">5/5</span>
//   </div>
// );

// function getRelativeTime(dateStr: string): string {
//   try {
//     const date = new Date(dateStr);
//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
//     if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
//     return `${Math.floor(diffDays / 365)} years ago`;
//   } catch {
//     return "Recently";
//   }
// }

// // --- Data Fetching ---

// async function getAccessToken(): Promise<string | null> {
//   try {
//     const res = await fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         client_id: process.env.CLIENT_ID!,
//         client_secret: process.env.CLIENT_SECRET!,
//         refresh_token: process.env.REFRESH_TOKEN!,
//         grant_type: "refresh_token",
//       }),
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       console.error("Auth token refresh failed:", res.status);
//       return null;
//     }

//     const data = await res.json();
//     return data.access_token || null;
//   } catch (error) {
//     console.error("Error fetching access token:", error);
//     return null;
//   }
// }

// async function getReviews(): Promise<GoogleReview[]> {
//   const accountId = process.env.ACCOUNT_ID;
//   const locationId = process.env.LOCATION_ID;

//   const accessToken = await getAccessToken();
//   if (!accessToken) return [];

//   let allReviews: GMBReview[] = [];
//   let pageToken: string | undefined;

//   try {
//     do {
//       const url = new URL(
//         // `https://mybusinessaccountmanagement.googleapis.com/v1/accounts/${accountId}/locations/${locationId}/reviews`,
//         `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
//       );
//       url.searchParams.set("pageSize", "50");
//       if (pageToken) url.searchParams.set("pageToken", pageToken);

//       const res = await fetch(url.toString(), {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         next: { revalidate: 3600 },
//       });

//       if (!res.ok) {
//         console.error("GMB API responded with error:", res.status);
//         break;
//       }

//       const data = await res.json();
//       if (data.reviews) {
//         allReviews = [...allReviews, ...data.reviews];
//       }
//       pageToken = data.nextPageToken;
//     } while (pageToken);
//   } catch (error) {
//     console.error("Error in getReviews loop:", error);
//   }

//   return allReviews
//     .filter((r) => r.starRating === "FIVE" && r.comment)
//     .slice(0, 20)
//     .map((r) => ({
//       author_name: r.reviewer.displayName,
//       profile_photo_url:
//         r.reviewer.profilePhotoUrl ||
//         `https://ui-avatars.com/api/?name=${encodeURIComponent(r.reviewer.displayName)}&background=C6A85A&color=fff`,
//       rating: STAR_MAP[r.starRating],
//       text: r.comment || "",
//       relative_time_description: getRelativeTime(r.updateTime),
//     }));
// }

// // --- Main Component ---

// export default async function TestimonialCard() {
//   const reviews = await getReviews();

//   // If API fails or no reviews, we can return null or a fallback
//   if (reviews.length === 0) return null;

//   return (
//     <section className="relative py-20 px-6 overflow-hidden">
//       <div className="relative z-10 max-w-6xl mx-auto text-center">
//         <div className="mb-16">
//           <h2 className="text-xl md:text-3xl font-heading text-[#2A2A2A] font-medium tracking-wide">
//             Trusted by Travelers in{" "}
//             <span className="text-[#C6A85A]">Paris</span>
//           </h2>
//           <div className="flex items-center justify-center gap-2 text-[#2A2A2A] font-medium mt-2">
//             <span>5.0</span>
//             <span className="text-[#C6A85A]">★★★★★</span>
//             <span>based on verified Google reviews</span>
//           </div>
//         </div>

//         <div className="px-4 md:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {reviews.map((review, i) => (
//               <div
//                 key={i}
//                 className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-left shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <Image
//                     src={review.profile_photo_url}
//                     alt={review.author_name}
//                     height={48}
//                     width={48}
//                     className="w-12 h-12 rounded-full object-cover"
//                     unoptimized
//                   />
//                   <div>
//                     <h4 className="font-bold text-gray-900">
//                       {review.author_name}
//                     </h4>
//                     <StarRating rating={review.rating} />
//                   </div>
//                 </div>
//                 <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 italic">
//                   {review.text}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-3">
//                   {review.relative_time_description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-16 flex items-center justify-center">
//           <a
//             href="https://maps.google.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block bg-[#C6A85A] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#b5964a] transition-colors"
//           >
//             View All Reviews on Google
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }
import Image from "next/image";
import React from "react";
import { prisma } from "@/src/lib/prisma";

// --- Interfaces for Type Safety ---

interface GoogleSettings {
  id: number;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountId: string;
  locationId: string;
  updatedAt: Date;
}

interface GMBReview {
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  updateTime: string;
}

interface FormattedReview {
  name: string;
  image: string;
  text: string;
  time: string;
}

// --- Logic ---

async function getAccessToken(creds: GoogleSettings): Promise<string | null> {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
        refresh_token: creds.refreshToken,
        grant_type: "refresh_token",
      }),
      cache: "no-store",
    });

    const data = await res.json();
    return data.access_token || null;
  } catch (error) {
    console.error("Token Refresh Failed:", error);
    return null;
  }
}

async function getReviews(): Promise<FormattedReview[]> {
  // Fetch credentials from DB with type safety from Prisma
  const creds = await prisma.googleSettings.findUnique({
    where: { id: 1 },
  });

  if (!creds) {
    console.error("Google Settings row not found in DB. Please seed ID: 1");
    return [];
  }

  const token = await getAccessToken(creds as GoogleSettings);
  if (!token) return [];

  try {
    const res = await fetch(
      `https://mybusiness.googleapis.com/v4/accounts/${creds.accountId}/locations/${creds.locationId}/reviews`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      },
    );

    const data = await res.json();
    const reviews: GMBReview[] = data.reviews || [];

    return reviews
      .filter((r) => r.starRating === "FIVE" && r.comment)
      .sort(
        (a, b) =>
          new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime(),
      )
      .slice(0, 15)
      .map((r) => ({
        name: r.reviewer.displayName,
        image:
          r.reviewer.profilePhotoUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(r.reviewer.displayName)}&background=C6A85A&color=fff`,
        text: r.comment || "",
        time: new Date(r.updateTime).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));
  } catch (error) {
    console.error("GMB Fetch Error:", error);
    return [];
  }
}

export default async function TestimonialCard() {
  const reviews = await getReviews();

  if (reviews.length === 0) return null;

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-gray-50 p-8 rounded-3xl flex flex-col justify-between hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={review.image}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white shadow-sm"
                    unoptimized
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">
                      {review.name}
                    </h4>
                    <div className="text-[#C6A85A] text-[10px]">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  {review.text}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[9px] text-gray-400 font-bold uppercase">
                  {review.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary font-logo! "
        >
          View All Reviews on Google
        </a>
      </div>
    </section>
  );
}
