"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updatePageSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().optional(),
  text: z.string().optional(),
  imageUpload: z.string().nullable().optional(),
  imageAlt: z.string().optional().nullable(),
  secureBooking: z.string().optional(),
  secureBookingTitle: z.string().optional(),
  reliableServiceTitle: z.string().optional(),
  customerServiceTitle: z.string().optional(),
  fairPriceTitle: z.string().optional(),
  reliableService: z.string().optional(),
  customerService: z.string().optional(),
  fairPrice: z.string().optional(),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export type UpdatePageInput = z.infer<typeof updatePageSchema>;

export async function updatePage(slug: string, raw: UpdatePageInput) {
  const data = updatePageSchema.parse(raw);

  const page = await prisma.page.update({
    where: { slug },
    data,
  });

  revalidatePath(`/admin/${slug}-editor`);

  // Revalidate the public-facing path
  const publicPath = slug === "home" ? "/" : `/${slug}`;
  revalidatePath(publicPath);

  return { success: true, page };
}
