// "use client";

// import { use, useActionState, useState, useEffect } from "react";
// import { useFormStatus } from "react-dom";
// import { createCategoryPage } from "@/src/actions/category/CategoryPage/createCategoryPage";

// type PageState = {
//   success: boolean;
//   message: string;
// };

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2.5 px-8 rounded-lg transition-all
//                  hover:bg-blue-700
//                  disabled:bg-blue-300 disabled:text-white disabled:cursor-not-allowed shadow-sm"
//     >
//       {pending ? (
//         <span className="flex items-center gap-2">
//           <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//               fill="none"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             />
//           </svg>
//           Saving...
//         </span>
//       ) : (
//         "Save Page"
//       )}
//     </button>
//   );
// }

// export default function AddPageToCategory({
//   params,
// }: {
//   params: Promise<{ categoryId: string }>;
// }) {
//   const resolvedParams = use(params);
//   const categoryId = parseInt(resolvedParams.categoryId);

//   // States
//   const [textContent, setTextContent] = useState("");
//   const [categoriesSlug, setCategoriesSlug] = useState<string>("Loading...");

//   // Logic to fetch the Category Slug from your database/API
//   useEffect(() => {
//     async function fetchCategory() {
//       try {
//         // Replace with your actual API endpoint or database fetch logic
//         const response = await fetch(`/api/categories/${categoryId}`);
//         const data = await response.json();
//         setCategoriesSlug(data.slug || "unknown-category");
//       } catch (error) {
//         setCategoriesSlug("error-loading");
//       }
//     }
//     fetchCategory();
//   }, [categoryId]);

//   const createActionWithId = createCategoryPage.bind(null, categoryId);

//   const [state, formAction] = useActionState<PageState, FormData>(
//     createActionWithId,
//     {
//       success: false,
//       message: "",
//     },
//   );

//   // JSON Content Formatter
//   const jsonOutput = JSON.stringify({
//     type: "doc",
//     content: textContent,
//     updatedAt: new Date().toISOString(),
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-10">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-8 flex justify-between items-end">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
//               Add Category Page
//             </h1>
//             <p className="text-slate-500 mt-1">
//               Creating page for category:{" "}
//               <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
//                 {categoriesSlug}
//               </span>
//             </p>
//           </div>
//         </header>

//         {state?.message && (
//           <div
//             className={`p-4 mb-6 rounded-lg border flex items-center gap-3 ${
//               state.success
//                 ? "bg-emerald-50 border-emerald-200 text-emerald-800"
//                 : "bg-rose-50 border-rose-200 text-rose-800"
//             }`}
//           >
//             <span className="text-xl">{state.success ? "✓" : "⚠"}</span>
//             <p className="font-medium">{state.message}</p>
//           </div>
//         )}

//         <form action={formAction} className="space-y-6">
//           {/* Formats text content into a JSON string for the database */}
//           <input type="hidden" name="content" value={jsonOutput} />

//           {/* General Information Card */}
//           <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//             <h2 className="text-sm tracking-wider font-bold mb-4 text-slate-400 uppercase">
//               General Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">
//                   Page Title
//                 </label>
//                 <input
//                   name="title"
//                   placeholder="e.g. Summer Collection"
//                   required
//                   className="w-full border border-slate-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">
//                   URL Slug
//                 </label>
//                 <input
//                   name="slug"
//                   placeholder="summer-collection"
//                   required
//                   pattern="[a-z0-9-]+"
//                   className="w-full border border-slate-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Content Card */}
//           <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//             <h2 className="text-sm tracking-wider font-bold mb-4 text-slate-400 uppercase">
//               Body Content
//             </h2>
//             <textarea
//               value={textContent}
//               onChange={(e) => setTextContent(e.target.value)}
//               placeholder="Start writing..."
//               className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-64 font-sans leading-relaxed"
//             />
//           </section>

//           {/* SEO & Meta Card */}
//           <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//             <h2 className="text-sm tracking-wider font-bold mb-4 text-slate-400 uppercase">
//               Search Engine Optimization
//             </h2>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">
//                   Meta Title
//                 </label>
//                 <input
//                   name="metaTitle"
//                   className="w-full border border-slate-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">
//                   Meta Description
//                 </label>
//                 <textarea
//                   name="metaDescription"
//                   className="w-full border border-slate-300 p-2.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-24"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Action Footer */}
//           <div className="flex items-center justify-end gap-4 bg-slate-100 p-6 rounded-xl border border-slate-200">
//             <button
//               type="button"
//               className="font-medium text-slate-600 hover:text-slate-800"
//             >
//               Cancel
//             </button>
//             <SubmitButton />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { use, useState, useEffect, useTransition } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import RichTextEditor from "@/src/components/common/Ui/Admin/RichTextEditor";
import { createCategoryPage } from "@/src/actions/category/CategoryPage/createCategoryPage";
import { getCategoryById } from "@/src/actions/category/getCategory";
import { color } from "framer-motion";
// Assuming you have a generic or category-specific upload action
// import { uploadCategoryImage } from "@/src/actions/category/uploadCategoryImage";

