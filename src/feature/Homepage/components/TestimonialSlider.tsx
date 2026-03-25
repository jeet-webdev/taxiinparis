"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Review {
  name: string;
  image: string;
  text: string;
  time: string;
}

export default function TestimonialSlider({ reviews }: { reviews: Review[] }) {
  return (
    <section className="lg:px-6 px-0">
      <div className="max-w-378 mx-auto relative">
        <button className="prevBtn absolute -left-10 top-1/2 -translate-y-1/2 z-10 text-3xl text-[#8a6c26] lg:block hidden">
          ❮
        </button>
        <button className="nextBtn absolute -right-10 top-1/2 -translate-y-1/2 z-10 text-3xl text-[#8a6c26] lg:block hidden">
          ❯
        </button>

        <Swiper
          className="testimonialSwiper pb-12!"
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={{ prevEl: ".prevBtn", nextEl: ".nextBtn" }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="bg-[#faf8f2] rounded-2xl shadow-md border border-gray-200 p-6 min-h-55 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={review.image}
                    alt=""
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {review.name}
                    </div>
                    <div className="text-yellow-500 text-sm">★★★★★</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 overflow-hidden">
                  {review.text}
                </p>

                <div className="text-right text-xs text-gray-400 mt-3">
                  {review.time}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
