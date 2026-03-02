export type ServicesPageFormValues = {
  title: string;
  servicesHeaderImage: File | string | null;
  imageAlt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: "active" | "inactive";
};
