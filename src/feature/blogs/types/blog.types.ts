export type BlogPagesFormValues = {
  title: string;
  text: string;
  image?: string | null; // Added image
  bannerImage?: string | File | null;
  bannerAlt?: string | null;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ctaBtnText?: string | null;   // ADD
  ctaBtnLink?: string | null;   // ADD
};
