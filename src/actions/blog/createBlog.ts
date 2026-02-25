// "use server";

// import { prisma } from "@/src/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { blogPagesSchema } from "@/src/feature/blogs/validations/blogSchema";
// import type { BlogPagesFormValues } from "@/src/feature/blogs/types/blog.types";

// export async function createBlog(raw: BlogPagesFormValues) {
//   const data = blogPagesSchema.parse(raw);

//   const blog = await prisma.blog.create({
//     data: {
//       title: data.title,
//       slug: data.slug,
//       text: data.text,
//       metaTitle: data.metaTitle,
//       metaDescription: data.metaDescription,
//       metaKeywords: data.metaKeywords,
//     },
//   });

//   revalidatePath("/admin/blogs");
//   return { success: true, blog };
// }
"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import type { BlogPagesFormValues } from "@/src/feature/blogs/types/blog.types";
import { Prisma } from "@/src/generated/prisma/client";
import { blogPagesSchema } from "@/src/feature/blogs/validations/blogSchema";

export async function createBlog(raw: BlogPagesFormValues) {
  try {
    // 1. Validate data against your Zod schema
    const data = blogPagesSchema.parse(raw);

    // 2. Create the blog in the database
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        text: data.text,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || null,
        // FIX: 'image' must be the URL string returned from your upload function
        // Ensure 'image' is the correct column name in your schema.prisma
        imageUpload: data.image || null,
      },
    });

    // 3. Clear the cache for the blog lists
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");

    return { success: true, blog };
  } catch (error: unknown) {
    console.error("CREATE_BLOG_ERROR:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          error: "This slug is already in use. Please choose another.",
        };
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  }
}
