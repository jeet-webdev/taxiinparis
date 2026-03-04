"use server";

import { prisma } from "@/src/lib/prisma";
import { Prisma } from "../generated/prisma/client";
import { revalidatePath } from "next/cache";

export async function saveFeatureAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const iconType = formData.get("iconType") as string;
    const buttonText = formData.get("buttonText") as string;
    const mainTitleRaw = formData.get("mainTitle") as string;

    // 1. Basic Validation (Prevents empty entries)
    if (!title || !description || !iconType) {
      throw new Error("Missing required fields: title, description, or iconType.");
    }

    const data: Prisma.FeatureUpdateInput = {
      title,
      description,
      iconType,
      buttonText: buttonText || "Book Now",
      // If mainTitleRaw is present, update it across all records or just this one
      // based on your logic. Usually, we store it in the JSON field.
      mainTitle: mainTitleRaw ? { text: mainTitleRaw } : Prisma.DbNull,
    };

    if (id && id.trim() !== "") {
      // --- UPDATE LOGIC ---
      await prisma.feature.update({
        where: { id: parseInt(id) },
        data,
      });
    } else {
      // --- CREATE LOGIC ---
      await prisma.feature.create({
        data: data as Prisma.FeatureCreateInput,
      });
    }

    // Trigger UI updates
    revalidatePath("/admin/feature-editor");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save feature:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function deleteFeatureAction(id: number) {
  try {
    if (!id) throw new Error("ID is required for deletion");

    await prisma.feature.delete({
      where: { id },
    });

    revalidatePath("/admin/feature-editor");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete feature:", error);
    return { success: false, error: "Failed to delete" };
  }
}