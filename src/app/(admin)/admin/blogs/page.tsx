import BlogsTable from "@/src/feature/blogs/components/BlogsTable";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
// import { prisma } from "@/src/lib/prisma";

export const metadata: Metadata = {
  title: "Blogs Page | Admin Dashboard",
  description: " Blogs page content.",
  robots: {
    index: false, // important for admin pages
    follow: false,
  },
};

export default async function BlogsPage() {
  return(
     <BlogsTable/>
  )
}
