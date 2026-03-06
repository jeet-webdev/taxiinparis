import { Prisma } from "@/src/generated/prisma/client";

export interface MainTitleObject {
  text: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  mainTitle: Prisma.JsonValue | MainTitleObject;
  description: string;
  iconType: string;
  buttonText: string | null; // Added field
  buttonLink: string | null;
  openInNewTab: boolean;
  createdAt: Date;
}

export type FeatureFormData = Omit<FeatureItem, "id" | "createdAt">;
