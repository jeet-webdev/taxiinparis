"use client";

import { useState, useMemo } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Remove HTML tags for length check
  const plainText = useMemo(() => {
    return description?.replace(/<[^>]+>/g, "") ?? "";
  }, [description]);

  // Approximate length check (adjust 250 if needed)
  const isLongContent = plainText.length > 250;

  return (
    <div className="px-1 text-left flex flex-col h-full">
      {/* Top Row */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF6A]/60 flex items-center justify-center">
          {icon}
        </div>

        <h3 className="text-[22px] text-[#D4AF6A] tracking-wide">
          {title}
        </h3>
      </div>

      {/* Description */}
      <div
        className={`text-gray-300 leading-relaxed transition-all duration-300 ${
          expanded ? "" : "line-clamp-5"
        }`}
        dangerouslySetInnerHTML={{ __html: description ?? "" }}
      />

      {/* Show button only if content is long */}
      {isLongContent && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-[#D4AF6A] text-sm font-medium hover:underline self-start"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}