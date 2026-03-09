// "use client";

// import { use, useActionState } from "react";
// import { createCategoryPage } from "@/src/actions/category/CategoryPage/createCategoryPage";

// type PageState = {
//   success: boolean;
//   message: string;
// };

// export default function AddPageToCategory({
//   params,
// }: {
//   params: Promise<{ categoryId: string }>;
// }) {
//   const resolvedParams = use(params);
//   const categoryId = parseInt(resolvedParams.categoryId);

//   const createActionWithId = createCategoryPage.bind(null, categoryId);

//   const [state, formAction] = useActionState<PageState, FormData>(
//     createActionWithId,
//     {
//       success: false,
//       message: "",
//     },
//   );

//   return (
//     <div className="max-h-screen overflow-y-auto p-8 bg-gray-50">
//       <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-6">Add New Category Page</h1>

//         {state?.message && (
//           <div
//             className={`p-4 mb-4 rounded ${
//               state.success
//                 ? "bg-green-100 text-green-800"
//                 : "bg-red-100 text-red-800"
//             }`}
//           >
//             {state.message}
//           </div>
//         )}

//         <form action={formAction} className="space-y-4">
//           {/* Title */}
//           <input
//             name="title"
//             placeholder="Page Title"
//             required
//             className="border p-2 w-full rounded"
//           />

//           {/* Slug */}
//           <input
//             name="slug"
//             placeholder="page-slug"
//             required
//             pattern="[a-z0-9-]+"
//             className="border p-2 w-full rounded"
//           />

//           {/* Image URL */}
//           <input
//             name="imageUpload"
//             placeholder="Image URL"
//             className="border p-2 w-full rounded"
//           />

//           {/* Image Alt */}
//           <input
//             name="imageAlt"
//             placeholder="Image Alt Text"
//             className="border p-2 w-full rounded"
//           />

//           {/* Meta Title */}
//           <input
//             name="metaTitle"
//             placeholder="Meta Title"
//             className="border p-2 w-full rounded"
//           />

//           {/* Meta Description */}
//           <textarea
//             name="metaDescription"
//             placeholder="Meta Description"
//             className="border p-2 w-full rounded h-24"
//           />

//           {/* Meta Keywords (normal text input) */}
//           <input
//             name="metaKeywords"
//             placeholder="keyword1, keyword2, keyword3"
//             className="border p-2 w-full rounded"
//           />

//           {/* Content */}
//           <textarea
//             name="content"
//             placeholder="Page Content"
//             className="border p-2 w-full h-40 rounded"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-black px-6 py-2 rounded hover:bg-blue-700 mt-4"
//           >
//             Save Page
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { use, useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createCategoryPage } from "@/src/actions/category/CategoryPage/createCategoryPage";

type PageState = {
  success: boolean;
  message: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2.5 px-8 rounded-lg transition-all 
                 hover:bg-blue-700 
                 disabled:bg-blue-300 disabled:text-white disabled:cursor-not-allowed shadow-sm"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Saving...
        </span>
      ) : (
        "Save Page"
      )}
    </button>
  );
}

export default function AddPageToCategory({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const resolvedParams = use(params);
  const categoryId = parseInt(resolvedParams.categoryId);

  // States
  const [textContent, setTextContent] = useState("");
  const [categoriesSlug, setCategoriesSlug] = useState<string>("Loading...");

  // Logic to fetch the Category Slug from your database/API
  useEffect(() => {
    async function fetchCategory() {
      try {
        // Replace with your actual API endpoint or database fetch logic
        const response = await fetch(`/api/categories/${categoryId}`);
        const data = await response.json();
        setCategoriesSlug(data.slug || "unknown-category");
      } catch (error) {
        setCategoriesSlug("error-loading");
      }
    }
    fetchCategory();
  }, [categoryId]);

  const createActionWithId = createCategoryPage.bind(null, categoryId);

  const [state, formAction] = useActionState<PageState, FormData>(
    createActionWithId,
    {
      success: false,
      message: "",
    },
  );

  // JSON Content Formatter
  const jsonOutput = JSON.stringify({
    type: "doc",
    content: textContent,
    updatedAt: new Date().toISOString(),
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Add Category Page
            </h1>
            <p className="text-slate-500 mt-1">
              Creating page for category:{" "}
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {categoriesSlug}
              </span>
            </p>
          </div>
        </header>

        {state?.message && (
          <div
            className={`p-4 mb-6 rounded-lg border flex items-center gap-3 ${
              state.success
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <span className="text-xl">{state.success ? "✓" : "⚠"}</span>
            <p className="font-medium">{state.message}</p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {/* Formats text content into a JSON string for the database */}
          <input type="hidden" name="content" value={jsonOutput} />

          {/* General Information Card */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm tracking-wider font-bold mb-4 text-slate-400 uppercase">
              General Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Page Title
                </label>
                <input
                  name="title"
                  placeholder="e.g. Summer Collection"
                  required
                  className="w-full border border-slate-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  URL Slug
                </label>
                <input
                  name="slug"
                  placeholder="summer-collection"
                  required
                  pattern="[a-z0-9-]+"
                  className="w-full border border-slate-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                />
              </div>
            </div>
          </section>

          {/* Content Card */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm tracking-wider font-bold mb-4 text-slate-400 uppercase">
              Body Content
            </h2>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Start writing..."
              className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-64 font-sans leading-relaxed"
            />
          </section>

          {/* SEO & Meta Card */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm tracking-wider font-bold mb-4 text-slate-400 uppercase">
              Search Engine Optimization
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Meta Title
                </label>
                <input
                  name="metaTitle"
                  className="w-full border border-slate-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  className="w-full border border-slate-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-24"
                />
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-4 bg-slate-100 p-6 rounded-xl border border-slate-200">
            <button
              type="button"
              className="font-medium text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
