import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogByTitle } from '@/src/actions/blog/getBlogs';
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import DarkLuxuryBlock from '@/src/components/common/Ui/DarkLuxuryBlock';

interface Props {
  params: Promise<{ title: string }>; // In Next.js 15, params is a Promise
}

export default async function SingleBlogPage({ params }: Props) {
  // 1. Resolve params and fetch blog data
  const { title } = await params;
  const blog = await getBlogByTitle(title);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0F1C]">
      <DarkLuxuryBlock>
        {/* --- HERO SECTION WITH WIDGET --- */}
        <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden">
          {/* Background Image */}
          <Image
            src="/assets/images/testimonial.jpg" 
            alt="Luxury Paris Chauffeur"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
          
          <div className="relative z-10 max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2 items-center px-6">
            {/* Left Side: Title Overlay */}
            <div className="text-white space-y-4">
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-tight">
                {blog.title}
              </h1>
              <div className="h-1 w-20 bg-amber-500" />
            </div>

            {/* Right Side: Booking Widget */}
            <div className="flex justify-end items-center h-full py-10">
              <div className="w-full max-w-[400px] h-[650px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white">
                <iframe
                  src="https://portail.driverconnect.fr/vtc-fils/template?src=se&tkn=00001_3739617_-1157023572_1769256160266"
                  className="w-full h-full border-none"
                  title="Booking Widget"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- ARTICLE CONTENT SECTION --- */}
        <article className="bg-white py-24">
          <div className="max-w-4xl mx-auto px-6">
            {/* Simple Breadcrumb or Category Label */}
            <p className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4 text-center">
              Paris Black Car Journal
            </p>
            
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 text-center mb-12">
              {blog.title}
            </h2>

            {/* Main Content Area */}
            <div 
              className="prose prose-lg prose-slate max-w-none text-gray-700 leading-relaxed 
                         first-letter:text-7xl first-letter:font-bold first-letter:text-amber-500 
                         first-letter:mr-3 first-letter:float-left"
              dangerouslySetInnerHTML={{ __html: blog.text || "" }} 
            />
            
            {/* Bottom Divider */}
            <div className="mt-20 h-px w-full bg-gray-100 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-amber-500 rotate-45" />
            </div>
          </div>
        </article>

        {/* --- TESTIMONIALS SECTION --- */}
        <section className="bg-gray-50 py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h3 className="text-3xl font-light text-gray-800 uppercase tracking-widest">Our Clients Say</h3>
               <div className="h-1 w-16 bg-amber-500 mx-auto mt-4" />
            </div>
            <TestimonialsSection />
          </div>
        </section>
      </DarkLuxuryBlock>
    </main>
  );
}