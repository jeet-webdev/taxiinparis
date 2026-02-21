export type HomePageFormValues = {
  title: string;
  homeHeaderImage: File | string | null;
  secureBooking: string;
  reliableServices: string;
  customerServices: string;
  fairPrice: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: "active" | "inactive";
};
