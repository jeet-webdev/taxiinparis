"use server";

import { prisma } from "@/src/lib/prisma";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function uploadPageImage(pageId: number, formData: FormData) {
  try {
    const file = formData.get("image") as File;
    if (!file) throw new Error("No file uploaded");

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File too large (max 5MB)");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type");
    }

    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads/pages");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
    const filePath = path.join(uploadDir, filename);

    // Process and save image
    await sharp(buffer)
      .resize(1600)
      .webp({ quality: 80 })
      .toFile(filePath);

    const publicPath = `/uploads/pages/${filename}`;

    // Update database
    await prisma.page.update({
      where: { id: pageId },
      data: { imageUpload: publicPath },
    });

    // CRITICAL: Return the path so the UI can use it!
    return { success: true, publicPath: publicPath };
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return { success: false, error: error instanceof Error ? error.message : "Upload failed" };
  }
}