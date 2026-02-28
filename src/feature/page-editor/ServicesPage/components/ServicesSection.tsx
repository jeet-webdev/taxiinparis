"use client";

import { Controller, useForm, FormProvider } from "react-hook-form";
import {
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import RichTextEditor from "@/src/components/common/Ui/Admin/RichTextEditor";
import { useTransition } from "react";
import FileUploadField from "@/src/components/common/Ui/Admin/FileUploadField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServicesPageFormValues } from "../types/services.types";
import { servicesPageSchema } from "../validations/servicesSchema";
import type { UpdatePageInput } from "@/src/actions/page/updatePage";
import { uploadPageImage } from "@/src/actions/page/uploadPageImage"; // ✅ Added
import { toast } from "react-toastify"; // ✅ Added

type Props = {
  defaultValues: ServicesPageFormValues;
  onSave?: (data: UpdatePageInput) => Promise<{ success: boolean }>;
  pageId: number; // ✅ Added like About section
};

export default function ServicesSection({
  defaultValues,
  onSave,
  pageId,
}: Props) {
  const methods = useForm<ServicesPageFormValues>({
    defaultValues,
    resolver: zodResolver(servicesPageSchema),
  });

  const { control, handleSubmit } = methods;
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ServicesPageFormValues) => {
    startTransition(async () => {
      if (!onSave) return;

      // ✅ 1. Keep existing image by default
      let imagePath: string | null =
        typeof data.servicesHeaderImage === "string"
          ? data.servicesHeaderImage
          : (defaultValues.servicesHeaderImage as string | null);

      // ✅ 2. If new file selected → upload first
      if (data.servicesHeaderImage instanceof File) {
        const formData = new FormData();
        formData.append("image", data.servicesHeaderImage);

        const uploadRes = await uploadPageImage(pageId, formData);

        if (uploadRes?.success) {
          imagePath = uploadRes.publicPath ?? imagePath;
        } else {
          toast.error(uploadRes?.error || "Image upload failed.");
          return;
        }
      }

      // ✅ 3. Save page with correct image path
      const result = await onSave({
        title: data.title,
        imageUpload: imagePath,
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        status: data.status,
      });

      if (result.success) {
        toast.success("Services page updated successfully!");
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" gutterBottom>
          Edit Services Page
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Header Image */}
          <Grid item xs={6}>
            <Controller
              name="servicesHeaderImage"
              control={control}
              render={({ field, fieldState }) => (
                <FileUploadField
                  label="Header Image"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  // files={field.value instanceof File ? field.value : null}
                  files={field.value}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  onChange={(files) => {
                    const file = Array.isArray(files) ? files[0] : files;
                    field.onChange(file ?? null);
                  }}
                />
              )}
            />
          </Grid>

          {/* Title */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Title
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="services-title"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Content */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Content
            </Typography>
            <Controller
              name="content"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Services content..."
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
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Meta Title
            </Typography>
            <Controller
              name="metaTitle"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="services-meta-title"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Meta Description */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Meta Description
            </Typography>
            <Controller
              name="metaDescription"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="services-meta-description"
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
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Meta Keywords
            </Typography>
            <Controller
              name="metaKeywords"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="services-meta-keywords"
                  multiline
                  rows={2}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Status
            </Typography>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  id="services-status"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
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
              {isPending ? "Saving..." : "Update Services Page"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
