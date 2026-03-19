// src/feature/page-editor/features/types/feature.types.ts

export interface FeatureItem {
  id: number;
  category?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  title: string;
  description: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  openInNewTab: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
