import { prisma } from "@/src/lib/prisma";
import { FeatureForm } from "@/src/feature/page-editor/features/components/featureForm";
export const dynamic = "force-dynamic"; // ✅ add this
export const revalidate = 0;
export default async function FeatureEditorPage() {
  // Fetch initial data to pass to the client

  const features = await prisma.feature.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Manage Feature Section & Why Choose Us
      </h1>

      <FeatureForm initialFeatures={features} />
    </div>
  );
}
