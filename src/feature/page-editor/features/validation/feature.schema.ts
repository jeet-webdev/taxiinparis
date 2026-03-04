import { z } from "zod";

// Define a more specific schema for the JSON object
const MainTitleObjectSchema = z.object({
  text: z.string(),
});

export const FeatureSchema = z.object({
  // Accept either a direct string or the specific object { text: string }
  mainTitle: z.union([z.string(), MainTitleObjectSchema]).optional(),

  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  iconType: z.string().min(1, "Icon type is required"),
});
