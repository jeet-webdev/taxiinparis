import CategoriesTable from "@/src/feature/categories/component/CategoriesTable";
import type { CategoryRow } from "@/src/feature/categories/component/CategoriesTable";
import { getCategories } from "@/src/actions/category/getCategory";
import { deleteCategory } from "@/src/actions/category/deleteCategory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Admin Dashboard",
  description: "Manage categories.",
  robots: { index: false, follow: false },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  const rows: CategoryRow[] = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    createdAt: cat.createdAt,
  }));

  async function handleDelete(id: number) {
    "use server";
    return deleteCategory(id);
  }

  return <CategoriesTable rows={rows} onDelete={handleDelete} />;
}
