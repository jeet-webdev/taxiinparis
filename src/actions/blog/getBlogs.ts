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

export async function getBlogByTitle(title: string) {
  // Decode the URL title (e.g., "Paris%20City" -> "Paris City")
  const decodedTitle = decodeURIComponent(title);

  return prisma.blog.findFirst({
    where: {
      title: {
        equals: decodedTitle,
        mode: "insensitive",
      },
    },
  });
}

export async function getBlogPage(page: number = 1, limit: number = 6) {
  // Calculate how many items to skip (e.g., Page 2 skips the first 6 items)
  const skip = (page - 1) * limit;

  try {
    // We use Promise.all to fetch data and count simultaneously for speed
    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        where: {
          status: "active", // Only fetch blogs that are not hidden
        },
        orderBy: {
          createdAt: "desc", // Show newest blogs first
        },
        skip: skip,
        take: limit,
      }),
      prisma.blog.count({
        where: { status: "active" },
      }),
    ]);

    return {
      blogs,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      hasMore: page < Math.ceil(totalCount / limit),
    };
  } catch (error) {
    console.error("Error fetching blog page:", error);
    return { blogs: [], totalCount: 0, totalPages: 0, hasMore: false };
  }
}
