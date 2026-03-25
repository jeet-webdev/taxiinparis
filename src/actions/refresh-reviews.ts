// "use server";

// import { revalidatePath } from "next/cache";

// export interface RefreshResponse {
//   success: boolean;
//   message: string;
// }

// export async function refreshGoogleReviews(): Promise<RefreshResponse> {
//   try {
//     // Purge cache for the homepage
//     revalidatePath("/");
//     return {
//       success: true,
//       message: "Homepage reviews updated successfully.",
//     };
//   } catch (error) {
//     console.error("Refresh action failed:", error);
//     return {
//       success: false,
//       message: "Failed to refresh reviews. Check server logs.",
//     };
//   }
// }

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";

export interface RefreshResponse {
  success: boolean;
  message: string;
}

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
  name: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  updateTime: string;
}

async function getAccessToken(creds: GoogleSettings): Promise<string | null> {
  try {
    console.log("🔑 Attempting token refresh for clientId:", creds.clientId);

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
    console.log("🔑 Token response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("❌ Token error:", data.error, data.error_description);
      return null;
    }

    return data.access_token || null;
  } catch (error) {
    console.error("❌ Token Refresh Exception:", error);
    return null;
  }
}

export async function refreshGoogleReviews(): Promise<RefreshResponse> {
  try {
    // Step 1 - fetch credentials
    console.log("📦 Fetching credentials from DB...");
    const creds = await prisma.googleSettings.findUnique({ where: { id: 1 } });
    console.log("📦 Creds found:", creds ? "YES" : "NO");

    if (creds) {
      console.log("📦 clientId:", creds.clientId ? "SET" : "EMPTY");
      console.log("📦 clientSecret:", creds.clientSecret ? "SET" : "EMPTY");
      console.log("📦 refreshToken:", creds.refreshToken ? "SET" : "EMPTY");
      console.log("📦 accountId:", creds.accountId);
      console.log("📦 locationId:", creds.locationId);
    }

    if (!creds) {
      return { success: false, message: "Google Settings not found in DB." };
    }

    // Step 2 - get token
    console.log("🔑 Getting access token...");
    const token = await getAccessToken(creds as GoogleSettings);
    console.log("🔑 Token received:", token ? "YES" : "NO");

    if (!token) {
      return { success: false, message: "Failed to get access token." };
    }

    // Step 3 - fetch reviews
    const url = `https://mybusiness.googleapis.com/v4/accounts/${creds.accountId}/locations/${creds.locationId}/reviews`;
    console.log("📡 Fetching reviews from:", url);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    console.log("📡 Reviews API status:", res.status, res.statusText);
    const data = await res.json();
    console.log("📡 Reviews API response keys:", Object.keys(data));

    if (data.error) {
      console.error(
        "❌ Reviews API error:",
        JSON.stringify(data.error, null, 2),
      );
      return {
        success: false,
        message: `Google API Error: ${data.error.message || data.error.status}`,
      };
    }

    const reviews: GMBReview[] = data.reviews || [];
    console.log("📡 Total reviews fetched:", reviews.length);

    const filtered = reviews
      .filter((r) => r.starRating === "FIVE" && r.comment)
      .sort(
        (a, b) =>
          new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime(),
      )
      .slice(0, 50)
      .map((r) => ({
        review_id: r.name,
        author_name: r.reviewer.displayName,
        profile_photo_url:
          r.reviewer.profilePhotoUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(r.reviewer.displayName)}&background=C6A85A&color=fff`,
        rating: 5,
        review_text: r.comment || "",
        review_time: new Date(r.updateTime).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));

    console.log("✅ Filtered 5-star reviews:", filtered.length);

    // Step 4 - save to DB
    console.log("💾 Clearing old reviews...");
    await prisma.googleReview.deleteMany();

    console.log("💾 Inserting new reviews...");
    await prisma.googleReview.createMany({ data: filtered });

    console.log("✅ Done! Revalidating path...");
    revalidatePath("/");

    return {
      success: true,
      message: `Successfully synced ${filtered.length} reviews to the database.`,
    };
  } catch (error) {
    console.error("❌ FULL ERROR:", error);
    return {
      success: false,
      message: `Failed to refresh reviews. Check server logs.`,
    };
  }
}
