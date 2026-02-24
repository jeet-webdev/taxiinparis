"use client";
import { Star } from "@mui/icons-material";

interface TestimonialCardProps {
  quote: string;
  author: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  author,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <figure
      className="
        max-w-5xl
        mx-auto
        px-6
        md:px-12
        text-left
        text-white
      "
    >
      {/* Quote + Text Row */}
      <div className="flex items-start gap-4">
        
        {/* Decorative Quote Mark */}
        <span
          className="
            text-6xl
            md:text-7xl
            text-[#D4AF6A]
            leading-none
            mt-2
          "
          aria-hidden="true"
        >
          “
        </span>

        {/* Quote Text */}
        <blockquote
          className="
            text-base
            md:text-lg
            lg:text-xl
            leading-relaxed
            text-gray-200
            font-light
          "
        >
          {quote}
        </blockquote>
      </div>

      {/* Author + Stars */}
      <figcaption className="mt-3 ml-11 flex items-center gap-3">
        <span className="text-[#D4AF6A] font-semibold text-lg">
          {author}
        </span>

        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <Star
              key={index}
              sx={{
                fontSize: 18,
                color: "#D4AF6A",
              }}
            />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}