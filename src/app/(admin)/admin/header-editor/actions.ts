"use server";

import { revalidatePath } from "next/cache";
import { NavLink } from "@/src/feature/page-editor/HeaderEditor/types/header.types";
import { Prisma } from "@/src/generated/prisma/client";
import { prisma } from "@/src/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function getHeaderData() {
  return await prisma.footer.findFirst();
}

/**
 * Updated Action to handle both Navigation and Logo Assets
 */
export async function updateHeaderAndLogo(formData: FormData) {
  const navLinks = JSON.parse(formData.get("navLinks") as string) as NavLink[];
  const logoAlt = formData.get("logoAlt") as string;
  const logoFile = formData.get("logoImage") as File | null;

  let logoPath: string | undefined = undefined;

  // 1. Handle Image Upload to public/assets/images
  if (logoFile && logoFile.size > 0 && logoFile.name !== 'undefined') {
    const uploadDir = join(process.cwd(), "public", "assets", "images");

    // Create a clean filename
    const fileName = `${Date.now()}-${logoFile.name.replace(/\s+/g, "-")}`;
    const physicalPath = join(uploadDir, fileName);

    try {
      // Ensure the directory exists
      await mkdir(uploadDir, { recursive: true });

      // Convert file to buffer and write to disk
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(physicalPath, buffer);

      // This is the relative path stored in DB
      logoPath = `/assets/images/${fileName}`;
    } catch (error) {
      console.error("Logo upload failed:", error);
      throw new Error("Failed to save logo image");
    }
  }

  // 2. Update the Database using upsert or checking ID
  // Using upsert ensures that if ID 1 doesn't exist yet, it creates it.
  await prisma.footer.upsert({
    where: { id: 1 },
    update: {
      navLinks: navLinks as unknown as Prisma.InputJsonValue,
      logoAlt: logoAlt,
      // CHANGED: logoImage -> logoUrl to match your schema
      ...(logoPath && { logoUrl: logoPath }), 
    },
    create: {
      id: 1,
      navLinks: navLinks as unknown as Prisma.InputJsonValue,
      logoAlt: logoAlt,
      logoUrl: logoPath || null,
    },
  });

  // 3. Clear cache to show changes globally
  revalidatePath("/", "layout");

  return { success: true };
}

/** * Keep your original function for simple nav updates
 */
export async function updateHeaderNavLinks(navLinks: NavLink[]) {
  await prisma.footer.update({
    where: { id: 1 },
    data: {
      navLinks: navLinks as unknown as Prisma.InputJsonValue,
    },
  });

  revalidatePath("/", "layout");
  return { success: true };
}