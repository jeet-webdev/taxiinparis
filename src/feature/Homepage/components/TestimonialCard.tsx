'use client'
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
        relative 
        max-w-3xl 
        mx-auto 
        px-6 
        py-10 
        text-center
      "
      aria-label={`Testimonial from ${author}`}
    >
      {/* Decorative Quote Mark */}
      <div
        className="
          text-6xl 
          text-amber-500 
          opacity-80 
          mb-6
        "
        aria-hidden="true"
      >
        “
      </div>

      {/* Quote */}
      <blockquote
        className="
          text-lg 
          md:text-xl 
          leading-relaxed 
          text-gray-200 
          font-light
        "
      >
        {quote}
      </blockquote>

      {/* Author + Rating */}
      <figcaption className="mt-8 flex flex-col items-center gap-3">
        <span className="text-white font-semibold tracking-wide">
          {author}
        </span>

        {/* Star Rating */}
        <div
  className="flex items-center gap-1"
  aria-label={`${rating} out of 5 stars`}
>
  {Array.from({ length: rating }).map((_, index) => (
    <Star
      key={index}
      sx={{
        fontSize: 18,
        color: "#f59e0b", // amber-500
      }}
    />
  ))}
</div>
      </figcaption>
    </figure>
  );
}