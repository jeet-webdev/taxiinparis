export type AboutPageFormValues = {
  title: string;
  AboutheaderImage: File | string | null;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
status: "active" | "inactive";
};