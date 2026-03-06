import DarkLuxuryBlock from "@/src/components/common/Ui/DarkLuxuryBlock";
import TestimonialsSection from "@/src/feature/Homepage/components/TestimonialsSection";
import type { Metadata } from "next";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata: Metadata = {
  title: "Maintenance | Paris Black Car",
  description:
    "We're performing scheduled maintenance. Please check back again shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <DarkLuxuryBlock>
      <section className="min-h-[70vh] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-10 text-center shadow-2xl">
          <p className="text-amber-500 text-xs font-semibold tracking-[0.35em]">
            TEMPORARILY UNAVAILABLE
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-heading font-bold tracking-widest">
            We&apos;ll be back soon
          </h1>
          <p className="mt-5 text-white/70 leading-relaxed">
            Paris Black Car is currently undergoing maintenance. Please try
            again in a few minutes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto rounded-xl bg-amber-500 px-7 py-3 text-sm font-semibold tracking-wide text-black hover:bg-amber-400 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold tracking-wide text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <p className="mt-8 text-xs text-white/50">
            Need help now? Send us a message via the contact form.
          </p>
        </div>
      </section>
        <TestimonialsSection />
    </DarkLuxuryBlock>
  );
}
