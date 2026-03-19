"use server";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

import { featureSchema } from "../feature/page-editor/features/validation/feature.schema";

export async function saveFeatureAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    // Parse raw form values
    const raw = {
      category: (formData.get("category") as string) || undefined,
      imageUrl: (formData.get("imageUrl") as string) || undefined,
      imageAlt: (formData.get("imageAlt") as string) || undefined,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      buttonText: (formData.get("buttonText") as string) || undefined,
      buttonLink: (formData.get("buttonLink") as string) || undefined,
      openInNewTab: formData.get("openInNewTab") === "true",
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      isActive: formData.get("isActive") !== "false", // defaults true
    };

    // Zod validation
    const parsed = featureSchema.safeParse(raw);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return {
        success: false,
        error: firstError?.message ?? "Validation failed.",
      };
    }

    const data = {
      category: parsed.data.category || null,
      imageUrl: parsed.data.imageUrl || null,
      imageAlt: parsed.data.imageAlt || null,
      title: parsed.data.title,
      description: parsed.data.description,
      buttonText: parsed.data.buttonText || "Explore",
      buttonLink: parsed.data.buttonLink || null,
      openInNewTab: parsed.data.openInNewTab,
      sortOrder: parsed.data.sortOrder,
      isActive: parsed.data.isActive,
    };

    if (id && id.trim() !== "") {
      await prisma.feature.update({
        where: { id: parseInt(id) },
        data,
      });
    } else {
      await prisma.feature.create({ data });
    }

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
