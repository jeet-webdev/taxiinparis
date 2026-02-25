import { z } from "zod";

export const blogPagesSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be under 150 characters"),

  slug: z
    .string()
    .min(3, "Slug is required")
    .max(60, "Slug should be under 10 characters"),
  // image: z
  //   .union([z.instanceof(File), z.string()])
  //   .nullable()
  //   .refine(
  //     (value) => {
  //       if (value instanceof File) {
  //         return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
  //       }
  //       return true;
  //     },
  //     { message: "Invalid image format (JPG, PNG, WebP only)" },
  //   ),
  image: z.string().optional().nullable(),
  text: z.string().min(20, "Text must be at least 20 characters"),

  metaTitle: z
    .string()
    .min(3, "Meta title is required")
    .max(60, "Meta title should be under 60 characters"),

  metaDescription: z
    .string()
    .min(10, "Meta description is required")
    .max(160, "Meta description should be under 160 characters"),

  metaKeywords: z.string().min(3, "Meta keywords are required"),
});

export type BlogPagesSchemaType = z.infer<typeof blogPagesSchema>;
