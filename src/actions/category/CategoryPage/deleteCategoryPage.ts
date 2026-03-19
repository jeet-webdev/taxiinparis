"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePageFromCategory(
  pageId: number,
  categoryId: number,
): Promise<{ success: boolean }> {
  try {
    await prisma.categoryPage.delete({
      where: {
        id: pageId,
        categoryId: categoryId,
      },
    });

    revalidatePath("/admin/categories");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete page:", error);
    return { success: false };
  }
}
