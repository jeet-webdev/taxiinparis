import { z } from "zod";

export const servicesPageSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be under 150 characters"),

servicesHeaderImage: z
  .union([
    z.instanceof(File),
    z.string().url("Invalid image URL"),
  ])
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
    { message: "Invalid image format" }
  )
  .refine(
    (value) => {
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }
      return true;
    },
    { message: "Image must be less than 5MB" }
  ),

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

export type ServicesPageSchemaType = z.infer<typeof servicesPageSchema>;