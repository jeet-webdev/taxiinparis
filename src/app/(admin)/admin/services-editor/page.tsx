import ServicesSection from "@/src/features/page-editor/ServicesPage/components/ServicesSection";
import { ServicesPageFormValues } from "@/src/features/page-editor/ServicesPage/types/services.types";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
// import { prisma } from "@/src/lib/prisma";


export const metadata: Metadata = {
  title: "Edit Service Page | Admin Dashboard",
  description: "Edit and manage Service page content.",
  robots: {
    index: false,   // important for admin pages
    follow: false,
  },
};


export default async function ServiceEditorPage() {
  // const page = await prisma.page.findFirst({
  //   where: { slug: "services-editor" },
  // });
  const page: ServicesPageFormValues = {
    title: "Get to Know Us - Taxi in Paris",
    servicesHeaderImage: null,
    content: "Taxi in Paris is your best choice...",
    metaTitle: "Book Paris Taxi Service at Cheapest Fare | Taxis in Paris",
    metaDescription: "string",
    metaKeywords: "string",
    status: "active",
  };


  // async function updateServicesSection(id: string, content: string) {
  //   "use server";

  //   await prisma.page.update({
  //     where: { id },
  //     data: {
  //       content,
  //       updatedAt: new Date(),
  //     },
  //   });

  //   // if you have public /services page
  //   revalidatePath("/services-editor");
  // }
  return <ServicesSection defaultValues={page} />;
}