import type { Metadata } from "next";
import BlogForm from "@/src/feature/blogs/components/BlogForm";
import { createBlog } from "@/src/actions/blog/createBlog";
import type { BlogPagesFormValues } from "@/src/feature/blogs/types/blog.types";

export const metadata: Metadata = {
  title: "Add New Blog | Admin Panel",
  description: "Create a new blog post in the admin dashboard.",
  keywords: [
    "admin blog",
    "add blog",
    "create blog",
    "dashboard blog management",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

const emptyDefaults: BlogPagesFormValues = {
  title: "",
  slug: "",
  text: "",
  image: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
};

export default function AddBlogPage() {
  async function handleSave(data: BlogPagesFormValues) {
    "use server";
    return createBlog(data);
  }

  return (
    <BlogForm mode="add" defaultValues={emptyDefaults} onSave={handleSave} />
  );
}
