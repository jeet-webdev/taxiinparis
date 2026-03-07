"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCategory(id: number) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete category." };
  }
}