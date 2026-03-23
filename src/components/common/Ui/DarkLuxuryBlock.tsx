// components/ui/DarkLuxuryBlock.tsx
import { ReactNode } from "react";

export default function DarkLuxuryBlock({ children }: { children: ReactNode }) {
  return (
    // <section className="relative bg-[url('/assets/bg-1.jpg')] bg-cover  text-white w-full">
    <section className="relative bg-[#ffffff] bg-cover  text-white w-full">
      <div className="" />

      {/* <div className="absolute inset-0 bg-[url('/assets/bg-1.jpg')] bg-cover bg-center" /> */}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
