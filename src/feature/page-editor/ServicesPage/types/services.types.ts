// export type ServicesPageFormValues = {
//   title: string;
//   servicesHeaderImage: File | string | null;
//   content: string;

//   metaTitle: string;
//   metaDescription: string;
//   metaKeywords: string;
//   status: "active" | "inactive";
// };
import { servicesPageSchema } from "../validations/servicesSchema";
import z from "zod";
export type ServicesPageFormValues = z.infer<typeof servicesPageSchema>;
