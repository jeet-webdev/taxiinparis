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
import { AboutPageFormValues } from "../types/about.types";
import FileUploadField from "@/src/components/common/Ui/Admin/FileUploadField";
import { aboutPageSchema } from "../validations/aboutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdatePageInput } from "@/src/actions/page/updatePage";
import { uploadPageImage } from "@/src/actions/page/uploadPageImage"; // Ensure this is imported
import { toast } from "react-toastify";

type Props = {
  defaultValues: AboutPageFormValues;
  onSave?: (data: UpdatePageInput) => Promise<{ success: boolean }>;
  pageId: number; // Added pageId prop to match HomePage pattern
};

export default function AboutSection({ defaultValues, onSave, pageId }: Props) {
  const methods = useForm<AboutPageFormValues>({
    defaultValues,
    resolver: zodResolver(aboutPageSchema),
  });

  const { control, handleSubmit } = methods;
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: AboutPageFormValues) => {
    startTransition(async () => {
      if (!onSave) return;

      // 1. Default to existing image string
      let imagePath: string | null =
        typeof data.headerImage === "string"
          ? data.headerImage
          : (defaultValues.headerImage as string | null);

      // 2. If a NEW file is selected, upload it first
      if (data.headerImage instanceof File) {
        const formData = new FormData();
        formData.append("image", data.headerImage);

        const uploadRes = await uploadPageImage(pageId, formData);

        if (uploadRes?.success && uploadRes.publicPath) {
          imagePath = uploadRes.publicPath;
        } else {
        toast.error("Image upload failed. Saving other changes...");
        }
      }

      // 3. Save all data (including the new/existing image path)
      const result = await onSave({
        title: data.title,
        imageUpload: imagePath, // Maps to imageUpload in your action
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        status: data.status,
      });

      if (result.success) {
        toast.success("About page updated successfully!");
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
        <Typography variant="h5">Edit About Us Page</Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Header Image */}
          <Grid item xs={12}>
            <Controller
              name="headerImage"
              control={control}
              render={({ field, fieldState }) => (
                <FileUploadField
                  label="Header Image"
                  accept="image/*"
                  files={field.value instanceof File ? field.value : null}
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
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Main Content (Rich Text) */}
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
                    placeholder="Enter About content..."
                    minHeight={400}
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

          {/* SEO Fields */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Meta Title
            </Typography>
            <TextField
              {...methods.register("metaTitle")}
              fullWidth
              margin="dense"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Meta Description
            </Typography>
            <TextField
              {...methods.register("metaDescription")}
              fullWidth
              multiline
              rows={3}
              margin="dense"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Meta Keywords
            </Typography>
            <TextField
              {...methods.register("metaKeywords")}
              fullWidth
              multiline
              rows={2}
              margin="dense"
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
              render={({ field }) => (
                <TextField {...field} select fullWidth>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" mt={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              startIcon={isPending ? <CircularProgress size={20} /> : null}
            >
              {isPending ? "Saving..." : "Update About Page"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
