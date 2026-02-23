import BlogsTable from "@/src/feature/blogs/components/BlogsTable";
import type { BlogRow } from "@/src/feature/blogs/components/BlogsTable";
import { getBlogs } from "@/src/actions/blog/getBlogs";
import { deleteBlog } from "@/src/actions/blog/deleteBlog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs Page | Admin Dashboard",
  description: "Blogs page content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  const rows: BlogRow[] = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    metaDescription: blog.metaDescription ?? "",
    metaKeywords: blog.metaKeywords ?? "",
  }));

  async function handleDelete(id: number) {
    "use server";
    return deleteBlog(id);
  }

  return <BlogsTable rows={rows} onDelete={handleDelete} />;
}
