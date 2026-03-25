"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCategoryPage(
  id: number,
  data: {
    title: string;
    slug: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ctaBtnText?: string;
    ctaBtnLink?: string;
  },
) {
  try {
    // Normalize metaKeywords: store as JSON array string (consistent with createCategoryPage)
    const keywordArray = data.metaKeywords
      ? data.metaKeywords.split(",").map((k) => k.trim())
      : [];

    // Store content as JSON object (consistent with createCategoryPage)
    const pageContentJson = {
      type: "doc",
      content: data.content,
      updatedAt: new Date().toISOString(),
    };
    const slug = data.slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const updated = await prisma.categoryPage.update({
      where: { id },
      data: {
        title: data.title,
        slug: slug,
        content: pageContentJson,
        metaTitle: data.metaTitle ?? null,
        metaDescription: data.metaDescription ?? null,
        metaKeywords: JSON.stringify(keywordArray),
        ctaBtnText: data.ctaBtnText ?? null,
        ctaBtnLink: data.ctaBtnLink ?? null,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath(
      `/admin/categories/${updated.categoryId}/edit/${updated.slug}`,
    );

    return { success: true, data: updated };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: "Database update failed" };
  }
}
