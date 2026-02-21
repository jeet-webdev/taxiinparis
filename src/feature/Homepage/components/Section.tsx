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
    <section className={`py-28 md:py-32 ${className}`}>
      {children}
    </section>
  );
}