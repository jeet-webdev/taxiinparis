"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Language pages are regular Page rows identified by pageName = "language-page"
// Slug stores the full path e.g. "fr/corporate"
const PAGE_NAME = "language-page";

// ─────────────────────────────────────────────
// Validation schema
// ─────────────────────────────────────────────
const languagePageSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z]{2,5}\/[a-z0-9-]+$/,
      "Format: languagecode/page-name (e.g. fr/corporate)",
    ),
  content: z.string().optional().nullable(),
  imageUpload: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  metaTitle: z.string().max(255).optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type LanguagePageInput = z.infer<typeof languagePageSchema>;

// ─────────────────────────────────────────────
// Hero image upload
// ─────────────────────────────────────────────
export async function uploadLanguagePageImage(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    if (!file || file.size === 0)
      return { success: false, error: "No file uploaded" };

    const uploadDir = path.join(process.cwd(), "public/uploads/language-pages");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `hero-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.webp`;

    await sharp(buffer)
     .resize(1600)
      .webp({ quality: 85 })
      .toFile(path.join(uploadDir, filename));

    return {
      success: true,
      publicPath: `/uploads/language-pages/${filename}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

// ─────────────────────────────────────────────
// Delete old image from disk
// ─────────────────────────────────────────────
function deleteOldImage(publicPath: string | null | undefined) {
  if (!publicPath) return;
  try {
    const filePath = path.join(process.cwd(), "public", publicPath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    console.warn("Could not delete old image:", err);
  }
}

// ─────────────────────────────────────────────
// GET ALL language pages
// ─────────────────────────────────────────────
export async function getAllLanguagePages() {
  return await prisma.page.findMany({
    where: { pageName: PAGE_NAME },
    orderBy: { updatedAt: "desc" },
  });
}

// ─────────────────────────────────────────────
// GET BY SLUG (used by frontend)
// ─────────────────────────────────────────────
export async function getLanguagePageBySlug(slug: string) {
  return await prisma.page.findUnique({
    where: { slug },
  });
}

// ─────────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────────
export async function createLanguagePage(raw: LanguagePageInput) {
  try {
    const data = languagePageSchema.parse(raw);

    const existing = await prisma.page.findUnique({
      where: { slug: data.slug },
    });
    if (existing)
      return { success: false, error: "A page with this slug already exists." };

    const page = await prisma.page.create({
      data: {
        pageName: PAGE_NAME,
        title: data.title,
        slug: data.slug,
        content: data.content,
        imageUpload: data.imageUpload,
        imageAlt: data.imageAlt,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        status: data.status,
      },
    });

    revalidatePath("/admin/language-page");
    revalidatePath(`/${data.slug}`);
    return { success: true, page };
  } catch (error) {
    if (error instanceof z.ZodError)
      return { success: false, error: error.issues[0].message };
    console.error("createLanguagePage:", error);
    return { success: false, error: "Failed to create page." };
  }
}

// ─────────────────────────────────────────────
// UPDATE
// ─────────────────────────────────────────────
export async function updateLanguagePage(
  id: number,
  raw: LanguagePageInput,
  newImagePath?: string | null,
) {
  try {
    const data = languagePageSchema.parse(raw);

    // Check slug uniqueness excluding self
    const conflict = await prisma.page.findFirst({
      where: { slug: data.slug, NOT: { id } },
    });
    if (conflict)
      return { success: false, error: "A page with this slug already exists." };

    // Delete old image if a new one was uploaded
    if (newImagePath) {
      const current = await prisma.page.findUnique({ where: { id } });
      deleteOldImage(current?.imageUpload);
      data.imageUpload = newImagePath;
    }

    const page = await prisma.page.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        imageUpload: data.imageUpload,
        imageAlt: data.imageAlt,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        status: data.status,
      },
    });

    revalidatePath("/admin/language-page");
    revalidatePath(`/${data.slug}`);
    return { success: true, page };
  } catch (error) {
    if (error instanceof z.ZodError)
      return { success: false, error: error.issues[0].message };
    console.error("updateLanguagePage:", error);
    return { success: false, error: "Failed to update page." };
  }
}

// ─────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────
export async function deleteLanguagePage(id: number) {
  try {
    const page = await prisma.page.delete({ where: { id } });
    deleteOldImage(page.imageUpload);
    revalidatePath("/admin/language-page");
    revalidatePath(`/${page.slug}`);
    return { success: true };
  } catch (error) {
    console.error("deleteLanguagePage:", error);
    return { success: false, error: "Failed to delete page." };
  }
}
