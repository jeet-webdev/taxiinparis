import { prisma } from "@/src/lib/prisma";
import { getBlogPage } from "@/src/actions/blog/getBlogs";

export async function GET() {
  const baseUrl = "https://luxurylimoparis.fr";

  const today = new Date().toISOString();

  const { blogs } = await getBlogPage();

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
    urls.push({
      loc: `${baseUrl}${link.url}`,
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
      urls.push({
        loc: `${baseUrl}/category/${cat.slug}/${p.slug
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
        priority: 0.7,
        changefreq: "weekly",
        lastmod: today,
      });
    });
  });

  // ✅ Blogs
  blogs.forEach((b) => {
    urls.push({
      loc: `${baseUrl}/blog/${b.slug}`,
      priority: 0.6,
      changefreq: "monthly",
      lastmod: today,
    });
  });

  // ✅ XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>
`
  )
  .join("")}

</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}