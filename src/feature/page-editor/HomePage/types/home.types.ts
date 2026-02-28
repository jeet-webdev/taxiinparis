// export type HomePageFormValues = {
//   title: string;
//   homeHeaderImage: File | string | null;
//   secureBooking: string;
//   reliableServices: string;
//   customerServices: string;
//   fairPrice: string;
//   metaTitle: string;
//   metaDescription: string;
//   metaKeywords: string;
//   status: "active" | "inactive";
// };
import { z } from "zod";
// Import the schema from your validation file
import { homePageSchema } from "../validations/homeSchema";

/**
 * We use z.infer to automatically create the TypeScript type
 * based on your homePageSchema.
 * * This ensures 'homeHeaderImage' includes the 'undefined' type
 * created by the .optional() flag.
 */
export type HomePageFormValues = z.infer<typeof homePageSchema>;
