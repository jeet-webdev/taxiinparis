"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
// import { FooterData } from "./types/footer.types";
// import { Prisma } from "@prisma/client";
import { FooterData } from "@/src/feature/page-editor/FooterEditor/types/footer.types";
import { Prisma } from "@/src/generated/prisma/client";
export async function saveFooterData(data: FooterData) {
  try {
    // 1. Check if a footer record already exists
    const existingFooter = await prisma.footer.findFirst();

    // 2. Prepare the data payload
    // We cast the arrays to Prisma.InputJsonValue to ensure type safety without using 'any'
    const payload = {
      title: data.title,
      tagline: data.tagline,
      email: data.email,
      phone: data.phone,
      copyrightText: data.copyrightText,
      socialLinks: data.socialLinks as unknown as Prisma.InputJsonValue,
      navLinks: data.navLinks as unknown as Prisma.InputJsonValue,
      appLinks: data.appLinks as unknown as Prisma.InputJsonValue,
      paymentLinks: data.paymentLinks as unknown as Prisma.InputJsonValue,
    };

    if (existingFooter) {
      // Update existing record
      await prisma.footer.update({
        where: { id: existingFooter.id },
        data: payload,
      });
    } else {
      // Create new record if database is empty
      await prisma.footer.create({
        data: payload,
      });
    }

    // 3. Clear the Next.js cache so the change reflects on the public site
    revalidatePath("/"); 
    
    return { success: true, message: "Footer updated successfully!" };
  } catch (error) {
    console.error("Footer Save Error:", error);
    return { success: false, message: "Database error. Please try again." };
  }
}