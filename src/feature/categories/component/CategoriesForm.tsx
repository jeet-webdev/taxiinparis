"use client";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { Controller, useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "react-toastify";
// import { CategoryFormValues } from "../types/category.types";
import { CategoryFormValues } from "../types/categories.type";

type Props = {
  mode: "add" | "edit";
  defaultValues: CategoryFormValues;
  onSave?: (
    data: CategoryFormValues,
  ) => Promise<{ success: boolean; error?: string }>;
};

export default function CategoryForm({ mode, defaultValues, onSave }: Props) {
  const { control, handleSubmit, setValue, watch } =
    useForm<CategoryFormValues>({
      defaultValues,
    });

  const [isPending, startTransition] = useTransition();
  const isEdit = mode === "edit";

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setValue("name", value);
    if (!isEdit) {
      setValue(
        "slug",
        value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      );
    }
  };

  const onSubmit = (data: CategoryFormValues) => {
    startTransition(async () => {
      try {
        if (!onSave) return;
        const result = await onSave(data);
        if (result.success) {
          toast.success(
            isEdit
              ? "Category updated successfully!"
              : "Category created successfully!",
          );
        } else {
          toast.error(result.error || "Something went wrong.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        {isEdit ? "Edit Category" : "Add Category"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Category Name
            </Typography>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="e.g. Technology"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              )}
            />
          </Grid>

          {/* Slug */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Slug
            </Typography>
            <Controller
              name="slug"
              control={control}
              rules={{ required: "Slug is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="e.g. technology"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12} mt={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              startIcon={isPending ? <CircularProgress size={20} /> : null}
            >
              {isPending
                ? "Saving..."
                : isEdit
                  ? "Update Category"
                  : "Create Category"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
