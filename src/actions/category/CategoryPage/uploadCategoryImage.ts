"use server";

import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function uploadCategoryImage(
  categoryId: number | string | undefined,
  formData: FormData,
) {
  try {
    const file = formData.get("image") as File;
    if (!file) throw new Error("No file uploaded");

    const uploadDir = path.join(process.cwd(), "public/uploads/categories");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
    const filePath = path.join(uploadDir, filename);

    await sharp(buffer)
      .resize(1600, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(filePath);

    const publicPath = `/uploads/categories/${filename}`;

    return { success: true, publicPath };
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
