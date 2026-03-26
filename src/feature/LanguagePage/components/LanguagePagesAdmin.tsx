"use client";

import { useState, useTransition, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  getAllLanguagePages,
  createLanguagePage,
  updateLanguagePage,
  deleteLanguagePage,
  uploadLanguagePageImage,
  type LanguagePageInput,
} from "@/src/actions/languagePageActions";
import { toast } from "react-toastify";
import DeleteConfirmDialog from "../../DeleteConfirmDialog";

const RichTextEditor = dynamic(
  () => import("@/src/components/common/Ui/Admin/RichTextEditor"),
  { ssr: false },
);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type PageRow = {
  id: number;
  title: string;
  slug: string;
  content?: string | null;
  imageUpload?: string | null;
  imageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  status: string;
  updatedAt: Date;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z]{2,5}\/[a-z0-9-]+$/,
      "Format: languagecode/page-name (e.g. fr/corporate)",
    ),
  content: z.string().optional().nullable(),
  imageUpload: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  metaTitle: z.string().max(255).optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  status: z.enum(["active", "inactive"]),
});

type FormValues = z.infer<typeof formSchema>;

// ─────────────────────────────────────────────
// Language config
// ─────────────────────────────────────────────
const LANG_FLAGS: Record<string, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  de: "🇩🇪",
  it: "🇮🇹",
  es: "🇪🇸",
  pt: "🇵🇹",
  nl: "🇳🇱",
  ar: "🇸🇦",
  zh: "🇨🇳",
  ja: "🇯🇵",
};

const LANG_FULL: Record<string, string> = {
  fr: "French",
  en: "English",
  de: "German",
  it: "Italian",
  es: "Spanish",
  pt: "Portuguese",
  nl: "Dutch",
  ar: "Arabic",
  zh: "Chinese",
  ja: "Japanese",
};

const LANG_COLORS: Record<string, { bg: string; color: string }> = {
  fr: { bg: "#EEF2FF", color: "#4338CA" },
  en: { bg: "#EFF6FF", color: "#1D4ED8" },
  de: { bg: "#FFF7ED", color: "#C2410C" },
  it: { bg: "#FFF1F2", color: "#BE123C" },
  es: { bg: "#FEFCE8", color: "#92400E" },
  pt: { bg: "#F0FDF4", color: "#15803D" },
  nl: { bg: "#FFF7ED", color: "#B45309" },
  ar: { bg: "#F0FDF4", color: "#166534" },
  zh: { bg: "#FFF1F2", color: "#9F1239" },
  ja: { bg: "#FDF4FF", color: "#7E22CE" },
};

