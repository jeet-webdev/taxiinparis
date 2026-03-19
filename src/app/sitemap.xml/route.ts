import { prisma } from "@/src/lib/prisma";
import { getBlogPage } from "@/src/actions/blog/getBlogs";

export async function GET() {
  const baseUrl = "http://91.134.142.9";

  const { blogs } = await getBlogPage();

  const footerData = await prisma.footer.findFirst();
  const navLinks = Array.isArray(footerData?.navLinks)
    ? (footerData.navLinks as unknown as {
        label: string;
        url: string;
        showInNav?: boolean;
      }[])
    : [];

  const categories = await prisma.category.findMany({
    include: {
      categoryPages: true,
    },
  });

  let urls: string[] = [];

  // ✅ Nav links
  navLinks.forEach((link) => {
    if (!link.url) return;
    if (link.showInNav === false) return;

    urls.push(`
    <url>
      <loc>${baseUrl}${link.url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `);
  });

  // ✅ Categories + pages
  categories.forEach((cat) => {
    cat.categoryPages.forEach((page) => {
      urls.push(`
        <url>
          <loc>${baseUrl}/category/${cat.slug}/${page.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `);
    });
  });

  // ✅ Blogs
  blogs.forEach((blog) => {
    urls.push(`
      <url>
        <loc>${baseUrl}/blog/${blog.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
