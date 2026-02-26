import FooterForm from "@/src/feature/page-editor/FooterEditor/components/FooterForm";
import { prisma } from "@/src/lib/prisma";
import { FooterData } from "@/src/feature/page-editor/FooterEditor/types/footer.types";

/**
 * Fetches existing footer data from the database.
 * We cast the Prisma result to our local FooterData type.
 */
async function getFooterData(): Promise<FooterData | null> {
  const footer = await prisma.footer.findFirst();
  if (!footer) return null;

  return footer as unknown as FooterData;
}

export default async function FooterEditorPage() {
  const initialData = await getFooterData();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Footer Editor</h1>
        <p className="text-gray-600 mt-2">
          Update your company details, social media links, and navigation items.
        </p>
      </div>

     
      <FooterForm initialData={initialData} />
    </div>
  );
}
