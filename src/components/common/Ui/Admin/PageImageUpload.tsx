"use client";

import { uploadPageImage } from "@/src/actions/page/uploadPageImage";
import { useTransition } from "react";
import { toast } from "react-toastify";

export default function PageImageUpload({ pageId }: { pageId: number }) {
  const [isPending, startTransition] = useTransition();

  async function handleUpload(formData: FormData) {
    try {
      await uploadPageImage(pageId, formData);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed!");
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
