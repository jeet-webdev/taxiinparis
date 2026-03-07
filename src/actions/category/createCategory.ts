"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/src/generated/prisma/client";

export async function createCategory(data: { name: string; slug: string }) {
  try {
    const category = await prisma.category.create({
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
    }
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  }
}