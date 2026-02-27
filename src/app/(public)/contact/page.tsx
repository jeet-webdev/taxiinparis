import React, { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/src/actions/page/getPage";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";

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
        <section className="bg-[#292d37] py-12">
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

              {/* Contact Form matching image_bb6a96.jpg */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#d4af6a]">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#d4af6a]">
                      Surname *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#d4af6a]">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#d4af6a]">
                      Phone
                    </label>
                    <div className="flex border border-gray-300 rounded overflow-hidden">
                      <div className="flex items-center px-3 bg-gray-50 border-r border-gray-300">
                        <span className="text-lg">🇫🇷</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className="w-full p-2.5 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#d4af6a]">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 outline-none resize-none"
                  />
                </div>

                {/* Math Solver/Bot Verification as seen in image_bb6a96.jpg */}
                <div className="max-w-[200px] space-y-2">
                  <label className="text-sm font-semibold text-[#d4af6a] italic">
                    Solve: 4 + 7 = ?
                  </label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-gray-300 rounded outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-16 py-3.5 bg-black text-white text-lg font-bold rounded-md hover:bg-gray-800 transition-all uppercase tracking-widest shadow-lg"
                  >
                    Send
                  </button>
                </div>
              </form>
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
