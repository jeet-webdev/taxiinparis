import type { Metadata } from "next";
import BlogForm from "@/src/feature/blogs/components/BlogForm";
import { getBlogById } from "@/src/actions/blog/getBlogs";
import { updateBlog } from "@/src/actions/blog/updateBlog";
import { notFound } from "next/navigation";
import type { BlogPagesFormValues } from "@/src/feature/blogs/types/blog.types";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Blog | Taxi in Paris Admin",
  description:
    "Edit blog content, SEO settings, and meta information from the admin dashboard of Taxi in Paris.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: "/admin/blogs",
  },
};

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) notFound();

  const defaultValues: BlogPagesFormValues = {
    title: blog.title,
    slug: blog.slug,
    image: blog.imageUpload ?? null,
    bannerImage: blog.bannerImage ?? null,
    bannerAlt: blog.bannerAlt ?? "",
    text: blog.text ?? "",
    metaTitle: blog.metaTitle ?? "",
    metaDescription: blog.metaDescription ?? "",
    metaKeywords: blog.metaKeywords ?? "",
    ctaBtnText: blog.ctaBtnText ?? "Book Your Transfer Now",    // ADD
    ctaBtnLink: blog.ctaBtnLink ?? "https://portail.driverconnect.fr/vtc-fils/template?DS=1&tkn=00001_2769650_-1157023572_1772012786065",  // ADD

  };

  async function handleSave(data: BlogPagesFormValues) {
    "use server";
    return updateBlog(blog!.id, data);
  }

  return (
    <BlogForm
      mode="edit"
      blogId={id}
      defaultValues={defaultValues}
      onSave={handleSave}
    />
  );
}
