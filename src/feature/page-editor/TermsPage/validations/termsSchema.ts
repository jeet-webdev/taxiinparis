import { z } from "zod";

export const termsPageSchema = z.object({
  title: z.string(),
  content: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  metaKeywords: z.string(),
  status: z.enum(["active", "inactive"]),
});

export type TermsPageSchemaType = z.infer<typeof termsPageSchema>;