function getLangCode(slug: string) {
  return slug.split("/")[0] ?? "";
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
interface Props {
  initialPages: PageRow[];
}

export default function LanguagePagesAdmin({ initialPages }: Props) {
  const [pages, setPages] = useState<PageRow[]>(initialPages);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "form">("list");
  const [editingPage, setEditingPage] = useState<PageRow | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState<() => void>(() => {});
  const [deleteText, setDeleteText] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      imageUpload: "",
      imageAlt: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      status: "active",
    },
  });

  const slugValue = watch("slug");
  const langCode = getLangCode(slugValue ?? "");

  const openAdd = () => {
    setEditingPage(null);
    setImagePreview(null);
    setImageFile(null);
    reset({
      title: "",
      slug: "",
      content: "",
      imageUpload: "",
      imageAlt: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      status: "active",
    });
    setView("form");
  };

  const openEdit = (page: PageRow) => {
    setEditingPage(page);
    setImagePreview(page.imageUpload ?? null);
    setImageFile(null);
    reset({
      title: page.title,
      slug: page.slug,
      content: page.content ?? "",
      imageUpload: page.imageUpload ?? "",
      imageAlt: page.imageAlt ?? "",
      metaTitle: page.metaTitle ?? "",
      metaDescription: page.metaDescription ?? "",
      metaKeywords: page.metaKeywords ?? "",
      status: page.status as "active" | "inactive",
    });
    setView("form");
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      try {
        let uploadedPath: string | null = null;
        if (imageFile) {
          setImageUploading(true);
          const fd = new FormData();
          fd.append("image", imageFile);
          const uploadResult = await uploadLanguagePageImage(fd);
          setImageUploading(false);
          if (!uploadResult.success || !uploadResult.publicPath) {
            toast.error(uploadResult.error ?? "Image upload failed.");
            return;
          }
          uploadedPath = uploadResult.publicPath;
          data.imageUpload = uploadedPath;
        }

        const result = editingPage
          ? await updateLanguagePage(
              editingPage.id,
              data as LanguagePageInput,
              uploadedPath,
            )
          : await createLanguagePage(data as LanguagePageInput);

        if (result.success) {
          toast.success(editingPage ? "Page updated!" : "Page created!");
          setView("list");
          const updated = await getAllLanguagePages();
          setPages(updated as PageRow[]);
        } else {
          toast.error(result.error ?? "Something went wrong.");
        }
      } catch {
        toast.error("An unexpected error occurred.");
        setImageUploading(false);
      }
    });
  };

  const handleDelete = (id: number) => {
    setDeleteText("Delete this page? This cannot be undone.");

    setDeleteAction(() => async () => {
      setDeletingId(id);

      const result = await deleteLanguagePage(id);

      if (result.success) {
        toast.success("Page deleted.");
        setPages((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(result.error ?? "Failed to delete.");
      }

      setDeletingId(null);
      setDeleteOpen(false);
    });

    setDeleteOpen(true);
  };

  const filtered = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      getLangCode(p.slug).includes(search.toLowerCase()),
  );

  const isSaving = isSubmitting || isPending || imageUploading;

  // ─────────────────────────────────────────────
  // LIST VIEW
  // ─────────────────────────────────────────────
  if (view === "list") {
    return (
      <>
        <Box>
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Box>
              <Typography variant="h5" fontWeight={700} color="text.primary">
                Language Pages
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Localised pages at{" "}
                <Box
                  component="code"
                  sx={{
                    bgcolor: "grey.100",
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    fontSize: 12,
                    color: "primary.main",
                  }}
                >
                  /[lang]/[slug]
                </Box>
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openAdd}
              sx={{
                bgcolor: "#1e293b",
                "&:hover": { bgcolor: "#0f172a" },
                borderRadius: 2,
                fontWeight: 700,
                px: 3,
                py: 1.2,
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
            >
              Add Page
            </Button>
          </Box>

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search by title, slug or language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 3, maxWidth: 420 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
              sx: { borderRadius: 2 },
            }}
            fullWidth
          />

          {/* Table */}
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  {["Page", "Slug / URL", "Language", "Status", "Actions"].map(
                    (h) => (
                      <TableCell
                        key={h}
                        sx={{
                          fontWeight: 700,
                          fontSize: 11,
                          color: "text.disabled",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          py: 1.5,
                        }}
                      >
                        {h}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={1.5}
                      >
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            bgcolor: "grey.100",
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ImageIcon
                            sx={{ color: "text.disabled", fontSize: 24 }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="text.secondary"
                        >
                          {search
                            ? "No results found"
                            : "No language pages yet"}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {search
                            ? `Nothing matches "${search}"`
                            : "Click Add Page to create your first one"}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((page) => {
                    const lc = getLangCode(page.slug);
                    const lc_color = LANG_COLORS[lc] ?? {
                      bg: "#F1F5F9",
                      color: "#475569",
                    };

                    return (
                      <TableRow
                        key={page.id}
                        hover
                        sx={{
                          "&:last-child td": { borderBottom: 0 },
                          cursor: "default",
                        }}
                      >
                        {/* Page */}
                        <TableCell sx={{ py: 2 }}>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar
                              src={page.imageUpload ?? undefined}
                              variant="rounded"
                              sx={{
                                width: 44,
                                height: 44,
                                bgcolor: "grey.100",
                                fontSize: 20,
                                borderRadius: 2,
                              }}
                            >
                              {!page.imageUpload && (LANG_FLAGS[lc] ?? "🌐")}
                            </Avatar>
                            <Box>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                color="text.primary"
                                noWrap
                                sx={{ maxWidth: 160 }}
                              >
                                {page.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.disabled"
                              >
                                ID #{page.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        {/* Slug */}
                        <TableCell sx={{ py: 2 }}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.75,
                              bgcolor: "grey.100",
                              px: 1.5,
                              py: 0.75,
                              borderRadius: 2,
                              maxWidth: 200,
                            }}
                          >
                            <Typography
                              variant="caption"
                              fontFamily="monospace"
                              color="text.secondary"
                              noWrap
                            >
                              /{page.slug}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Language */}
                        <TableCell sx={{ py: 2 }}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.75,
                              bgcolor: lc_color.bg,
                              color: lc_color.color,
                              px: 1.5,
                              py: 0.75,
                              borderRadius: 2,
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            <span>{LANG_FLAGS[lc] ?? "🌐"}</span>
                            <span>{lc.toUpperCase()}</span>
                            {LANG_FULL[lc] && (
                              <Typography
                                component="span"
                                sx={{
                                  fontSize: 11,
                                  fontWeight: 400,
                                  opacity: 0.75,
                                }}
                              >
                                — {LANG_FULL[lc]}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>

                        {/* Status */}
                        <TableCell sx={{ py: 2 }}>
                          <Chip
                            label={page.status}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: 10,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              bgcolor:
                                page.status === "active"
                                  ? "#DCFCE7"
                                  : "#FEE2E2",
                              color:
                                page.status === "active"
                                  ? "#15803D"
                                  : "#DC2626",
                              border: "none",
                              height: 24,
                            }}
                          />
                        </TableCell>

                        {/* Actions */}
                        <TableCell sx={{ py: 2 }}>
                          <Box display="flex" alignItems="center" gap={0.75}>
                            {/* View */}
                            <Tooltip title="View page">
                              <Button
                                component="a"
                                href={`/${page.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                startIcon={
                                  <OpenInNewIcon
                                    sx={{ fontSize: "14px !important" }}
                                  />
                                }
                                sx={{
                                  bgcolor: "#EEF2FF",
                                  color: "#4338CA",
                                  fontWeight: 600,
                                  fontSize: 11,
                                  borderRadius: 1.5,
                                  px: 1.5,
                                  py: 0.5,
                                  minWidth: 0,
                                  textTransform: "none",
                                  "&:hover": { bgcolor: "#E0E7FF" },
                                }}
                              >
                                View
                              </Button>
                            </Tooltip>

                            {/* Edit */}
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => openEdit(page)}
                                sx={{
                                  bgcolor: "#FFF7ED",
                                  color: "#C2410C",
                                  borderRadius: 1.5,
                                  "&:hover": { bgcolor: "#FFEDD5" },
                                }}
                              >
                                <EditIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>

                            {/* Delete */}
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(page.id)}
                                disabled={deletingId === page.id}
                                sx={{
                                  bgcolor: "#FFF1F2",
                                  color: "#BE123C",
                                  borderRadius: 1.5,
                                  "&:hover": { bgcolor: "#FFE4E6" },
                                }}
                              >
                                {deletingId === page.id ? (
                                  <CircularProgress size={14} color="inherit" />
                                ) : (
                                  <DeleteIcon sx={{ fontSize: 16 }} />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ mt: 2, display: "block" }}
          >
            {filtered.length} page{filtered.length !== 1 ? "s" : ""}
            {search ? ` matching "${search}"` : ""}
          </Typography>
        </Box>
        <DeleteConfirmDialog
          open={deleteOpen}
          description={deleteText}
          onClose={() => setDeleteOpen(false)}
          onConfirm={deleteAction}
        />
      </>
    );
  }

  // ─────────────────────────────────────────────
  // FORM VIEW
  // ─────────────────────────────────────────────
  return (
    <Box maxWidth={800}>
      {/* Back + Title */}
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <IconButton
          onClick={() => setView("list")}
          sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {editingPage ? "Edit Language Page" : "Add Language Page"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editingPage
              ? `Editing /${editingPage.slug}`
              : "Create a new localised page"}
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Basic Info */}
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography
              variant="overline"
              color="text.disabled"
              fontWeight={700}
              sx={{ letterSpacing: "0.1em" }}
            >
              Basic Info
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
              gap={2}
              mt={2}
            >
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Title"
                    required
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    placeholder="e.g. Corporate Transfer Paris"
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                )}
              />
              <Controller
                name="slug"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Slug"
                    required
                    fullWidth
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message ||
                      (langCode
                        ? `${LANG_FLAGS[langCode] ?? "🌐"} ${LANG_FULL[langCode] ?? langCode.toUpperCase()} detected`
                        : "Format: fr/corporate")
                    }
                    placeholder="fr/corporate"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">/</InputAdornment>
                      ),
                      sx: { borderRadius: 2, fontFamily: "monospace" },
                    }}
                    FormHelperTextProps={{
                      sx:
                        langCode && !fieldState.error
                          ? {
                              color:
                                LANG_COLORS[langCode]?.color ?? "primary.main",
                              fontWeight: 600,
                            }
                          : {},
                    }}
                  />
                )}
              />
            </Box>
            <Box mt={2} maxWidth={200}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    size="small"
                    fullWidth
                    InputProps={{ sx: { borderRadius: 2 } }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                )}
              />
            </Box>
          </Paper>

          {/* Hero Image */}
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography
              variant="overline"
              color="text.disabled"
              fontWeight={700}
              sx={{ letterSpacing: "0.1em" }}
            >
              Hero Image
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gap={2}
              mt={2}
            >
              {/* Preview */}
              <Box>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "block",
                    mb: 1,
                  }}
                >
                  Current
                </Typography>
                <Box
                  sx={{
                    height: 160,
                    borderRadius: 2,
                    border: "2px dashed",
                    borderColor: "divider",
                    bgcolor: "grey.50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      style={{ objectFit: "contain" }} //style={{ objectFit: "contain" }} /
                      unoptimized
                    />
                  ) : (
                    <Box textAlign="center">
                      <ImageIcon
                        sx={{ color: "text.disabled", fontSize: 32, mb: 1 }}
                      />
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        display="block"
                      >
                        No image selected
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Upload */}
              <Box>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "block",
                    mb: 1,
                  }}
                >
                  Upload New
                </Typography>
                <Box
                  onClick={() => imageInputRef.current?.click()}
                  sx={{
                    height: 160,
                    borderRadius: 2,
                    border: "2px dashed",
                    borderColor: "grey.300",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "primary.main",
                      bgcolor: "primary.50",
                    },
                  }}
                >
                  <input
                    ref={imageInputRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageFile}
                  />
                  <CloudUploadIcon
                    sx={{ color: "text.secondary", fontSize: 32 }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.secondary"
                  >
                    Click to upload
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    PNG, JPG, WebP · 1920×800 recommended
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box mt={2}>
              <Controller
                name="imageAlt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    label="Image Alt Text"
                    fullWidth
                    size="small"
                    placeholder="e.g. Corporate car in Paris"
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                )}
              />
            </Box>
          </Paper>

          {/* Content */}
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography
              variant="overline"
              color="text.disabled"
              fontWeight={700}
              sx={{ letterSpacing: "0.1em", display: "block", mb: 2 }}
            >
              Page Content
            </Typography>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Write the page content..."
                  minHeight={300}
                />
              )}
            />
          </Paper>

          {/* SEO */}
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography
              variant="overline"
              color="text.disabled"
              fontWeight={700}
              sx={{ letterSpacing: "0.1em", display: "block", mb: 2 }}
            >
              SEO / Meta
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Controller
                name="metaTitle"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    label="Meta Title"
                    fullWidth
                    size="small"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message ||
                      "Recommended: under 60 characters"
                    }
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                )}
              />
              <Controller
                name="metaDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    label="Meta Description"
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    helperText="Recommended: under 160 characters"
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                )}
              />
              <Controller
                name="metaKeywords"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    label="Meta Keywords"
                    fullWidth
                    size="small"
                    placeholder="keyword1, keyword2"
                    helperText="Comma-separated"
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                )}
              />
            </Box>
          </Paper>

          {/* Submit */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={4}
          >
            <Button
              variant="text"
              onClick={() => setView("list")}
              color="inherit"
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSaving}
              startIcon={
                isSaving ? <CircularProgress size={16} color="inherit" /> : null
              }
              sx={{
                bgcolor: "#1e293b",
                "&:hover": { bgcolor: "#0f172a" },
                borderRadius: 2,
                fontWeight: 700,
                px: 4,
                py: 1.2,
              }}
            >
              {isSaving
                ? "Saving..."
                : editingPage
                  ? "Save Changes"
                  : "Create Page"}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
