import { z } from "zod";
import { homePageSchema } from "../validations/homeSchema";

export type HomePageFormValues = z.infer<typeof homePageSchema>;
