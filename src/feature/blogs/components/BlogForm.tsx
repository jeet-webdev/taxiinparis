"use client";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { blogPagesSchema } from "../validations/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTransition, useState } from "react"; // Added useState for preview
import { BlogPagesFormValues } from "../types/blog.types";
import Grid from "@mui/material/GridLegacy";
import RichTextEditor from "@/src/components/common/Ui/Admin/RichTextEditor";
import { uploadBlogImage } from "@/src/actions/blog/uploadBlogImage";
import { toast } from "react-toastify";
import Image from "next/image"; // For preview
import { uploadBlogBannerImage } from "@/src/actions/blog/uploadBlogBannerImage";

type Props = {
  mode: "add" | "edit";
  blogId?: string;
  defaultValues: BlogPagesFormValues;
  onSave?: (data: BlogPagesFormValues) => Promise<{ success: boolean }>;
};

export default function BlogForm({
  mode,
  blogId,
  defaultValues,
  onSave,
}: Props) {
  const methods = useForm<BlogPagesFormValues>({
    defaultValues,
    resolver: zodResolver(blogPagesSchema),
  });

  const { control, handleSubmit, setValue, watch } = methods;
  const [isPending, startTransition] = useTransition();

  // Watch for existing image in edit mode
  const currentBanner = watch("bannerImage");
  const [preview, setPreview] = useState<string | null>(
    typeof currentBanner === "string" ? currentBanner : null,
  );

  const isEdit = mode === "edit";

  const onSubmit = (data: BlogPagesFormValues) => {
    startTransition(async () => {
      try {
        if (!onSave) return;

        let bannerUrl = data.bannerImage;

        // 1. If bannerImage is a File object, upload it first
        if (data.bannerImage instanceof File) {
          const formData = new FormData();
          formData.append("image", data.bannerImage);

          const uploadResult = await uploadBlogBannerImage(blogId, formData);

          if (!uploadResult.success) {
            toast.error(uploadResult.error || "Failed to upload banner");
            return;
          }

          bannerUrl = uploadResult.publicPath;
        }

        // 2. Prepare final data with the uploaded string path
        const finalData = {
          ...data,
          bannerImage: bannerUrl,
          bannerAlt: data.bannerAlt,
        };

        const result = await onSave(finalData);

        if (result.success) {
          toast.success(
            isEdit
              ? "Blog updated successfully!"
              : "Blog created successfully!",
          );
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    });

    //   if (!onSave) return;
    //   const result = await onSave(data);
    //   if (result.success) {
    //     toast.success(
    //       isEdit ? "Blog updated successfully!" : "Blog created successfully!",
    //     );
    //   }
    // });
  };

  return (
    <FormProvider {...methods}>
      <Box mb={3} display="flex" justifyContent="row" alignItems="center">
        <Typography variant="h5" mb={2}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          {/* Banner Image Upload */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 3,
                mb: 4,
                width: "100%",
                maxWidth: 800,
                mx: "auto", // centers horizontally
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Banner Image
              </Typography>

              <Controller
                name="bannerImage"
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{ height: "56px" }}
                    >
                      {preview ? "Change Banner" : "Upload Banner"}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file); // IMPORTANT
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </Button>

                    {preview && (
                      <Box
                        mt={2}
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 180,
                        }}
                      >
                        <Image
                          src={preview}
                          alt="Banner Preview"
                          fill
                          style={{
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      </Box>
                    )}

                    {fieldState.error && (
                      <Typography color="error" variant="caption">
                        {fieldState.error.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              {/* Banner Alt Text */}
              <Grid item xs={12} md={6} mt={2}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Banner Alt Text
                </Typography>

                <Controller
                  name="bannerAlt"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Image description for SEO"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
            </Box>
          </Grid>

          {/* Title */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mt: 2,
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
          {/* Slug */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mt: 2,
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
          {/* Text Content with Image Upload Logic */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mt: 2,
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
                    // Pass "0" if blogId is undefined (Add Mode)
                    blogId={blogId || "0"}
                    onImageUpload={uploadBlogImage}
                  />
                  {fieldState.error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
<Paper sx={{ mt:2, mb:2, p: 3, borderRadius: 3, border: "1px solid #e2e8f0" }} elevation={0}>
  <Typography variant="subtitle2" fontWeight="700" color="primary" gutterBottom>
    CTA BUTTON
  </Typography>
  <Grid container spacing={3} mt={1}>
    <Grid item xs={12} md={6}>
      <Controller
        name="ctaBtnText"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            label="Button Text"
            fullWidth
            placeholder="Book Your Transfer Now"
          />
        )}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <Controller
        name="ctaBtnLink"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            label="Button Link"
            fullWidth
            placeholder="https://..."
          />
        )}
      />
    </Grid>
  </Grid>
</Paper>
          {/* Meta Title */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mt: 2,
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
                mt: 2,
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
                mt: 2,
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
          <Grid item xs={12} mt={2} display="flex" justifyContent="flex-start">
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
