import { z } from "zod";

export const blogPagesSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required"),
  image: z.string().optional().nullable(),
  text: z.string().min(20, "Text must be at least 20 characters"),
  bannerImage: z.any().optional().nullable(),
  bannerAlt: z.string().optional().nullable(),
  metaTitle: z.string().min(3, "Meta title is required"),
  metaDescription: z.string(),
  metaKeywords: z.string(),
  ctaBtnText: z.string().optional().nullable(),
  ctaBtnLink: z.string().optional().nullable(),
});

export type BlogPagesSchemaType = z.infer<typeof blogPagesSchema>;
