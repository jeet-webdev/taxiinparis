// src/feature/page-editor/PrivacyEditor/types/privacySchema.ts
import { z } from "zod";

export const privacyPageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  metaTitle: z.string().optional().or(z.literal("")),
  metaDescription: z.string().optional().or(z.literal("")),
  metaKeywords: z.string().optional().or(z.literal("")),
  status: z.enum(["active", "inactive"]),
});

export type PrivacyPageFormValues = z.infer<typeof privacyPageSchema>;
