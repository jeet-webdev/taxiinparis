// src/app/(admin)/admin/language-page/page.tsx

import type { Metadata } from "next";
import { getAllLanguagePages } from "@/src/actions/languagePageActions";
// import LanguagePagesAdmin from "@/src/feature/page-editor/LanguagePage/components/LanguagePagesAdmin";
import LanguagePagesAdmin from "@/src/feature/LanguagePage/components/LanguagePagesAdmin";

export const metadata: Metadata = {
  title: "Language Pages | Admin Dashboard",
};

export default async function LanguagePageAdminPage() {
  const pages = await getAllLanguagePages();
  return <LanguagePagesAdmin initialPages={pages} />;
}
