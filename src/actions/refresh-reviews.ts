"use server";

import { revalidatePath } from "next/cache";

export interface RefreshResponse {
  success: boolean;
  message: string;
}

export async function refreshGoogleReviews(): Promise<RefreshResponse> {
  try {
    // Purge cache for the homepage
    revalidatePath("/");
    return {
      success: true,
      message: "Homepage reviews updated successfully.",
    };
  } catch (error) {
    console.error("Refresh action failed:", error);
    return {
      success: false,
      message: "Failed to refresh reviews. Check server logs.",
    };
  }
}
