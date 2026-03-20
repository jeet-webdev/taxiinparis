import { z } from "zod";

export const homePageSchema = z.object({
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
  secureBookingTitle: z.string().optional().or(z.literal("")),
  secureBooking: z.string().optional().or(z.literal("")),
  reliableServices: z.string().optional().or(z.literal("")),
  reliableServiceTitle: z.string().optional().or(z.literal("")),
  customerServiceTitle: z.string().optional().or(z.literal("")),
  fairPriceTitle: z.string().optional().or(z.literal("")),

  secureBookingIcon: z.string().optional(),
  reliableServiceIcon: z.string().optional(),
  customerServiceIcon: z.string().optional(),
  fairPriceIcon: z.string().optional(),

  customerServices: z.string().optional().or(z.literal("")),
  fairPrice: z.string().optional().or(z.literal("")),
  metaTitle: z.string().optional().or(z.literal("")),
  metaDescription: z.string().optional().or(z.literal("")),
  metaKeywords: z.string().optional().or(z.literal("")),
  status: z.enum(["active", "inactive"]),

  // ── Hero  ──
  title: z.string(),
  heroColorTitle: z.string().max(255).optional().or(z.literal("")),
  heroSubtitle: z.string().max(255).optional().or(z.literal("")),
  heroDescription: z.string().optional().or(z.literal("")),
  heroButtonText: z.string().max(100).optional().or(z.literal("")),
  heroButtonLink: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || v.startsWith("http") || v.startsWith("/"), {
      message: "Must be a valid URL or path starting with /",
    }),
  heroTrustText: z.string().max(255).optional().or(z.literal("")),
  heroPoint1: z.string().max(100).optional().or(z.literal("")),
  heroPoint2: z.string().max(100).optional().or(z.literal("")),
  heroPoint3: z.string().max(100).optional().or(z.literal("")),
  heroCard1Title: z.string().max(100).optional().or(z.literal("")),
  heroCard2Title: z.string().max(100).optional().or(z.literal("")),
  heroCard3Title: z.string().max(100).optional().or(z.literal("")),
  heroCardFootnote: z.string().max(255).optional().or(z.literal("")),
});

export type HomePageFormValues = z.infer<typeof homePageSchema>;
