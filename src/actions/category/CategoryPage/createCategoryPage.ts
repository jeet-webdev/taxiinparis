"use server";

import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { revalidatePath } from "next/cache";

type PageState = {
  success: boolean;
  message: string;
};

export async function createCategoryPage(
  categoryId: number,
  prevState: PageState,
  formData: FormData,
): Promise<PageState> {
  try {
    const keywords = formData.get("metaKeywords") as string | null;
    const keywordArray = keywords
      ? keywords.split(",").map((k) => k.trim())
      : [];

    const contentText = formData.get("content") as string | null;

    // Build content as InputJsonValue | typeof Prisma.JsonNull
    // ✅ Use undefined instead of Prisma.JsonNull to avoid the JsonNullClass error
    let contentValue: Prisma.InputJsonValue | undefined = undefined;

    if (contentText) {
      try {
        // contentText is '{"type":"doc","content":"<html>","updatedAt":"..."}'
        // Parse and store the object directly — no double-wrapping
        const parsed = JSON.parse(contentText) as Prisma.InputJsonValue;
        contentValue = parsed;
      } catch {
        // contentText was raw HTML — wrap in the standard shape
        contentValue = {
          type: "doc",
          content: contentText,
          updatedAt: new Date().toISOString(),
        };
      }
    }

    await prisma.categoryPage.create({
      data: {
        title: formData.get("title") as string,
        // slug: formData.get("slug") as string,
        slug: (formData.get("slug") as string)
          .toLowerCase()
          .replace(/%20/g, "-")
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
        imageUpload: (formData.get("imageUpload") as string) || null,
        imageAlt: (formData.get("imageAlt") as string) || null,
        metaTitle: (formData.get("metaTitle") as string) || null,
        metaDescription: (formData.get("metaDescription") as string) || null,
        metaKeywords: JSON.stringify(keywordArray),
        // ✅ Prisma treats undefined on a Json field as DbNull (no value),
        // which avoids the JsonNullClass type mismatch entirely
        ...(contentValue !== undefined && { content: contentValue }),
        categoryId: Number(categoryId),
      },
    });

    revalidatePath("/admin/categories");

    return { success: true, message: "Page created successfully" };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Failed to create page" };
  }
}
