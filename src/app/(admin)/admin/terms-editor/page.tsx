import type { Metadata } from "next";
import { getPageBySlug } from "@/src/actions/page/getPage";
import { updatePage, type UpdatePageInput } from "@/src/actions/page/updatePage";
import TermsSection from "@/src/feature/page-editor/TermsPage/components/TermsSection";
import type { TermsPageFormValues } from "@/src/feature/page-editor/TermsPage/types/terms.types";

export const metadata: Metadata = {
  title: "Edit Terms Page | Admin Dashboard",
  description: "Edit and manage Terms page content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function TermsEditorPage() {
  const page = await getPageBySlug("terms");

  if (!page) {
    return <div>Terms page not found. Please run the seed command first.</div>;
  }

  const defaultValues: TermsPageFormValues = {
    title: page.title,
    content: page.content ?? "",
    metaTitle: page.metaTitle ?? "",
    metaDescription: page.metaDescription ?? "",
    metaKeywords: page.metaKeywords ?? "",
    status: (page.status as "active" | "inactive") ?? "active",
  };

  async function handleSave(data: UpdatePageInput) {
    "use server";
    return updatePage("terms", data);
  }

  return <TermsSection defaultValues={defaultValues} onSave={handleSave} />;
}
