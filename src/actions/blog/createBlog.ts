"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { blogPagesSchema } from "@/src/feature/blogs/validations/blogSchema";
import type { BlogPagesFormValues } from "@/src/feature/blogs/types/blog.types";

export async function createBlog(raw: BlogPagesFormValues) {
  const data = blogPagesSchema.parse(raw);

  const blog = await prisma.blog.create({
    data: {
      title: data.title,
      slug: data.slug,
      text: data.text,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: data.metaKeywords,
    },
  });

  revalidatePath("/admin/blogs");
  return { success: true, blog };
}
