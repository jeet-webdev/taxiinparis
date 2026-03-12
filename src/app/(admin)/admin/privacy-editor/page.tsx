import { getPageBySlug } from "@/src/actions/page/getPage";
import { updatePage, UpdatePageInput } from "@/src/actions/page/updatePage";
// import PrivacySection from "../components/PrivacySection";
import PrivacySection from "@/src/feature/page-editor/PrivacyEditor/components/PrivacySection";
import { notFound } from "next/navigation";
import { Box } from "@mui/material"; // Fixed: Added missing Box import

export default async function PrivacyEditorPage() {
  const page = await getPageBySlug("privacy");

  if (!page) {
    notFound();
  }

  // Fixed: Replaced 'any' with the actual type from your action
  const handleSave = async (data: UpdatePageInput) => {
    "use server";
    // Assuming your updatePage action accepts (slug, data)
    return await updatePage("privacy", data);
  };

  return (
    <Box p={3}>
      <PrivacySection
        defaultValues={{
          title: page.title ?? "",
          content: page.content ?? "",
          metaTitle: page.metaTitle ?? "",
          metaDescription: page.metaDescription ?? "",
          metaKeywords: page.metaKeywords ?? "",
          // FIX: Force the status to be one of the two allowed strings
          status: page.status === "inactive" ? "inactive" : "active",
        }}
        onSave={handleSave}
      />
    </Box>
  );
}
