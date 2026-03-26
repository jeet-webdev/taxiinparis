"use server";

import { prisma } from "@/src/lib/prisma";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { revalidatePath } from "next/cache";

export async function uploadBlogBannerImage(
  blogId: number | string | undefined,
  formData: FormData,
) {
  try {
    const file = formData.get("image") as File;
    if (!file || file.size === 0) {
      throw new Error("No banner file uploaded");
    }

    const uploadDir = path.join(process.cwd(), "public/uploads/blog-banners");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `banner-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.webp`;

    const filePath = path.join(uploadDir, filename);

    await sharp(buffer)
      .resize(1600)
      .webp({ quality: 85 })
      .toFile(filePath);

    const publicPath = `/uploads/blog-banners/${filename}`;

    const numericId =
      typeof blogId === "string" ? parseInt(blogId, 10) : blogId;

    // Update DB only in Edit mode
    if (numericId && numericId > 0) {
      const updatedBlog = await prisma.blog.update({
        where: { id: numericId },
        data: {
          bannerImage: publicPath,
        },
      });

      if (updatedBlog.slug) {
        revalidatePath(`/blog/${updatedBlog.slug}`);
      }

      revalidatePath("/blog");
    }

    return { success: true, publicPath };
  } catch (error) {
    console.error("BANNER UPLOAD ERROR:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Banner upload failed",
    };
  }
}
