import { getBlogPage } from "@/src/actions/blog/getBlogs";

export default async function sitemap() {
  const { blogs } = await getBlogPage();

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "yearly",
    },
  ];

  // Dynamic blog pages
  const blogPages = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  return [...staticPages, ...blogPages];
}