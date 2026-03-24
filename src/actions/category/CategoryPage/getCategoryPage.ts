"use server";

import { prisma } from "@/src/lib/prisma";

export async function getCategoryPageBySlug(slug: string) {
  if (!slug) return null;

  try {
    // If your schema uses 'CategoryPage', Prisma Client often uses 'categoryPage'
    const page = await prisma.categoryPage.findUnique({
      where: { slug: slug },
      include: {
        category: true,
      },
    });

    return page;
  } catch (error) {
    console.error("Error fetching category page:", error);
    return null;
  }
}
