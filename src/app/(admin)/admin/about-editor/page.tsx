import AboutSection from "@/src/feature/page-editor/AboutUs/components/AboutSection";
import { AboutPageFormValues } from "@/src/feature/page-editor/AboutUs/types/about.types";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
// import { prisma } from "@/src/lib/prisma";


export const metadata: Metadata = {
  title: "Edit About Page | Admin Dashboard",
  description: "Edit and manage About Us page content.",
  robots: {
    index: false,   // important for admin pages
    follow: false,
  },
};


export default async function AboutEditorPage() {
  // const page = await prisma.page.findFirst({
  //   where: { slug: "about-editor" },
  // });
  const page: AboutPageFormValues = {
    title: "Get to Know Us - Taxi in Paris",
    headerImage: null,
    content: "Taxi in Paris is your best choice...",
    metaTitle: "Book Paris Taxi Service at Cheapest Fare | Taxis in Paris",
    metaDescription: "string",
    metaKeywords: "string",
    status: "active",
  };


  // async function updateAboutSection(id: string, content: string) {
  //   "use server";

  //   await prisma.page.update({
  //     where: { id },
  //     data: {
  //       content,
  //       updatedAt: new Date(),
  //     },
  //   });

  //   // if you have public /about page
  //   revalidatePath("/about-editor");
  // }
  return <AboutSection defaultValues={page} />;
}