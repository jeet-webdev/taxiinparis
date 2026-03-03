// TestimonialsSection.tsx

import Image from "next/image";
import { prisma } from "@/src/lib/prisma";
// import TestimonialCard from "./TestimonialCard";
import { Container } from "@mui/material";
import Section from "@/src/components/common/Ui/Section";
import Link from "next/link";
type AppLink = {
  url: string;
  platform: "google_play" | "app_store";
  isVisible: boolean;
};
export default async function TestimonialsSection() {
  const footer = await prisma.footer.findFirst();

  const appLinks = (footer?.appLinks as AppLink[]) || [];

  const visibleLinks = appLinks.filter((app) => app.isVisible);
  return (
    <Section>
      <Container className="relative z-10 py-2 text-center">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#D4AF6A] to-transparent mb-8" />
        <div className="mt-8 flex justify-center gap-6">
          {visibleLinks.map((app, index) => {
            if (app.platform === "google_play") {
              return (
                <Link key={index} href={app.url} target="_blank">
                  <Image
                    src="/assets/images/google-play-store.png"
                    alt="Google Play"
                    width={170}
                    height={55}
                    className="transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                </Link>
              );
            }
            if (app.platform === "app_store") {
              return (
                <Link key={index} href={app.url} target="_blank">
                  <Image
                    src="/assets/images/app-store-1.png"
                    alt="App Store"
                    width={170}
                    height={55}
                    className="transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                </Link>
              );
            }

            return null;
          })}
        </div>
        {/* Phone */}
        {/* <div className="mt-0.5 text-[#D4AF6A] text-2xl font-semibold tracking-widest">
          +33 1 76 44 33 00
        </div> */}
      </Container>
    </Section>
  );
}
