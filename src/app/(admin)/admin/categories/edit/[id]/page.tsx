// import CategoryForm from "@/src/feature/categories/component/CategoriesForm";
// import { getCategoryById } from "@/src/actions/category/getCategory"; // Ensure this is imported
// import { updateCategory } from "@/src/actions/category/updateCategory";
// import { CategoryFormValues } from "@/src/feature/categories/types/categories.type";
// import { notFound } from "next/navigation";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Edit Category | Admin Panel",
//   robots: { index: false, follow: false },
// };

// export default async function EditCategoryPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   // 1. Fetch data using the specific ID from params
//   const category = await getCategoryById(Number(params.id));

//   if (!category) {
//     return notFound();
//   }

//   // 2. Prepare the initial values for the form
//   const defaultValues: CategoryFormValues = {
//     name: category.name,
//     slug: category.slug,
//   };

//   // 3. Define the server action to handle updates
//   async function handleSave(data: CategoryFormValues) {
//     "use server";
//     // Ensure updateCategory matches the arguments: (id, formData) or (id, data)
//     // Based on our previous setup, this returns a Promise<CategoryFormState>
//     return await updateCategory(Number(params.id), data);
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
//       <CategoryForm
//         mode="edit"
//         defaultValues={defaultValues}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }

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
    return await updateCategory(Number(id), data);
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
