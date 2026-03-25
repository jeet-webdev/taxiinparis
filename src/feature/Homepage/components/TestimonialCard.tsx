// import { prisma } from "@/src/lib/prisma";
// import TestimonialSlider from "./TestimonialSlider";

// // --- Interfaces for Type Safety ---

// interface GoogleSettings {
//   id: number;
//   clientId: string;
//   clientSecret: string;
//   refreshToken: string;
//   accountId: string;
//   locationId: string;
//   updatedAt: Date;
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

// interface FormattedReview {
//   name: string;
//   image: string;
//   text: string;
//   time: string;
// }

// // --- Logic ---

// async function getAccessToken(creds: GoogleSettings): Promise<string | null> {
//   try {
//     const res = await fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         client_id: creds.clientId,
//         client_secret: creds.clientSecret,
//         refresh_token: creds.refreshToken,
//         grant_type: "refresh_token",
//       }),
//       cache: "no-store",
//     });

//     const data = await res.json();
//     return data.access_token || null;
//   } catch (error) {
//     console.error("Token Refresh Failed:", error);
//     return null;
//   }
// }

// async function getReviews(): Promise<FormattedReview[]> {
//   // Fetch credentials from DB with type safety from Prisma
//   const creds = await prisma.googleSettings.findUnique({
//     where: { id: 1 },
//   });

//   if (!creds) {
//     console.error("Google Settings row not found in DB. Please seed ID: 1");
//     return [];
//   }

//   const token = await getAccessToken(creds as GoogleSettings);
//   if (!token) return [];

//   try {
//     const res = await fetch(
//       `https://mybusiness.googleapis.com/v4/accounts/${creds.accountId}/locations/${creds.locationId}/reviews`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//         next: { revalidate: 3600 },
//       },
//     );

//     const data = await res.json();
//     const reviews: GMBReview[] = data.reviews || [];

//     return reviews
//       .filter((r) => r.starRating === "FIVE" && r.comment)
//       .sort(
//         (a, b) =>
//           new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime(),
//       )
//       .slice(0, 15)
//       .map((r) => ({
//         name: r.reviewer.displayName,
//         image:
//           r.reviewer.profilePhotoUrl ||
//           `https://ui-avatars.com/api/?name=${encodeURIComponent(r.reviewer.displayName)}&background=C6A85A&color=fff`,
//         text: r.comment || "",
//         time: new Date(r.updateTime).toLocaleDateString("en-GB", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         }),
//       }));
//   } catch (error) {
//     console.error("GMB Fetch Error:", error);
//     return [];
//   }
// }

// export default async function TestimonialCard() {
//   const reviews = await getReviews();

//   if (reviews.length === 0) return null;

//   return (
//     <section className="relative py-10 px-6 overflow-hidden">
//       <div className="relative z-10 max-w-6xl mx-auto text-center">
//         <div className="mb-10">
//           <h2 className="text-xl md:text-3xl font-heading text-[#2A2A2A] font-medium tracking-wide">
//             Trusted by Travelers in{" "}
//             <span className="text-[#8B6C26]">Paris</span>
//           </h2>
//           <div className="flex items-center justify-center gap-2 text-[#2A2A2A] font-medium mt-2">
//             <span>5.0</span>
//             <span className="text-[#8B6C26]">★★★★★</span>
//             <span>based on verified Google reviews</span>
//           </div>
//         </div>

//         <TestimonialSlider reviews={reviews} />
//       </div>

//       <div className="mt-6 flex items-center justify-center">
//         <a
//           href="https://maps.app.goo.gl/ZZCBrXr1VnDSDFiZ8"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="btn-primary font-logo! "
//         >
//           View All Reviews on Google
//         </a>
//       </div>
//     </section>
//   );
// }

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
