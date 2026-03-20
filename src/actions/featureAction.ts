// src/actions/featureAction.ts
"use server";

import { prisma } from "@/src/lib/prisma"; // adjust to your prisma client path
import { revalidatePath } from "next/cache";

export async function saveFeatureAction(formData: FormData) {
  try {
    const id = formData.get("id");

    // ── Read every field explicitly by its FormData key ──
    const data = {
      category: (formData.get("category") as string) || null,
      imageUrl: (formData.get("imageUrl") as string) || null, // ← KEY FIX
      imageAlt: (formData.get("imageAlt") as string) || null,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      buttonText: (formData.get("buttonText") as string) || "Explore",
      buttonLink: (formData.get("buttonLink") as string) || null,
      openInNewTab: formData.get("openInNewTab") === "true",
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      isActive: formData.get("isActive") !== "false",
    };

    if (id) {
      await prisma.feature.update({
        where: { id: Number(id) },
        data,
      });
    } else {
      await prisma.feature.create({ data });
    }

    revalidatePath("/admin/page-editor"); // adjust to your path
    return { success: true };
  } catch (error) {
    console.error("saveFeatureAction error:", error);
    return { success: false, error: "Failed to save feature." };
  }
}

export async function deleteFeatureAction(id: number) {
  try {
    await prisma.feature.delete({ where: { id } });
    revalidatePath("/admin/page-editor");
    return { success: true };
  } catch (error) {
    console.error("deleteFeatureAction error:", error);
    return { success: false, error: "Failed to delete feature." };
  }
}
