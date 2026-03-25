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
  ctaBtnText: "Book Your Transfer Now",   // ADD
  ctaBtnLink: "https://portail.driverconnect.fr/vtc-fils/template?DS=1&tkn=00001_2769650_-1157023572_1772012786065",  // ADD

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
