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

  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  status: z.enum(["active", "inactive"]),

  // ── Hero fields ──
  // heroTitle: z.string().max(255).optional().nullable(),
  heroColorTitle: z.string().max(255).optional().nullable(),
  heroSubtitle: z.string().max(255).optional().nullable(),
  heroDescription: z.string().optional().nullable(),
  heroButtonText: z.string().max(100).optional().nullable(),
  heroButtonLink: z.string().max(255).optional().nullable(),
  heroTrustText: z.string().max(255).optional().nullable(),
  heroPoint1: z.string().max(100).optional().nullable(),
  heroPoint2: z.string().max(100).optional().nullable(),
  heroPoint3: z.string().max(100).optional().nullable(),
  heroCard1Title: z.string().max(100).optional().nullable(),
  heroCard2Title: z.string().max(100).optional().nullable(),
  heroCard3Title: z.string().max(100).optional().nullable(),
  heroCardFootnote: z.string().max(255).optional().nullable(),
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
