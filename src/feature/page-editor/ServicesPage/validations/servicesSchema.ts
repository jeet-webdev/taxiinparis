import { z } from "zod";

export const servicesPageSchema = z.object({
  title: z.string(),
  servicesHeaderImage: z
    .union([z.instanceof(File), z.string().url("Invalid image URL")])
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
  metaKeywords: z.string(),
  status: z.enum(["active", "inactive"]),
});

export type ServicesPageSchemaType = z.infer<typeof servicesPageSchema>;
