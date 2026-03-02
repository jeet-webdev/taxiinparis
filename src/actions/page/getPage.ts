"use server";

import { prisma } from "@/src/lib/prisma";

export async function getPageBySlug(slug: string) {
  // return prisma.page.findFirst({ //findUnique
  return prisma.page.findUnique({
    where: { slug },
  });
}
