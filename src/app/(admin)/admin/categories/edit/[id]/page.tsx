import CategoryForm from "@/src/feature/categories/component/CategoriesForm";
import { getCategoryById } from "@/src/actions/category/getCategory";
import { updateCategory } from "@/src/actions/category/updateCategory";
import { CategoryFormValues } from "@/src/feature/categories/types/categories.type";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Category | Admin Panel",
  robots: { index: false, follow: false },
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ Fix: params is a Promise in Next.js 15
}) {
  const { id } = await params; // ✅ Fix: await the params

  const category = await getCategoryById(Number(id));

  if (!category) {
    return notFound();
  }

  const defaultValues: CategoryFormValues = {
    name: category.name,
    slug: category.slug,
  };

  async function handleSave(data: CategoryFormValues) {
    "use server";
    const normalizedData = {
      ...data,
      slug: data.slug
        .toLowerCase()
        .replace(/%20/g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    };
    // return await updateCategory(Number(id), data);
    return await updateCategory(Number(id), normalizedData);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <CategoryForm
        mode="edit"
        defaultValues={defaultValues}
        onSave={handleSave}
      />
    </div>
  );
}
