"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export type MenuSliderItem = {
  image: string;
  name: string;
  price: string;
};

type MenuSliderProps = {
  items: MenuSliderItem[];
};

export default function MenuSlider({ items }: MenuSliderProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[FreeMode, Navigation]}
        freeMode
        navigation
        grabCursor
        spaceBetween={16}
        loop={true}
        slidesPerView={1.5}
        breakpoints={{
          768: { slidesPerView: 3.5, spaceBetween: 24 },
        }}
        className="!overflow-visible [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white"
      >
        {items.map((item) => (
          <SwiperSlide key={item.name}>
            <article className="origin-center cursor-pointer transition duration-300 hover:scale-[1.03] hover:shadow-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 768px) 28vw, 67vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-3 text-lg font-medium text-white">{item.name}</h3>
              <p className="mt-1 text-amber-100/80">{item.price}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
