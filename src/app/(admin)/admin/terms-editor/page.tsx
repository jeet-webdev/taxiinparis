import TermsSection from "@/src/features/page-editor/TermsPage/components/TermsSection";
import { TermsPageFormValues } from "@/src/features/page-editor/TermsPage/types/terms.types";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
// import { prisma } from "@/src/lib/prisma";


export const metadata: Metadata = {
  title: "Edit Terms Page | Admin Dashboard",
  description: "Edit and manage Terms page content.",
  robots: {
    index: false,   // important for admin pages
    follow: false,
  },
};


export default async function TermsEditorPage() {
  // const page = await prisma.page.findFirst({
  //   where: { slug: "terms-editor" },
  // });
  const page: TermsPageFormValues = {
    title: "Get to Know Us - Taxi in Paris",
    content: "Taxi in Paris is your best choice...",
    metaTitle: "Book Paris Taxi Service at Cheapest Fare | Taxis in Paris",
    metaDescription: "string",
    metaKeywords: "string",
    status: "active",
  };


  // async function updateTermsSection(id: string, content: string) {
  //   "use server";

  //   await prisma.page.update({
  //     where: { id },
  //     data: {
  //       content,
  //       updatedAt: new Date(),
  //     },
  //   });

  //   // if you have public /terms page
  //   revalidatePath("/terms-editor");
  // }
  return <TermsSection defaultValues={page} />;
}