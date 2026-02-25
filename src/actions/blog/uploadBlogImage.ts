"use server";

import { prisma } from "@/src/lib/prisma";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function uploadBlogImage(
  blogId: number | string | undefined,
  formData: FormData,
) {
  try {
    const file = formData.get("image") as File;
    if (!file) throw new Error("No file uploaded");

    // 1. FIX: Use process.cwd() just like your working uploadPageImage
    const uploadDir = path.join(process.cwd(), "public/uploads/blogs");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
    const filePath = path.join(uploadDir, filename);

    // 2. Process and save the physical file
    await sharp(buffer)
      .resize(1600, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(filePath);

    // The browser URL path
    const publicPath = `/uploads/blogs/${filename}`;

    // 3. Convert blogId safely
    const numericId =
      typeof blogId === "string" ? parseInt(blogId, 10) : blogId;

    // 4. Update database ONLY if we have a valid ID (Edit Mode)
    // NOTE: Ensure your Prisma model for Blogs is 'blog', not 'page'
    if (numericId && numericId > 0) {
      await prisma.blog.update({
        // Changed from prisma.page to prisma.blog
        where: { id: numericId },
        data: { imageUpload: publicPath },
      });
    }

    // 5. CRITICAL: Always return the path for the UI/Editor
    return { success: true, publicPath: publicPath };
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
