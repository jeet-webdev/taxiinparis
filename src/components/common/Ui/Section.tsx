// components/ui/Section.tsx
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-8 md:pt-8 md:pb-2 px-4 ${className}`}>
      {children}
    </section>
  );
}