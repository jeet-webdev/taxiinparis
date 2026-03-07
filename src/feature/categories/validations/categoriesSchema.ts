import { z } from "zod";

// Schema for creating a Category
export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase and URL-friendly"),
});

// Schema for CategoryPage (since it has more complex fields)
export const categoryPageSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  categoryId: z.number().int().positive(), // Ensures it links to a valid parent
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});