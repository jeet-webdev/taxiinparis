import type { Metadata } from "next";
import { getPageBySlug } from "@/src/actions/page/getPage";
import { updatePage, type UpdatePageInput } from "@/src/actions/page/updatePage";
import HomePageSection from "@/src/feature/page-editor/HomePage/components/HomeSection";
import type { HomePageFormValues } from "@/src/feature/page-editor/HomePage/types/home.types";

export const metadata: Metadata = {
  title: "Edit Home Page | Admin Dashboard",
  description: "Edit and manage Home page content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function HomeEditorPage() {
  const page = await getPageBySlug("home");

  if (!page) {
    return <div>Home page not found. Please run the seed command first.</div>;
  }

  const defaultValues: HomePageFormValues = {
    title: page.title,
    homeHeaderImage: page.imageUpload ?? null,
    secureBooking: page.secureBooking ?? "",
    reliableServices: page.reliableService ?? "",
    customerServices: page.customerService ?? "",
    fairPrice: page.fairPrice ?? "",
    metaTitle: page.metaTitle ?? "",
    metaDescription: page.metaDescription ?? "",
    metaKeywords: page.metaKeywords ?? "",
    status: (page.status as "active" | "inactive") ?? "active",
  };

  async function handleSave(data: UpdatePageInput) {
    "use server";
    return updatePage("home", data);
  }

  return <HomePageSection defaultValues={defaultValues} onSave={handleSave} />;
}