type CategoryPageFormValues = {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

export default function AddPageToCategory({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const resolvedParams = use(params);
  const categoryId = parseInt(resolvedParams.categoryId);

  const [isPending, startTransition] = useTransition();
  const [categoryName, setCategoryName] = useState<string>("Loading...");

  const methods = useForm<CategoryPageFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  const { control, handleSubmit } = methods;

  useEffect(() => {
    async function fetchCategoryDetails() {
      // Safety check: ensure we have a valid ID
      if (!categoryId || isNaN(categoryId)) return;

      try {
        // 2. Call your Server Action directly
        const data = await getCategoryById(categoryId);

        if (data) {
          // Use 'name' from your Prisma schema
          setCategoryName(data.name || data.slug || "Selected Category");
        } else {
          setCategoryName("Category not found");
        }
      } catch (_error) {
        // Using _error prevents the "defined but never used" warning
        setCategoryName("Error loading category");
      }
    }

    fetchCategoryDetails();
  }, [categoryId]);
  const onSubmit = (data: CategoryPageFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("metaTitle", data.metaTitle);
        formData.append("metaDescription", data.metaDescription);
        formData.append("metaKeywords", data.metaKeywords);

        const pageContentJson = JSON.stringify({
          type: "doc",
          content: data.content,
          updatedAt: new Date().toISOString(),
        });

        formData.append("content", pageContentJson);

        // FIXED: Added the middle argument 'null' to match the server action signature
        const result = await createCategoryPage(
          categoryId,
          { success: false, message: "" }, // This matches the PageState type
          formData,
        );
        if (result.success) {
          toast.success("Category page created successfully!");
          // Optional: redirect or reset form here
        } else {
          toast.error(result.message || "Failed to save category page");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    });
  };
  return (
    <FormProvider {...methods}>
      <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
        <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
          <Box mb={4}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#1e293b" }}
            >
              New Category Page
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Parent Category:
              <Box
                component="span"
                sx={{
                  ml: 1,
                  px: 1.5,
                  py: 0.5,
                  bgcolor: "#e2e8f0",
                  color: "#475569",
                  borderRadius: 1,
                  fontWeight: "600",
                }}
              >
                {categoryName}
              </Box>
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              {/* Identity & Routing */}
              <Paper
                sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0" }}
                elevation={0}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  color="primary"
                  gutterBottom
                >
                  PAGE IDENTITY
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Page title is required" }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Display Title"
                          fullWidth
                          variant="outlined"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          sx={{ color: "#808080" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="slug"
                      control={control}
                      rules={{ required: "URL slug is required" }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="URL Slug"
                          fullWidth
                          placeholder="e.g. services-overview"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          sx={{ color: "#808080" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Editor Section */}
              <Paper
                sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0" }}
                elevation={0}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  color="primary"
                  gutterBottom
                >
                  PAGE CONTENT
                </Typography>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="Type the main content of this category page..."
                      minHeight={450}
                      // Use categoryId for asset organization
                      blogId={categoryId.toString()}
                      // onImageUpload={uploadCategoryImage}
                    />
                  )}
                />
              </Paper>

              {/* Search Optimization */}
              <Paper
                sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0" }}
                elevation={0}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  color="primary"
                  gutterBottom
                >
                  SEO CONFIGURATION
                </Typography>
                <Stack spacing={3} mt={1}>
                  <Controller
                    name="metaTitle"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Meta Title"
                        fullWidth
                        sx={{ color: "#808080" }}
                      />
                    )}
                  />
                  <Controller
                    name="metaDescription"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Meta Description"
                        multiline
                        rows={3}
                        fullWidth
                        sx={{ color: "#808080" }}
                      />
                    )}
                  />
                  <Controller
                    name="metaKeywords"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Meta Keywords"
                        placeholder="taxi, paris, transfer"
                        fullWidth
                        sx={{ color: "#808080" }}
                      />
                    )}
                  />
                </Stack>
              </Paper>

              {/* Form Actions */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 2,
                  p: 3,
                  bgcolor: "#f1f5f9",
                  borderRadius: 3,
                }}
              >
                <Button variant="text" color="inherit" sx={{ fontWeight: 600 }}>
                  Discard
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isPending}
                  startIcon={
                    isPending ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                  sx={{
                    px: 6,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: "bold",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                >
                  {isPending ? "Creating..." : "Create Category Page"}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </FormProvider>
  );
}
