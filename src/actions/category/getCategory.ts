// "use server";

// import { prisma } from "@/src/lib/prisma";

// export async function getCategories() {
//   return prisma.category.findMany({
//     orderBy: { createdAt: "desc" },
//   });
// }

// export async function getCategoryById(id: number) {
//   return prisma.category.findUnique({ where: { id } });
// }

// src/actions/category/getCategory.ts
"use server";
// Use the direct import. Ensure this path is correct based on your project structure.
import { prisma } from "@/src/lib/prisma";

export async function getCategories() {
  // Directly call prisma.category. Do not await the prisma object itself.
  return await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
}
export async function getCategoryById(id: number) {
  return await prisma.category.findUnique({ where: { id } });
}
// In src/actions/category/getCategory.ts
export async function getCategoryWithPages(id: number) {
  return await prisma.category.findUnique({
    where: { id },
    include: { categoryPages: true }, // This fetches all child pages
  });
}
