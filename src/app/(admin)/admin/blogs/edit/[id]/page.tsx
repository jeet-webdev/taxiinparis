import type { Metadata } from "next";
import BlogForm from "@/src/feature/blogs/components/BlogForm";
import { BlogPagesFormValues } from "@/src/feature/blogs/types/blog.types";

interface Props {
  params: { id: string };
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

const page: BlogPagesFormValues = {
  title: "Get to Know Us - Taxi in Paris",
  slug: "get-to-know-us-taxi-in-paris",
  text: "Taxi in Paris is your best choice...",
  metaTitle: "Book Paris Taxi Service at Cheapest Fare | Taxis in Paris",
  metaDescription:
    "Book reliable and affordable taxi services in Paris with professional drivers. Enjoy safe, comfortable, and timely transportation across the city.",
  metaKeywords:
    "Paris taxi service, cheap taxi in Paris, airport transfer Paris, book taxi Paris, taxi in Paris",
};

export default function EditBlogPage({ params }: Props) {
  return (
    <BlogForm
      mode="edit"
      blogId={params.id}
      defaultValues={page}
    />
  );
}