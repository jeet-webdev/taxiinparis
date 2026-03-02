import type { Metadata } from "next";
import { getPageBySlug } from "@/src/actions/page/getPage";
import {
  updatePage,
  type UpdatePageInput,
} from "@/src/actions/page/updatePage";
import AboutSection from "@/src/feature/page-editor/AboutUs/components/AboutSection";
import type { AboutPageFormValues } from "@/src/feature/page-editor/AboutUs/types/about.types";

export const metadata: Metadata = {
  title: "Edit About Page | Admin Dashboard",
  description: "Edit and manage About Us page content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AboutEditorPage() {
  const page = await getPageBySlug("about");

  if (!page) {
    return <div>About page not found. Please run the seed command first.</div>;
  }

  const defaultValues: AboutPageFormValues = {
    title: page.title,
    headerImage: page.imageUpload ?? null,
    imageAlt:page.imageAlt ?? "",
    content: page.content ?? "",
    metaTitle: page.metaTitle ?? "",
    metaDescription: page.metaDescription ?? "",
    metaKeywords: page.metaKeywords ?? "",
    status: (page.status as "active" | "inactive") ?? "active",
  };

  async function handleSave(data: UpdatePageInput) {
    "use server";
    return updatePage("about", data);
  }

  return (
    <>
      {/* Image Upload Component */}
      <AboutSection
        defaultValues={defaultValues}
        onSave={handleSave}
        pageId={page.id}
      />
      ;
    </>
  );
}
