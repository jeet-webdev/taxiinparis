"use client";

// src/feature/page-editor/features/components/featureForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { featureSchema, FeatureFormValues } from "../validation/feature.schema";

import {
  saveFeatureAction,
  deleteFeatureAction,
  saveMainTitleAction, // ← ADD
} from "@/src/actions/featureAction";
import { toast } from "react-toastify";
import { uploadFeatureImage } from "@/src/actions/uploadFeatureImage";
import { FeatureItem } from "../types/feature.types";
import { useRouter } from "next/navigation";
// ─────────────────────────────────────────────
// INPUT CLASSES
// ─────────────────────────────────────────────
const inputCls =
  "w-full bg-[#FAF7F2] border border-[#D4B483]/40 rounded-lg px-4 py-2.5 text-sm text-[#2C1F0E] placeholder-[#A08860] focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/15 transition-all duration-200";

const inputErrCls =
  "w-full bg-[#FAF7F2] border border-[#C0392B]/40 rounded-lg px-4 py-2.5 text-sm text-[#2C1F0E] placeholder-[#A08860] focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/15 transition-all duration-200";

// ─────────────────────────────────────────────
// FIELD WRAPPER
// ─────────────────────────────────────────────
function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold tracking-[0.15em]  text-[#8C6D3F]">
        {label}
        {required && <span className="text-[#C0392B] ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-[#A08860]">{hint}</p>}
      {error && (
        <p className="text-[11px] text-[#C0392B] flex items-center gap-1">
          <svg
            className="w-3 h-3 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// GOLD DIVIDER
// ─────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D4B483, transparent)",
        }}
      />
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" fill="#D4B483" />
      </svg>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D4B483, transparent)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// IMAGE UPLOADER
