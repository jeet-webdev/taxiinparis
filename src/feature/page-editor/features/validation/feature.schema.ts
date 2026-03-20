// src/feature/page-editor/features/validation/feature.schema.ts
import { z } from "zod";

export const featureSchema = z.object({
  // Optional string fields — accept empty string or valid string
  category: z
    .string()
    .max(100, "Category must be 100 characters or less")
    .optional()
    .or(z.literal("")),

  imageUrl: z
    .string()
    .max(500, "Image URL must be 500 characters or less")
    .optional()
    .or(z.literal("")),

  imageAlt: z
    .string()
    .max(255, "Alt text must be 255 characters or less")
    .optional()
    .or(z.literal("")),

  buttonText: z
    .string()
    .max(100, "Button text must be 100 characters or less")
    .optional()
    .or(z.literal("")),

  buttonLink: z
    .string()
    .url("Must be a valid URL (e.g. https://example.com)")
    .max(500, "Link must be 500 characters or less")
    .optional()
    .or(z.literal("")),

  // Required string fields
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or less"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be 1000 characters or less"),

  // Boolean fields — explicitly required (no .default())
  // Defaults are handled in useForm defaultValues instead
  openInNewTab: z.boolean(),

  isActive: z.boolean(),

  // Number field — explicitly required (no .default())
  sortOrder: z
    .number({ error: "Sort order must be a number" })
    .int("Sort order must be a whole number")
    .min(0, "Sort order must be 0 or greater"),
});

export type FeatureFormValues = z.infer<typeof featureSchema>;
