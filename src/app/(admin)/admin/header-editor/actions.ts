// "use server";

// import { prisma } from "@/src/lib/prisma";
// import fs from "fs";
// import path from "path";
// import sharp from "sharp";
// import { Prisma } from "@/src/generated/prisma/client";
// import { revalidatePath } from "next/cache";
// import { NavLink } from "@/src/feature/page-editor/HeaderEditor/types/header.types";

// export async function getHeaderData() {
//   return await prisma.footer.findFirst({
//     where: { id: 1 },
//   });
// }

// // ─────────────────────────────────────────────
// // Shared helper — uploads any logo file to a given subdir
// // Returns the public path string or null if no file provided
// // ─────────────────────────────────────────────
// async function uploadLogoFile(
//   file: File | null,
//   subDir: string,
// ): Promise<string | null> {
//   if (!file || file.size === 0) return null;

//   if (file.size > 5 * 1024 * 1024) {
//     throw new Error("Logo too large (max 5MB)");
//   }

//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/webp",
//     "image/svg+xml",
//   ];
//   if (!allowedTypes.includes(file.type)) {
//     throw new Error("Invalid logo file type");
//   }

//   const uploadDir = path.join(process.cwd(), `public/uploads/${subDir}`);
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const filename = `logo-${Date.now()}-${Math.random()
//     .toString(36)
//     .substring(2, 8)}.webp`;

//   const filePath = path.join(uploadDir, filename);

//   await sharp(buffer).resize(800).webp({ quality: 90 }).toFile(filePath);

//   return `/uploads/${subDir}/${filename}`;
// }

// export async function updateHeaderAndLogo(formData: FormData) {
//   try {
//     const navLinks = JSON.parse(
//       formData.get("navLinks") as string,
//     ) as NavLink[];

//     // ── Desktop logo ──
//     const logoAlt = formData.get("logoAlt") as string;
//     const logoFile = formData.get("logoImage") as File | null;
//     const desktopPath = await uploadLogoFile(logoFile, "logo");

//     // ── Mobile logo ──
//     const mobileLogoAlt = (formData.get("mobileLogoAlt") as string) ?? "";
//     const mobileLogoFile = formData.get("mobileLogoImage") as File | null;
//     const mobilePath = await uploadLogoFile(mobileLogoFile, "logo-mobile");

//     // Build update object explicitly so mobileLogoAlt always saves
//     // and mobileLogoUrl only updates when a new file was uploaded
//     const updateData: Prisma.FooterUpdateInput = {
//       navLinks: navLinks as unknown as Prisma.InputJsonValue,
//       logoAlt: logoAlt,
//       mobileLogoAlt: mobileLogoAlt,
//     };
//     if (desktopPath) updateData.logoUrl = desktopPath;
//     if (mobilePath) updateData.mobileLogoUrl = mobilePath;

//     await prisma.footer.upsert({
//       where: { id: 1 },
//       update: updateData,
//       create: {
//         id: 1,
//         navLinks: navLinks as unknown as Prisma.InputJsonValue,
//         logoAlt: logoAlt,
//         logoUrl: desktopPath,
//         mobileLogoAlt: mobileLogoAlt,
//         mobileLogoUrl: mobilePath,
//       },
//     });

//     revalidatePath("/", "layout");

//     return {
//       success: true,
//       desktopPath,
//       mobilePath,
//     };
//   } catch (error) {
//     console.error("LOGO UPLOAD ERROR:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Logo upload failed",
//     };
//   }
// }
"use server";

import { prisma } from "@/src/lib/prisma";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { Prisma } from "@/src/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { NavLink } from "@/src/feature/page-editor/HeaderEditor/types/header.types";

export async function getHeaderData() {
  return await prisma.footer.findFirst({
    where: { id: 1 },
  });
}

// ─────────────────────────────────────────────
// Deletes a file from public/ given its public path
// e.g. "/uploads/logo-mobile/logo-123.webp"
// ─────────────────────────────────────────────
function deletePublicFile(publicPath: string | null | undefined) {
  if (!publicPath) return;
  try {
    const filePath = path.join(process.cwd(), "public", publicPath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    // Non-fatal — log but don't crash the request
    console.warn("Could not delete old file:", publicPath, err);
  }
}

// ─────────────────────────────────────────────
// Uploads a logo file to public/uploads/<subDir>/
// Returns the public path or null if no file given
// ─────────────────────────────────────────────
async function uploadLogoFile(
  file: File | null,
  subDir: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Logo too large (max 5MB)");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid logo file type");
  }

  const uploadDir = path.join(process.cwd(), `public/uploads/${subDir}`);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `logo-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}.webp`;

  const filePath = path.join(uploadDir, filename);

  await sharp(buffer).resize(800).webp({ quality: 90 }).toFile(filePath);

  return `/uploads/${subDir}/${filename}`;
}

export async function updateHeaderAndLogo(formData: FormData) {
  try {
    const navLinks = JSON.parse(
      formData.get("navLinks") as string,
    ) as NavLink[];

    // ── Desktop logo ──
    const logoAlt = formData.get("logoAlt") as string;
    const logoFile = formData.get("logoImage") as File | null;

    // ── Mobile logo ──
    const mobileLogoAlt = (formData.get("mobileLogoAlt") as string) ?? "";
    const mobileLogoFile = formData.get("mobileLogoImage") as File | null;

    // Fetch current DB record so we know the old file paths
    const existing = await prisma.footer.findUnique({ where: { id: 1 } });

    // Upload new files (returns null if no new file was provided)
    const desktopPath = await uploadLogoFile(logoFile, "logo");
    const mobilePath = await uploadLogoFile(mobileLogoFile, "logo-mobile");

    // ── Delete old files only when a new one is successfully uploaded ──
    if (desktopPath && existing?.logoUrl) {
      deletePublicFile(existing.logoUrl);
    }
    if (mobilePath && existing?.mobileLogoUrl) {
      deletePublicFile(existing.mobileLogoUrl);
    }

    // Build update payload — always save alt text, only update URL if new file uploaded
    const updateData: Prisma.FooterUpdateInput = {
      navLinks: navLinks as unknown as Prisma.InputJsonValue,
      logoAlt: logoAlt,
      mobileLogoAlt: mobileLogoAlt,
    };
    if (desktopPath) updateData.logoUrl = desktopPath;
    if (mobilePath) updateData.mobileLogoUrl = mobilePath;

    await prisma.footer.upsert({
      where: { id: 1 },
      update: updateData,
      create: {
        id: 1,
        navLinks: navLinks as unknown as Prisma.InputJsonValue,
        logoAlt: logoAlt,
        logoUrl: desktopPath,
        mobileLogoAlt: mobileLogoAlt,
        mobileLogoUrl: mobilePath,
      },
    });

    revalidatePath("/", "layout");

    return { success: true, desktopPath, mobilePath };
  } catch (error) {
    console.error("LOGO UPLOAD ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Logo upload failed",
    };
  }
}
