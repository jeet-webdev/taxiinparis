import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
// import { prisma } from "@/src/lib/prisma";
import { HomePageFormValues } from "@/src/features/page-editor/HomePage/types/home.types";
import HomePageSection from "@/src/features/page-editor/HomePage/components/HomeSection";

export const metadata: Metadata = {
  title: "Edit Home Page | Admin Dashboard",
  description: "Edit and manage Home page content.",
  robots: {
    index: false,   // important for admin pages
    follow: false,
  },
};


export default async function HomeEditorPage() {
  // const page = await prisma.page.findFirst({
  //   where: { slug: "home-editor" },
  // });
  const page: HomePageFormValues = {
    title: "Get to Know Us - Taxi in Paris",
    homeHeaderImage: null,
    secureBooking: "Taxi in Paris is your best choice...",
    reliableServices: "Taxi in Paris is your best choice...",
    customerServices: "Taxi in Paris is your best choice...",
    fairPrice: "Taxi in Paris is your best choice...",
    metaTitle: "Book Paris Taxi Service at Cheapest Fare | Taxis in Paris",
    metaDescription: "string",
    metaKeywords: "string",
    status: "active",
  };


  // async function updateHomeSection(id: string, content: string) {
  //   "use server";

  //   await prisma.page.update({
  //     where: { id },
  //     data: {
  //       content,
  //       updatedAt: new Date(),
  //     },
  //   });

  //   // if you have public /home page
  //   revalidatePath("/home-editor");
  // }
  return <HomePageSection defaultValues={page} />;
}