"use client";

import { use, useActionState } from "react";
import { createCategoryPage } from "@/src/actions/category/CategoryPage/createCategoryPage";

type PageState = {
  success: boolean;
  message: string;
};

export default function AddPageToCategory({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const resolvedParams = use(params);
  const categoryId = parseInt(resolvedParams.categoryId);

  const createActionWithId = createCategoryPage.bind(null, categoryId);

  const [state, formAction] = useActionState<PageState, FormData>(
    createActionWithId,
    {
      success: false,
      message: "",
    },
  );

  return (
    <div className="max-h-screen overflow-y-auto p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Category Page</h1>

        {state?.message && (
          <div
            className={`p-4 mb-4 rounded ${
              state.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          {/* Title */}
          <input
            name="title"
            placeholder="Page Title"
            required
            className="border p-2 w-full rounded"
          />

          {/* Slug */}
          <input
            name="slug"
            placeholder="page-slug"
            required
            pattern="[a-z0-9-]+"
            className="border p-2 w-full rounded"
          />

          {/* Image URL */}
          <input
            name="imageUpload"
            placeholder="Image URL"
            className="border p-2 w-full rounded"
          />

          {/* Image Alt */}
          <input
            name="imageAlt"
            placeholder="Image Alt Text"
            className="border p-2 w-full rounded"
          />

          {/* Meta Title */}
          <input
            name="metaTitle"
            placeholder="Meta Title"
            className="border p-2 w-full rounded"
          />

          {/* Meta Description */}
          <textarea
            name="metaDescription"
            placeholder="Meta Description"
            className="border p-2 w-full rounded h-24"
          />

          {/* Meta Keywords (normal text input) */}
          <input
            name="metaKeywords"
            placeholder="keyword1, keyword2, keyword3"
            className="border p-2 w-full rounded"
          />

          {/* Content */}
          <textarea
            name="content"
            placeholder="Page Content"
            className="border p-2 w-full h-40 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-black px-6 py-2 rounded hover:bg-blue-700 mt-4"
          >
            Save Page
          </button>
        </form>
      </div>
    </div>
  );
}
