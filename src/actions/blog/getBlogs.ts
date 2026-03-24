"use server";

import { prisma } from "@/src/lib/prisma";

/**
 * Fetches all blogs without pagination.
 */
export async function getBlogs() {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Fetches a single blog by its ID.
 */
export async function getBlogById(id: number) {
  return prisma.blog.findUnique({ where: { id } });
}

/**
 * Fetches a single blog by its Slug.
 * (This is what your error message is looking for!)
 */
export async function getBlogBySlug(slug: string) {
  return prisma.blog.findFirst({
    where: {
      slug: {
        equals: slug,
        mode: "insensitive",
      },
      status: "active",
    },
  });
}

/**
 * Fetches a single blog by its Title.
 */
export async function getBlogByTitle(title: string) {
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

/**
 * Fetches paginated blogs.
 * Pass limit: 0 to fetch all active blogs (useful for sitemaps).
 */
export async function getBlogPage(page: number = 1, limit: number = 6) {
  const isAll = limit === 0;
  const skip = isAll ? 0 : (page - 1) * limit;
  const take = isAll ? undefined : limit;

  try {
    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        where: {
          status: "active",
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: skip,
        take: take,
      }),
      prisma.blog.count({
        where: { status: "active" },
      }),
    ]);

    return {
      blogs,
      totalCount,
      totalPages: isAll ? 1 : Math.ceil(totalCount / limit),
      hasMore: isAll ? false : page < Math.ceil(totalCount / limit),
    };
  } catch (error) {
    console.error("Error fetching blog page:", error);
    return { blogs: [], totalCount: 0, totalPages: 0, hasMore: false };
  }
}
