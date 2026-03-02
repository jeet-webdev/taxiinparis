import type { Metadata } from "next";
import { getPageBySlug } from "@/src/actions/page/getPage";
import {
  updatePage,
  type UpdatePageInput,
} from "@/src/actions/page/updatePage";
import ServicesSection from "@/src/feature/page-editor/ServicesPage/components/ServicesSection";
import type { ServicesPageFormValues } from "@/src/feature/page-editor/ServicesPage/types/services.types";

export const metadata: Metadata = {
  title: "Edit Service Page | Admin Dashboard",
  description: "Edit and manage Service page content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ServiceEditorPage() {
  const page = await getPageBySlug("services");

  if (!page) {
    return (
      <div>Services page not found. Please run the seed command first.</div>
    );
  }

  const defaultValues: ServicesPageFormValues = {
    title: page.title,
    servicesHeaderImage: page.imageUpload ?? null,
    imageAlt: page.imageAlt ?? "",
    content: page.content ?? "",
    metaTitle: page.metaTitle ?? "",
    metaDescription: page.metaDescription ?? "",
    metaKeywords: page.metaKeywords ?? "",
    status: (page.status as "active" | "inactive") ?? "active",
  };

  async function handleSave(data: UpdatePageInput) {
    "use server";
    return updatePage("services", data);
  }

  return (
    <ServicesSection
      defaultValues={defaultValues}
      onSave={handleSave}
      pageId={page.id}
    />
  );
}
