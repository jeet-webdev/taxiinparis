import CategoriesTable from "@/src/feature/categories/component/CategoriesTable";
import type { CategoryRow } from "@/src/feature/categories/component/CategoriesTable";
import { getCategories } from "@/src/actions/category/getCategory";
import { deleteCategory } from "@/src/actions/category/deleteCategory";
import { deletePageFromCategory } from "@/src/actions/category/CategoryPage/deleteCategoryPage";
// import { deletePageFromCategory } from "@/src/actions/category/deleteCategoryPage";
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
    pages: cat.categoryPages.map((p) => ({
      // ← ADD THIS
      id: p.id,
      title: p.title,
      slug: p.slug,
      metaTitle: p.metaTitle ?? "",
    })),
  }));

  async function handleDelete(id: number) {
    "use server";
    return deleteCategory(id);
  }
  async function handleDeletePage(pageId: number, categoryId: number) {
    // ← add
    "use server";
    return deletePageFromCategory(pageId, categoryId);
  }

  return (
    <CategoriesTable
      rows={rows}
      onDelete={handleDelete}
      onDeletePage={handleDeletePage}
    />
  );
}
