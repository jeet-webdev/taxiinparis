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
              {/* <Paper
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
              </Paper> */}
              {/* Editor Section */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  // ADD THESE RULES HERE:
                  "& .tiptap h1": {
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    margin: "0.67em 0",
                  },
                  "& .tiptap h2": {
                    fontSize: "2rem",
                    fontWeight: "bold",
                    margin: "0.83em 0",
                  },
                  "& .tiptap h3": {
                    fontSize: "1.75rem",
                    fontWeight: "bold",
                    margin: "1em 0",
                  },
                  "& .tiptap h4": {
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    margin: "1.33em 0",
                  },
                  "& .tiptap h5": {
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    margin: "1.67em 0",
                  },
                  "& .tiptap h6": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                    margin: "2.33em 0",
                  },
                  "& .tiptap p": { margin: "1em 0" },
                  "& .tiptap ul": { listStyleType: "disc", pl: 4 },
                  "& .tiptap ol": { listStyleType: "decimal", pl: 4 },
                }}
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
                      placeholder="Type the main content..."
                      minHeight={450}
                      blogId={categoryId.toString()}
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
