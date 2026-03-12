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
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdatePageInput } from "@/src/actions/page/updatePage";
import { toast } from "react-toastify";
import {
  privacyPageSchema,
  type PrivacyPageFormValues,
} from "../types/privacySchema";

type Props = {
  defaultValues: PrivacyPageFormValues;
  onSave?: (data: UpdatePageInput) => Promise<{ success: boolean }>;
};

export default function PrivacySection({ defaultValues, onSave }: Props) {
  const methods = useForm<PrivacyPageFormValues>({
    defaultValues,
    resolver: zodResolver(privacyPageSchema),
  });

  const { control, handleSubmit } = methods;
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: PrivacyPageFormValues) => {
    startTransition(async () => {
      if (!onSave) return;
      const result = await onSave({
        title: data.title,
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        status: data.status,
      });
      if (result.success) {
        toast.success("Privacy page updated successfully!");
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
        <Typography variant="h5">Edit Privacy Policy</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
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
                    placeholder="Enter Privacy Policy content..."
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
                  fullWidth
                  multiline
                  rows={3}
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
                  fullWidth
                  multiline
                  rows={2}
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

          {/* Submit Button */}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              startIcon={isPending ? <CircularProgress size={20} /> : null}
            >
              {isPending ? "Saving..." : "Update Privacy Page"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
