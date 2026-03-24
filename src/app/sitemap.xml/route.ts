import { prisma } from "@/src/lib/prisma";
import { getBlogPage } from "@/src/actions/blog/getBlogs";

export async function GET() {
  const baseUrl = "https://luxurylimoparis.fr";
  const today = new Date().toISOString();

  // ✅ FIX: Pass (1, 1000) to fetch the first page but with a limit of 1000 blogs
  // This overrides the default limit of 6.
  const { blogs } = await getBlogPage(1, 1000);

  const footerData = await prisma.footer.findFirst();

  const navLinks = Array.isArray(footerData?.navLinks)
    ? (footerData.navLinks as { label: string; url: string }[])
    : [];

  const categories = await prisma.category.findMany({
    include: {
      categoryPages: {
        select: { slug: true },
      },
    },
  });

  const extraPages = await prisma.page.findMany({
    where: { id: { gt: 6 } },
    select: { slug: true },
  });

  type UrlType = {
    loc: string;
    priority: number;
    changefreq: string;
    lastmod: string;
  };

  let urls: UrlType[] = [];

  // ✅ Home
  urls.push({
    loc: `${baseUrl}/`,
    priority: 1.0,
    changefreq: "daily",
    lastmod: today,
  });

  // ✅ Nav pages
  navLinks.forEach((link) => {
    if (!link.url) return;
    urls.push({
      loc: `${baseUrl}${link.url.startsWith("/") ? link.url : `/${link.url}`}`,
      priority: 0.9,
      changefreq: "weekly",
      lastmod: today,
    });
  });

  // ✅ Extra pages
  extraPages.forEach((p) => {
    urls.push({
      loc: `${baseUrl}/${p.slug}`,
      priority: 0.8,
      changefreq: "monthly",
      lastmod: today,
    });
  });

  // ✅ Category pages
  categories.forEach((cat) => {
    cat.categoryPages.forEach((p) => {
      const formattedSlug = p.slug.trim().toLowerCase().replace(/\s+/g, "-");

      urls.push({
        loc: `${baseUrl}/category/${cat.slug}/${formattedSlug}`,
        priority: 0.7,
        changefreq: "weekly",
        lastmod: today,
      });
    });
  });

  // ✅ Blogs (Now showing all fetched blogs)
  blogs.forEach((b) => {
    urls.push({
      loc: `${baseUrl}/blog/${b.slug}`,
      priority: 0.6,
      changefreq: "monthly",
      // Use the actual blog updated date if it exists, otherwise use today
      lastmod: b.updatedAt ? new Date(b.updatedAt).toISOString() : today,
    });
  });

  // ✅ Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
