"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/src/generated/prisma/client";

export async function updateCategory(
  id: number,
  data: { name: string; slug: string },
) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true, category };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, error: "This slug is already in use." };
      }
      if (error.code === "P2025") {
        return { success: false, error: "Category not found." };
      }
    }
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  }
}
