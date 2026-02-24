"use client";

import { uploadPageImage } from "@/src/actions/page/uploadPageImage";
import { useTransition } from "react";

export default function PageImageUpload({ pageId }: { pageId: number }) {
  const [isPending, startTransition] = useTransition();

  async function handleUpload(formData: FormData) {
    try {
      await uploadPageImage(pageId, formData);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  }

  return (
    <form
      action={(formData: FormData) =>
        startTransition(() => {
          handleUpload(formData);
        })
      }
    >
      <input
        type="file"
        name="image"
        accept="image/jpeg,image/png,image/webp"
        required
      />

      <button type="submit" disabled={isPending}>
        {isPending ? "Uploading..." : "Upload Image"}
      </button>
    </form>
  );
}
