export type ServicesPageFormValues = {
  title: string;
  servicesHeaderImage: File | string | null;
  content: string;

  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: "active" | "inactive";
};
