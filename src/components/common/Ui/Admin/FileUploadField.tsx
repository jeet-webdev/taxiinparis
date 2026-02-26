"use client";
import React, { useRef, useMemo } from "react";
import { Box, Typography, Button, FormHelperText, Paper } from "@mui/material";
import Image from "next/image";
import { CloudUpload } from "@mui/icons-material";

type UploadedFile = {
  name: string;
  url: string;
};
type FileValue = File | UploadedFile | string;

// type FileValue = File | UploadedFile;

interface FileUploadFieldProps {
  label: string;
  accept?: string;
  files: FileValue | null;
  onChange: (file: FileValue | null) => void;
  error?: boolean;
  errorMessage?: string;
  existingFileUrl?: string | null;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  accept,
  files,
  onChange,
  error,
  errorMessage,
  existingFileUrl,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => {
    if (!files) return existingFileUrl ?? null;
    if (typeof files === "string") {
      return files;
    }
    if (files instanceof File) {
      return URL.createObjectURL(files);
    }

    if (typeof files === "object" && files !== null && "url" in files) {
      return files.url;
    }

    return null;
  }, [files, existingFileUrl]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <Box>
      <Typography variant="body1" fontWeight={600} mb={1}>
        {label}
      </Typography>

      {/* Image Preview */}
      <Box
        sx={{
          width: "100%",
          height: 300,
          borderRadius: 2,
          overflow: "hidden",
          border: error ? "1px solid #d32f2f" : "1px solid #ddd",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {previewUrl ? (
          <Image
            height={500}
            width={500}
            src={previewUrl}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Typography color="text.secondary">No Image Selected</Typography>
        )}
      </Box>

      {/* File Input */}
      <Box mt={2}>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            textAlign: "center",
            borderStyle: "dashed",
            borderColor: error ? "error.main" : "divider",
            backgroundColor: "background.default",
            cursor: "pointer",
            transition: "border-color 0.2s",
            "&:hover": { borderColor: error ? "error.main" : "primary.main" },
          }}
          onChange={handleChange}
        >
          {" "}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            style={{ display: "none" }}
          />{" "}
          <CloudUpload sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />{" "}
          <Typography variant="body2" color="text.secondary">
            {" "}
            Click to upload a file
          </Typography>{" "}
          <Button
            variant="outlined"
            size="small"
            startIcon={<CloudUpload />}
            sx={{ mt: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            {" "}
            Browse Files{" "}
          </Button>{" "}
        </Paper>
      </Box>

      {error && errorMessage && (
        <FormHelperText error sx={{ mt: 1 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FileUploadField;
