"use client";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { blogPagesSchema } from "../validations/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTransition } from "react";
import { BlogPagesFormValues } from "../types/blog.types";
import Grid from "@mui/material/GridLegacy";
import RichTextEditor from "@/src/components/common/Ui/Admin/RichTextEditor";

type Props = {
  mode: "add" | "edit";
  blogId?: string;
  defaultValues: BlogPagesFormValues;
  onSave?: (data: BlogPagesFormValues) => Promise<{ success: boolean }>;
};

export default function BlogForm({ mode, blogId, defaultValues, onSave }: Props) {
  const methods = useForm<BlogPagesFormValues>({
    defaultValues,
    resolver: zodResolver(blogPagesSchema),
  });

  const { control, setValue, handleSubmit } = methods;
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: BlogPagesFormValues) => {
    startTransition(async () => {
      if (!onSave) return;
      const result = await onSave(data);
      if (result.success) {
        alert(isEdit ? "Blog updated successfully!" : "Blog created successfully!");
      }
    });
  };
  const isEdit = mode === "edit";

  return (
    // <Box p={3}>
    //   <Typography variant="h5" mb={2}>
    //     {isEdit ? "Edit Blog" : "Add Blog"}
    //   </Typography>

    //   <TextField fullWidth label="Title" sx={{ mb: 2 }} />
    //   <TextField fullWidth label="Slug" sx={{ mb: 2 }} />
    //   <TextField fullWidth label="Meta Description" sx={{ mb: 2 }} />
    //   <TextField fullWidth label="Meta Keywords" sx={{ mb: 2 }} />

    //   <Button variant="contained">
    //     {isEdit ? "Update Blog" : "Create Blog"}
    //   </Button>
    // </Box>
    <FormProvider {...methods}>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" mb={2}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </Typography>
      </Box>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Title
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="blog-title"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
 {/* Title */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Slug
            </Typography>
            <Controller
              name="slug"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="blog-slug"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          {/* Text */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Text
            </Typography>
            <Controller
              name="text"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Text..."
                    minHeight={300}
                  />
                  {fieldState.error && (
                    <Typography color="error" variant="body2" mt={1}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Meta Title */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Meta Title
            </Typography>
            <Controller
              name="metaTitle"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  id="blog-meta-title"
                  {...field}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Meta Description */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Meta Description
            </Typography>
            <Controller
              name="metaDescription"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  id="blog-meta-description"
                  {...field}
                  multiline
                  rows={3}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Meta Keywords */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Meta Keywords
            </Typography>
            <Controller
              name="metaKeywords"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="blog-meta-keywords"
                  multiline
                  rows={2}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              startIcon={isPending ? <CircularProgress size={20} /> : null}
            >
              {isPending ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
