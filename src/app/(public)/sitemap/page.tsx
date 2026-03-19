import { getBlogPage } from "@/src/actions/blog/getBlogs";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { NavLink } from "@/src/feature/page-editor/HeaderEditor/types/header.types";

export const metadata = {
  title: "Sitemap | Luxury Limo",
  description: "Browse all pages and blog posts available on our website.",
};

export default async function SitemapPage() {
  const { blogs } = await getBlogPage();
  const footerData = await prisma.footer.findFirst();
  const navLinks: NavLink[] = Array.isArray(footerData?.navLinks)
    ? (footerData.navLinks as unknown as NavLink[])
    : [];
  console.log("Footer Data in Sitemap:", footerData); // Debug log to check footer data
  const categories = await prisma.category.findMany({
    include: {
      categoryPages: {
        select: { title: true, slug: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-12">Sitemap</h1>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-14">
          {/* Main Pages */}
          {navLinks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
                Main Pages
              </h2>

              <ul className="space-y-2 text-sm text-gray-300">
                {navLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href || "/"}
                      className="hover:text-white transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dynamic Categories */}
          {categories.map((cat) => (
            <div key={cat.id}>
              <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
                {cat.name.trim()}
              </h2>

              <ul className="space-y-2 text-sm text-gray-300">
                {cat.categoryPages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/category/${cat.slug}/${page.slug
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="hover:text-white transition"
                    >
                      {page.title.trim()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Blog Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
              Blog
            </h2>

            <ul className="space-y-2 text-sm text-gray-300 max-h-[300px] overflow-y-auto pr-2">
              {blogs.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-white transition"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
