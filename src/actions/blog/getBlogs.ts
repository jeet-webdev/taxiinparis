"use server";

import { prisma } from "@/src/lib/prisma";

export async function getBlogs() {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogById(id: number) {
  return prisma.blog.findUnique({ where: { id } });
}
