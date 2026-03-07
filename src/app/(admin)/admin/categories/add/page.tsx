import { createCategory } from "@/src/actions/category/createCategory";
import type { CategoryFormValues } from "@/src/feature/categories/types/categories.type";
// import CategoryForm from "@/src/feature/categories/component/categoriesForm";
import CategoryForm from "@/src/feature/categories/component/CategoriesForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Category | Admin Panel",
  robots: { index: false, follow: false },
};

const emptyDefaults: CategoryFormValues = {
  name: "",
  slug: "",
};

export default function AddCategoryPage() {
  async function handleSave(data: CategoryFormValues) {
    "use server";
    return createCategory(data);
  }

  return (
    <CategoryForm
      mode="add"
      defaultValues={emptyDefaults}
      onSave={handleSave}
    />
  );
}
