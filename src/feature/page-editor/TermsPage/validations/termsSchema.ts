import { z } from "zod";

export const termsPageSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be under 150 characters"),

  content: z
    .string()
    .min(20, "Content must be at least 20 characters"),

  metaTitle: z
    .string()
    .min(3, "Meta title is required")
    .max(60, "Meta title should be under 60 characters"),

  metaDescription: z
    .string()
    .min(10, "Meta description is required")
    .max(160, "Meta description should be under 160 characters"),

  metaKeywords: z
    .string()
    .min(3, "Meta keywords are required"),

  status: z.enum(["active", "inactive"]),
});

export type TermsPageSchemaType = z.infer<typeof termsPageSchema>;