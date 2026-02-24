import React from 'react';
import Image from 'next/image';
import { getPageBySlug } from "@/src/actions/page/getPage";
import { notFound } from "next/navigation";

// Generate dynamic metadata for SEO based on what was saved in the editor
export async function generateMetadata() {
  const page = await getPageBySlug("services");
  if (!page) return {};

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
    keywords: page.metaKeywords,
  };
}

export default async function ServicesPage() {
  const page = await getPageBySlug("services");

  // If page doesn't exist or is inactive, you might want to show a 404
  if (!page || page.status === "inactive") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {page.imageUpload && (
          <Image 
            src={page.imageUpload} 
            alt={page.title} 
            fill 
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0F1C]/80 z-10" />
        
        <div className="relative z-20 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-widest mb-4 uppercase">
            {page.title}
          </h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto" />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-amber-500">
              Premium Chauffeur Experience
            </h2>
            {/* Using dangerouslySetInnerHTML if 'content' comes from a Rich Text Editor */}
            <div 
              className="text-gray-400 leading-relaxed mb-4 prose prose-invert"
              dangerouslySetInnerHTML={{ __html: page.content || "" }} 
            />
          </div>
          
          <div className="relative aspect-video bg-white/5 rounded-lg border border-white/10 overflow-hidden flex items-center justify-center">
            {page.imageUpload ? (
              <Image 
                src={page.imageUpload} 
                alt="Service Feature" 
                fill 
                className="object-cover"
              />
            ) : (
              <span className="text-gray-600 italic font-light">Image Placeholder</span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}