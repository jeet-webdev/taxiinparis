import { z } from "zod";

export const homePageSchema = z.object({
  title: z.string(),
  homeHeaderImage: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (!value) return true;
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
        if (!value) return true;
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        return true;
      },
      { message: "Image must be less than 5MB" },
    ),
  imageAlt: z.string().min(0).optional(),
  secureBookingTitle: z.string(),
  secureBooking: z.string(),
  reliableServices: z.string(),
  reliableServiceTitle: z.string(),
  customerServiceTitle: z.string(),
  fairPriceTitle: z.string(),

  secureBookingIcon: z.string().optional(),
  reliableServiceIcon: z.string().optional(),
  customerServiceIcon: z.string().optional(),
  fairPriceIcon: z.string().optional(),

  customerServices: z.string(),
  fairPrice: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  metaKeywords: z.string(),
  status: z.enum(["active", "inactive"]),
});

export type HomePageFormValues = z.infer<typeof homePageSchema>;
