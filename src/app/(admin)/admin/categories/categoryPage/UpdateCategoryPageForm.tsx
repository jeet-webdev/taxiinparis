"use client";

import { useTransition } from "react";
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
import { Prisma } from "@/src/generated/prisma/client"; // ✅ use your local generated client
import RichTextEditor from "@/src/components/common/Ui/Admin/RichTextEditor";
import { updateCategoryPage } from "@/src/actions/category/CategoryPage/updateCategoryPage";

type CategoryPageFormValues = {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

interface UpdateCategoryPageFormProps {
  initialData: {
    id: number;
    title: string;
    slug: string;
    content: Prisma.JsonValue; // ✅ from your generated client, not @prisma/client/runtime/library
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
    categoryId: number;
  };
}

/**
 * Unwraps the editor HTML string from the stored JsonValue.
 *
 * Both create and update now store: { type: "doc", content: "<html>", updatedAt: "..." }
 * This function handles that shape plus legacy plain strings.
 */
function extractContent(raw: Prisma.JsonValue): string {
  if (raw === null || raw === undefined) return "";

  // Plain string — either raw HTML or a JSON-stringified object
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as Prisma.JsonValue;
      return extractContent(parsed); // recurse once to unwrap
    } catch {
      return raw; // truly plain HTML string
    }
  }

  // JSON object — standard storage shape
  if (typeof raw === "object" && !Array.isArray(raw)) {
    const obj = raw as Record<string, Prisma.JsonValue>;

    // Standard shape: { type: "doc", content: "<html>" }
    if (typeof obj.content === "string") return obj.content;

    // Legacy shape: { body: "<html>" } or { body: '{"type":"doc","content":"<html>"}' }
    if (typeof obj.body === "string") {
      try {
        const inner = JSON.parse(obj.body) as Prisma.JsonValue;
        return extractContent(inner);
      } catch {
        return obj.body;
      }
    }

    return "";
  }

  // number, boolean, array — unexpected
  return "";
}

/**
 * Converts stored metaKeywords (JSON array string or plain comma string)
 * back to a comma-separated display string.
 */
function parseKeywords(raw: string | null | undefined): string {
  if (!raw) return "";
  try {
    const arr = JSON.parse(raw) as unknown;
    if (Array.isArray(arr)) return (arr as string[]).join(", ");
  } catch {
    // already a plain comma string
  }
  return raw;
}

export default function UpdateCategoryPageForm({
  initialData,
}: UpdateCategoryPageFormProps) {
  const [isPending, startTransition] = useTransition();

  const methods = useForm<CategoryPageFormValues>({
    defaultValues: {
      title: initialData.title ?? "",
      slug: initialData.slug ?? "",
      content: extractContent(initialData.content),
      metaTitle: initialData.metaTitle ?? "",
      metaDescription: initialData.metaDescription ?? "",
      metaKeywords: parseKeywords(initialData.metaKeywords),
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: CategoryPageFormValues) => {
    startTransition(async () => {
      try {
        const result = await updateCategoryPage(initialData.id, {
          title: data.title,
          slug: data.slug,
          content: data.content,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          metaKeywords: data.metaKeywords,
        });

        if (result.success) {
          toast.success("Category page updated successfully!");
        } else {
          toast.error(
            ("error" in result ? result.error : undefined) ??
              "Failed to update category page",
          );
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* PAGE IDENTITY */}
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
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* PAGE CONTENT */}
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
                  blogId={initialData.categoryId.toString()}
                />
              )}
            />
          </Paper>

          {/* SEO CONFIGURATION */}
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
                  <TextField {...field} label="Meta Title" fullWidth />
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
                  />
                )}
              />
            </Stack>
          </Paper>

          {/* FORM ACTIONS */}
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
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  );
}
