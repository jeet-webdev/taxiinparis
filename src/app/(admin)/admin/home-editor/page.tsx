import type { Metadata } from "next";
import { getPageBySlug } from "@/src/actions/page/getPage";
import {
  updatePage,
  type UpdatePageInput,
} from "@/src/actions/page/updatePage";
import HomePageSection from "@/src/feature/page-editor/HomePage/components/HomeSection";
import type { HomePageFormValues } from "@/src/feature/page-editor/HomePage/types/home.types";
import { Controller, useForm, FormProvider, Path } from "react-hook-form";
export const metadata: Metadata = {
  title: "Edit Home Page | Admin Dashboard",
};

export default async function HomeEditorPage() {
  const page = await getPageBySlug("home");

  if (!page) {
    return <div>Home page not found.</div>;
  }

  const defaultValues: HomePageFormValues = {
    title: page.title,
    homeHeaderImage: page.imageUpload ?? null,
    imageAlt: page.imageAlt ?? "",
    // secureBooking: page.secureBooking ?? "",
    // secureBookingTitle: page.secureBookingTitle ?? "",
    // customerServiceTitle: page.customerServiceTitle ?? "",
    // fairPriceTitle: page.fairPriceTitle ?? "",
    // reliableServiceTitle: page.reliableServiceTitle ?? "",
    // reliableServices: page.reliableService ?? "",
    // customerServices: page.customerService ?? "",
    // fairPrice: page.fairPrice ?? "",
    // secureBookingIcon: page.secureBookingIcon ?? "",
    // reliableServiceIcon: page.reliableServiceIcon ?? "",
    // customerServiceIcon: page.customerServiceIcon ?? "",
    // fairPriceIcon: page.fairPriceIcon ?? "",
    metaTitle: page.metaTitle ?? "",
    metaDescription: page.metaDescription ?? "",
    metaKeywords: page.metaKeywords ?? "",
    status: (page.status as "active" | "inactive") ?? "active",
    heroColorTitle: page.heroColorTitle ?? "",
    heroSubtitle: page.heroSubtitle ?? "",
    heroDescription: page.heroDescription ?? "",
    heroButtonText: page.heroButtonText ?? "",
    heroButtonLink: page.heroButtonLink ?? "",
    heroTrustText: page.heroTrustText ?? "",
    heroPoint1: page.heroPoint1 ?? "",
    heroPoint2: page.heroPoint2 ?? "",
    heroPoint3: page.heroPoint3 ?? "",
    heroCard1Title: page.heroCard1Title ?? "",
    heroCard2Title: page.heroCard2Title ?? "",
    heroCard3Title: page.heroCard3Title ?? "",
    heroCardFootnote: page.heroCardFootnote ?? "",
  };

  async function handleSave(data: UpdatePageInput) {
    "use server";
    return updatePage("home", data);
  }

  // PASS pageId HERE
  return (
    <HomePageSection
      defaultValues={defaultValues}
      onSave={handleSave}
      pageId={page.id}
    />
  );
}
