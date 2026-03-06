import React, { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/src/actions/page/getPage";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
// import ContactForm from "@/src/feature/Contact/ContactForm";
import ContactForm from "@/src/feature/Contact/ContactForm";

const getContactPage = cache(() => getPageBySlug("contact"));
const safe = (value?: string | null) => value ?? undefined;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  const title = page?.metaTitle ?? page?.title ?? "Contact Us";
  const description =
    safe(page?.metaDescription) ??
    "Contact Taxi in Paris to book a private chauffeur, request a quote, or ask questions about our services.";

  return {
    title,
    description,
    keywords: safe(page?.metaKeywords),

    openGraph: {
      title,
      description,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ContactPage() {
  const page = await getContactPage();

  if (page && page.status === "inactive") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <DarkLuxuryBlock>
        {/* Page Header */}
        <section className=" py-12">
          <div className="text-center px-6">
            <h1 className="text-5xl font-light text-[#d4af6a] mb-4 tracking-tight">
              Contact Us
            </h1>
            <div className="h-[2px] w-28 bg-[#d4af6a] mx-auto relative">
              <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#d4af6a] rotate-45" />
            </div>
          </div>
        </section>

        {/* Main Form and Widget Section */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Side: Map and Form */}
            <div className="flex-1">
              {/* Google Map Section */}
              <div className="w-full h-[380px] rounded-lg overflow-hidden border border-gray-200 mb-10 shadow-sm">
                <iframe
                  src="https://maps.google.com/maps?q=48.8588589,2.3470599&z=11&output=embed"
                  className="w-full h-full border-none"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

           
              <ContactForm />
            </div>

            {/* Right Side: Fixed Booking Widget */}
            <aside className="w-full lg:w-[420px]">
              <div className="sticky top-24 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 h-[720px] bg-white">
                <iframe
                  src="https://portail.driverconnect.fr/vtc-fils/template?src=se&tkn=00001_2769650_-1157023572_1772012786065"
                  allow="geolocation"
                  title="Booking Widget"
                  className="w-full h-full border-none"
                />
              </div>
            </aside>
          </div>
        </section>
        <TestimonialsSection />
      </DarkLuxuryBlock>
    </main>
  );
}
