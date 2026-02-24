// components/ui/DarkLuxuryBlock.tsx
import { ReactNode } from "react";

export default function DarkLuxuryBlock({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative text-white">
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#292d37]" />
      
      {/* Texture */}
      <div className="absolute inset-0 bg-[url('/assets/images/pexels-jarod.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}