// export type AboutPageFormValues = {
//   title: string;
//   headerImage: File | string | null;
//   // imageAlt: string;
//   imageAlt?: string | undefined
//   content: string;
//   metaTitle: string;
//   metaDescription: string;
//   metaKeywords: string;
// status: "active" | "inactive";
// };

import { z } from "zod";
import { aboutPageSchema } from "../validations/aboutSchema";

export type AboutPageFormValues = z.infer<typeof aboutPageSchema>;
