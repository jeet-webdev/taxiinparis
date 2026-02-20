export type AboutPageFormValues = {
  title: string;
  headerImage: File | string | null;
  content: string;

  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
status: "active" | "inactive";
};