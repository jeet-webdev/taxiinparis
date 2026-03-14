import { prisma } from "@/src/lib/prisma"; // Adjust import path
import { notFound } from "next/navigation";

export default async function CategoryDetailPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const categoryId = parseInt(params.categoryId);

  // THIS IS WHERE THE QUERY GOES
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      categoryPages: true, // This fetches the child pages from the database
    },
  });

  if (!category) return notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <h2 className="mt-6 text-lg font-semibold">Associated Pages</h2>
      <ul>
        {category.categoryPages.map((page) => (
          <li key={page.id} className="border-b py-2">
            {page.title} ({page.slug})
          </li>
        ))}
      </ul>
    </div>
  );
}