// ─────────────────────────────────────────────
function ImageUploader({
  currentUrl,
  onUploaded,
  error,
}: {
  currentUrl?: string;
  onUploaded: (url: string) => void;
  error?: string;
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    setPreview(URL.createObjectURL(file));
    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const result = await uploadFeatureImage(formData);

      if (result.success && result.publicPath) {
        onUploaded(result.publicPath);
      } else {
        setUploadError(result.error ?? "Upload failed");
        setPreview(currentUrl || null);
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Upload button */}
      <label
        className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-2.5 transition-all duration-200 w-fit"
        style={{
          background: uploading ? "#EDE5D8" : "#F3EDE3",
          border: `1px solid ${error ? "#C0392B" : "#D4B483"}`,
          opacity: uploading ? 0.7 : 1,
          pointerEvents: uploading ? "none" : "auto",
        }}
      >
        {uploading ? (
          <svg
            className="w-4 h-4 animate-spin shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            style={{ color: "#B8935A" }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            style={{ color: "#B8935A" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
        )}
        <span
          className="text-xs tracking-[0.08em] "
          style={{ color: "#8C6D3F", fontFamily: "Georgia, serif" }}
        >
          {uploading ? "Uploading…" : preview ? "Change Image" : "Upload Image"}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
      </label>

      {/* Error */}
      {(uploadError || error) && (
        <p className="text-[11px] text-[#C0392B] flex items-center gap-1">
          <svg
            className="w-3 h-3 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {uploadError || error}
        </p>
      )}

      {/* Preview */}
      {preview && (
        <div
          className="rounded-xl overflow-hidden w-full h-40 relative"
          style={{
            border: "1px solid #D4B483",
            boxShadow: "0 4px 16px rgba(180,140,80,0.12)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(44,31,14,0.4), transparent)",
            }}
          />
          <span
            className="absolute bottom-2 left-3 text-[10px] tracking-[0.2em] "
            style={{ color: "#FAF7F2", fontFamily: "Georgia, serif" }}
          >
            {uploading ? "Uploading…" : "Image Preview"}
          </span>
          {uploading && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(44,31,14,0.35)" }}
            >
              <svg
                className="w-8 h-8 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color: "#FAF7F2" }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// TOGGLE SWITCH
// ─────────────────────────────────────────────
function Toggle({
  label,
  description,
  fieldName,
  register,
  checked,
}: {
  label: string;
  description: React.ReactNode;
  fieldName: "openInNewTab" | "isActive";
  register: ReturnType<typeof useForm<FeatureFormValues>>["register"];
  checked: boolean;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <div>
        <p
          className="text-sm font-medium text-[#2C1F0E]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {label}
        </p>
        <p className="text-xs mt-0.5 text-[#A08860]">{description}</p>
      </div>
      <div className="relative shrink-0 ml-4">
        <input {...register(fieldName)} type="checkbox" className="sr-only" />
        <div
          className="w-11 h-6 rounded-full transition-all duration-300"
          style={{
            background: checked
              ? "linear-gradient(135deg, #D4B483, #B8935A)"
              : "#EDE5D8",
            border: `1px solid ${checked ? "#B8935A" : "#D4B483"}`,
          }}
        />
        <div
          className="absolute top-1 w-4 h-4 rounded-full transition-all duration-300"
          style={{
            left: checked ? "calc(100% - 20px)" : "4px",
            background: "#FAF7F2",
            boxShadow: "0 1px 4px rgba(44,31,14,0.2)",
          }}
        />
      </div>
    </label>
  );
}

// ─────────────────────────────────────────────
// FEATURE ROW
// ─────────────────────────────────────────────
function FeatureRow({
  feature,
  onEdit,
  onDelete,
  isDeleting,
}: {
  feature: FeatureItem;
  onEdit: (f: FeatureItem) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
      style={{
        background: hovered ? "#F3EDE3" : "#FAF7F2",
        border: hovered ? "1px solid #D4B483" : "1px solid #E8DCC8",
        boxShadow: hovered
          ? "0 4px 16px rgba(180,140,80,0.12)"
          : "0 1px 3px rgba(180,140,80,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="w-16 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
        style={{
          background: "#EDE5D8",
          border: "1px solid rgba(212,180,131,0.3)",
        }}
      >
        {feature.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={feature.imageUrl}
            alt={feature.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: "#D4B483" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {feature.category && (
            <span
              className="text-[9px] font-bold tracking-widest  px-2 py-0.5 rounded-full"
              style={{
                color: "#B8935A",
                background: "#F3EDE3",
                border: "1px solid rgba(212,180,131,0.4)",
                fontFamily: "Georgia, serif",
              }}
            >
              {feature.category}
            </span>
          )}
          <span
            className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: feature.isActive ? "#3D7A4F" : "#8C6D3F",
              background: feature.isActive ? "#EBF4EE" : "#F3EDE3",
              border: `1px solid ${feature.isActive ? "rgba(61,122,79,0.25)" : "rgba(140,109,63,0.25)"}`,
            }}
          >
            {feature.isActive ? "Active" : "Hidden"}
          </span>
        </div>
        <p
          className="text-sm font-semibold truncate text-[#2C1F0E]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {feature.title}
        </p>
        <p className="text-xs truncate mt-0.5 text-[#8C6D3F]">
          {feature.description}
        </p>
      </div>

      {/* Sort order */}
      <div className="text-center shrink-0 hidden sm:block px-3">
        <p className="text-[9px] tracking-[0.15em]  mb-0.5 text-[#A08860]">
          Order
        </p>
        <p
          className="text-sm font-bold text-[#B8935A]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {feature.sortOrder}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onEdit(feature)}
          title="Edit"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F3EDE3] border border-[#D4B483]/50 text-[#B8935A] hover:bg-[#EDE5D8] hover:border-[#B8935A] transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => onDelete(feature.id)}
          disabled={isDeleting}
          title="Delete"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FDF5F3] border border-[#C0392B]/20 text-[#C0392B] hover:bg-[#FCECEA] hover:border-[#C0392B]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isDeleting ? (
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN TITLE EDITOR (independent, inline)
// ─────────────────────────────────────────────
function MainTitleEditor({ initialTitle }: { initialTitle: string }) {
  const [title, setTitle] = useState(initialTitle);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveMainTitleAction(title);
      if (result.success) toast.success("Section title saved!");
      else toast.error(result.error ?? "Failed to save.");
    });
  };

  const cardStyle: React.CSSProperties = {
    background: "#FFFCF7",
    border: "1px solid #D4B483",
    boxShadow:
      "0 4px 24px rgba(180,140,80,0.1), 0 1px 0 rgba(255,255,255,0.9) inset",
    borderRadius: "1rem",
    overflow: "hidden",
  };

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #F3EDE3 0%, #FAF7F2 100%)",
    borderBottom: "1px solid #E8DCC8",
    padding: "1.25rem 2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #D4B483, #B8935A)",
            boxShadow: "0 2px 8px rgba(180,140,80,0.3)",
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            style={{ color: "#FAF7F2" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h10M4 18h7"
            />
          </svg>
        </div>
        <div>
          <h2
            className="text-base font-semibold text-[#2C1F0E]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Section Main Title
          </h2>
          <p className="text-xs text-[#A08860] mt-0.5">
            Shown above the feature cards on the public site — saved
            independently
          </p>
        </div>
      </div>

      {/* Input + Save */}
      <div
        className="px-8 py-6 flex items-center gap-4"
        style={{ background: "#FFFCF7" }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="e.g. Simplify your travel with our chauffeur service in Paris..."
          className={`flex-1 ${inputCls}`}
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm tracking-[0.08em]  font-semibold transition-all duration-300 disabled:opacity-50 shrink-0"
          style={{
            background: isPending
              ? "#D4B483"
              : "linear-gradient(135deg, #D4B483 0%, #B8935A 100%)",
            color: "#FAF7F2",
            fontFamily: "Georgia, serif",
            boxShadow: "0 2px 10px rgba(180,140,80,0.3)",
          }}
        >
          {isPending ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Saving…
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Title
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function FeatureForm({
  initialFeatures,
  initialMainTitle = "",
}: {
  initialFeatures: FeatureItem[];
  initialMainTitle?: string;
}) {
  const router = useRouter();
  const [features, setFeatures] = useState<FeatureItem[]>(initialFeatures);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Tracks the uploaded image URL separately so ImageUploader can re-mount with correct initial value
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
  setFeatures(initialFeatures);
}, [initialFeatures]);

  const isEditing = editingId !== null;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FeatureFormValues>({
    resolver: zodResolver(featureSchema),
    defaultValues: {
      category: "",
      imageUrl: "",
      imageAlt: "",
      title: "",
      description: "",
      buttonText: "Explore",
      buttonLink: "",
      openInNewTab: false,
      sortOrder: 0,
      isActive: true,
    },
  });

  const watched = watch();

  const handleEdit = (feature: FeatureItem) => {
    setEditingId(feature.id);
    setSubmitError(null);
    setSubmitSuccess(false);
    setUploadedImageUrl(feature.imageUrl ?? undefined);
    setValue("category", feature.category ?? "");
    setValue("imageUrl", feature.imageUrl ?? "");
    setValue("imageAlt", feature.imageAlt ?? "");
    setValue("title", feature.title);
    setValue("description", feature.description);
    setValue("buttonText", feature.buttonText ?? "Explore");
    setValue("buttonLink", feature.buttonLink ?? "");
    setValue("openInNewTab", feature.openInNewTab);
    setValue("sortOrder", feature.sortOrder);
    setValue("isActive", feature.isActive);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setSubmitError(null);
    setSubmitSuccess(false);
    setUploadedImageUrl(undefined);
    reset();
    router.refresh();
  };

 const onSubmit = async (data: FeatureFormValues) => {
  setSubmitError(null);
  setSubmitSuccess(false);

  const formData = new FormData();

  if (isEditing) formData.set("id", String(editingId));

  Object.entries(data).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      formData.set(k, String(v));
    }
  });

  startTransition(async () => {
    const result = await saveFeatureAction(formData);

    if (!result.success) {
      setSubmitError(result.error ?? "Error");
      return;
    }

    setSubmitSuccess(true);
    setEditingId(null);
    setUploadedImageUrl(undefined);
    reset();

    router.refresh(); 
  });
};
const handleDelete = (id: number) => {
  if (!confirm("Delete this feature card?")) return;
  setDeletingId(id);
  startTransition(async () => {
    const result = await deleteFeatureAction(id);
    setDeletingId(null);
    if (result.success) {
      router.refresh();
    }
  });
};

  const cardStyle: React.CSSProperties = {
    background: "#FFFCF7",
    border: "1px solid #D4B483",
    boxShadow:
      "0 4px 24px rgba(180,140,80,0.1), 0 1px 0 rgba(255,255,255,0.9) inset",
    borderRadius: "1rem",
    overflow: "hidden",
  };

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #F3EDE3 0%, #FAF7F2 100%)",
    borderBottom: "1px solid #E8DCC8",
    padding: "1.25rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <div className="space-y-8">
      <MainTitleEditor initialTitle={initialMainTitle} />
      {/* ══════════════════════════════════════
          FORM CARD
      ══════════════════════════════════════ */}
      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #faf8f2, #B8935A)",
                boxShadow: "0 2px 8px rgba(180,140,80,0.3)",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                style={{ color: "#FAF7F2" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isEditing
                      ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      : "M12 4v16m8-8H4"
                  }
                />
              </svg>
            </div>
            <div>
              <h2
                className="text-base font-semibold text-[#2C1F0E]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {isEditing ? "Edit Feature Card" : "Add New Feature Card"}
              </h2>
              <p className="text-xs text-[#8B6C26] mt-0.5">
                {isEditing
                  ? "Update the dining / experience card details"
                  : "Create a new dining / experience card"}
              </p>
            </div>
          </div>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="px-8 py-8" style={{ background: "#FFFCF7" }}>
            <div className="space-y-5">
              <Field
                label="Category"
                error={errors.category?.message}
                hint="Shown above the title — e.g. DINING, SPA, WELLNESS"
              >
                <input
                  {...register("category")}
                  placeholder="e.g. DINING"
                  className={errors.category ? inputErrCls : inputCls}
                  style={{
                    letterSpacing: "0.08em",
                  }}
                />
              </Field>

              <GoldDivider />

              {/* ── IMAGE UPLOAD + ALT TEXT ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold tracking-[0.15em] text-[#8C6D3F]">
                    Image
                  </label>
                  {/* Hidden input keeps imageUrl registered with react-hook-form */}
                  <input type="hidden" {...register("imageUrl")} />
                  <ImageUploader
                    key={editingId ?? "new"}
                    currentUrl={uploadedImageUrl}
                    onUploaded={(url) =>
                      setValue("imageUrl", url, { shouldValidate: true })
                    }
                    error={errors.imageUrl?.message}
                  />
                </div>
                <Field
                  label="Image Alt Text"
                  error={errors.imageAlt?.message}
                  hint="For accessibility"
                >
                  <input
                    {...register("imageAlt")}
                    placeholder="e.g. Elegant restaurant interior"
                    className={errors.imageAlt ? inputErrCls : inputCls}
                  />
                </Field>
              </div>

              <GoldDivider />

              <Field label="Title" required error={errors.title?.message}>
                <input
                  {...register("title")}
                  placeholder="e.g. Restaurant le Meurice Alain Ducasse"
                  className={errors.title ? inputErrCls : inputCls}
                />
                <p className="text-[11px] text-[#A08860] text-right">
                  {watched.title?.length ?? 0} / 255
                </p>
              </Field>

              <Field
                label="Description"
                required
                error={errors.description?.message}
              >
                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Describe this experience in a few sentences..."
                  className={`${errors.description ? inputErrCls : inputCls} resize-none`}
                />
                <p className="text-[11px] text-[#A08860] text-right">
                  {watched.description?.length ?? 0} / 1000
                </p>
              </Field>

              <GoldDivider />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Button Text"
                  error={errors.buttonText?.message}
                  hint="Defaults to Explore"
                >
                  <input
                    {...register("buttonText")}
                    placeholder="Explore"
                    className={errors.buttonText ? inputErrCls : inputCls}
                  />
                </Field>
                <Field
                  label="Button Link"
                  error={errors.buttonLink?.message}
                  hint="Full URL"
                >
                  <input
                    {...register("buttonLink")}
                    placeholder="https://example.com"
                    className={errors.buttonLink ? inputErrCls : inputCls}
                  />
                </Field>
              </div>

              <Field
                label="Sort Order"
                error={errors.sortOrder?.message}
                hint="Lower = appears first"
              >
                <input
                  {...register("sortOrder", { valueAsNumber: true })}
                  type="number"
                  min={0}
                  placeholder="0"
                  className={`${errors.sortOrder ? inputErrCls : inputCls} w-28`}
                />
              </Field>

              <GoldDivider />

              {/* Toggles */}
              <div
                className="rounded-xl p-5 space-y-4"
                style={{ background: "#F3EDE3", border: "1px solid #E8DCC8" }}
              >
                <Toggle
                  label="Open link in new tab"
                  description={
                    <>
                      Adds{" "}
                      <code className="text-[#B8935A] text-[10px]">
                        target=&quot;_blank&quot;
                      </code>
                    </>
                  }
                  fieldName="openInNewTab"
                  register={register}
                  checked={!!watched.openInNewTab}
                />
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #D4B483, transparent)",
                  }}
                />
                <Toggle
                  label="Active / Visible"
                  description="Hide without deleting"
                  fieldName="isActive"
                  register={register}
                  checked={!!watched.isActive}
                />
              </div>

              {/* Error */}
              {submitError && (
                <div
                  className="rounded-xl px-4 py-3 flex gap-3 items-start"
                  style={{
                    background: "#FDF0ED",
                    border: "1px solid rgba(192,57,43,0.2)",
                  }}
                >
                  <svg
                    className="w-4 h-4 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: "#C0392B" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-[#C0392B]">{submitError}</p>
                </div>
              )}

              {/* Success */}
              {submitSuccess && (
                <div
                  className="rounded-xl px-4 py-3 flex gap-3 items-start"
                  style={{
                    background: "#EBF4EE",
                    border: "1px solid rgba(61,122,79,0.2)",
                  }}
                >
                  <svg
                    className="w-4 h-4 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: "#3D7A4F" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p
                    className="text-sm text-[#3D7A4F]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {isEditing ? "updated" : "created"} successfully!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              ...headerStyle,
              borderBottom: "none",
              borderTop: "1px solid #E8DCC8",
            }}
          >
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs tracking-[0.15em]  transition-colors duration-200 text-[#A08860] hover:text-[#B8935A]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {isEditing ? "Cancel" : "Reset"}
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-lg text-sm tracking-[0.1em]  font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  isSubmitting || isPending
                    ? "#D4B483"
                    : "linear-gradient(135deg, #D4B483 0%, #B8935A 100%)",
                color: "#FAF7F2",
                fontFamily: "Georgia, serif",
                boxShadow: "0 2px 10px rgba(180,140,80,0.3)",
              }}
            >
              {isSubmitting || isPending ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Saving&hellip;
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={isEditing ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"}
                    />
                  </svg>
                  {isEditing ? "Save Changes" : "Create Feature"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ══════════════════════════════════════
          FEATURES LIST
      ══════════════════════════════════════ */}
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div>
            <h3
              className="text-base font-semibold text-[#2C1F0E]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              All Feature Cards
            </h3>
            <p className="text-xs text-[#A08860] mt-0.5">
              {features.length} card{features.length !== 1 ? "s" : ""} &mdash;
              ordered by display priority
            </p>
          </div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 0L11.25 6.75L18 9L11.25 11.25L9 18L6.75 11.25L0 9L6.75 6.75Z"
              fill="#D4B483"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="p-6 space-y-3" style={{ background: "#FAF7F2" }}>
          {features.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-10 h-10 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "#D4B483", opacity: 0.35 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p
                className="text-sm text-[#A08860]"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                No feature cards yet. Create the first one above.
              </p>
            </div>
          ) : (
            features.map((feature) => (
              <FeatureRow
                key={feature.id}
                feature={feature}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deletingId === feature.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
