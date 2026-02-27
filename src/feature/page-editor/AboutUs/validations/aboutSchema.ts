import { z } from "zod";

export const aboutPageSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be under 150 characters"),

  headerImage: z
    .union([z.instanceof(File), z.string(), z.null(), z.undefined()])
    .nullable()
    .refine(
      (value) => {
        if (value instanceof File) {
          return [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/svg+xml",
          ].includes(value.type);
        }
        return true;
      },
      { message: "Invalid image format" },
    )
    .refine(
      (value) => {
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        return true;
      },
      { message: "Image must be less than 5MB" },
    ),

  content: z.string(),

  metaTitle: z.string(),

  metaDescription: z.string(),

  metaKeywords: z.string().min(3, "Meta keywords are required"),

  status: z.enum(["active", "inactive"]),
});

export type AboutPageSchemaType = z.infer<typeof aboutPageSchema>;
