// src/app/admin/feature-editor/page.tsx  (or wherever your admin page lives)

import { prisma } from "@/src/lib/prisma";
import { FeatureForm } from "@/src/feature/page-editor/features/components/featureForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FeatureEditorPage() {
  //   const features = await prisma.feature.findMany({
  //     orderBy: { sortOrder: "asc" },
  //   });
  const [features, mainTitleRow] = await Promise.all([
    prisma.feature.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.feature.findFirst({
      select: { mainTitle: true },
      orderBy: { id: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8B6C26] mb-2">
            Page Editor
          </p>
          <h1 className=" text-[#000] font-serif font-semibold">
            Feature Section
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the dining &amp; experience cards shown on the homepage.
          </p>
        </div>

        <FeatureForm
          initialFeatures={features}
          initialMainTitle={mainTitleRow?.mainTitle ?? ""}
        />
      </div>
    </div>
  );
}
