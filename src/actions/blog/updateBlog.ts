"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { blogPagesSchema } from "@/src/feature/blogs/validations/blogSchema";
import type { BlogPagesFormValues } from "@/src/feature/blogs/types/blog.types";

export async function updateBlog(id: number, raw: BlogPagesFormValues) {
  const data = blogPagesSchema.parse(raw);

  const blog = await prisma.blog.update({
    where: { id },
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
  revalidatePath(`/blog/${blog.slug}`);
  return { success: true, blog };
}
