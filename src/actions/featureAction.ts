

"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveFeatureAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const iconType = formData.get("iconType") as string;
    const buttonText = formData.get("buttonText") as string;
    const buttonLink = formData.get("buttonLink") as string; // Correctly extract link
    const mainTitleRaw = formData.get("mainTitle") as string;

    // Validation
    if (!title || !description || !iconType) {
      return {
        success: false,
        error: "Title, description, and icon are required.",
      };
    }

    // Prepare data object
    // Note: We use JSON structure for mainTitle based on your schema
    const data = {
      title,
      description,
      iconType,
      buttonText: buttonText || "Book Now",
      buttonLink: buttonLink || null,
      mainTitle: mainTitleRaw ? { text: mainTitleRaw } : undefined,
    };

    if (id && id.trim() !== "") {
      // --- UPDATE LOGIC ---
      await prisma.feature.update({
        where: { id: parseInt(id) },
        data: data,
      });
    } else {
      // --- CREATE LOGIC ---
      await prisma.feature.create({
        data: data,
      });
    }

    // Trigger UI updates
    revalidatePath("/admin/feature-editor");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to save feature:", error);
    return { success: false, error: "Internal Server Error during save." };
  }
}

export async function deleteFeatureAction(id: number) {
  try {
    if (!id) throw new Error("ID is required");

    await prisma.feature.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/admin/feature-editor");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete feature:", error);
    return { success: false, error: "Failed to delete from database." };
  }
}
