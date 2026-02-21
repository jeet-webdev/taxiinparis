"use client";

import { Box, Button, TextField, Typography } from "@mui/material";


interface Props {
  mode: "add" | "edit";
  blogId?: string;
}

export default function BlogForm({ mode, blogId }: Props) {
    
  const isEdit = mode === "edit";

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        {isEdit ? "Edit Blog" : "Add Blog"}
      </Typography>

      <TextField fullWidth label="Title" sx={{ mb: 2 }} />
      <TextField fullWidth label="Slug" sx={{ mb: 2 }} />
      <TextField fullWidth label="Meta Description" sx={{ mb: 2 }} />
      <TextField fullWidth label="Meta Keywords" sx={{ mb: 2 }} />

      <Button variant="contained">
        {isEdit ? "Update Blog" : "Create Blog"}
      </Button>
    </Box>
  );
}