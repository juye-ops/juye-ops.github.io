import { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { CoverflowSwiperProps } from "../types/coverflow-swiper.types";
import { CoverflowCard } from "./CoverflowCard";
import { useWheelScroll } from "../hooks/useWheelScroll";
import { COVERFLOW_CONFIG } from "../utils/config";
import Link from "next/link";

export function CoverflowSwiper({
  items,
  onItemChange,
  containerRef,
}: CoverflowSwiperProps) {
  const slides = useMemo(() => items ?? [], [items]);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const internalContainerRef = useRef<HTMLDivElement | null>(null);

  // containerRef가 없으면 internalContainerRef 사용
  const activeContainerRef = containerRef || internalContainerRef;

  useWheelScroll({
    containerRef: activeContainerRef,
    swiperRef,
    totalSlides: slides.length,
  });

  return (
    <>
      <Swiper
        onSwiper={
          (swiper) => { swiperRef.current = swiper; }
        }
        modules={[EffectCoverflow, Keyboard]}
        effect="coverflow"
        grabCursor
        centeredSlides={true}
        loop={items.length > 2}
        slidesPerView={COVERFLOW_CONFIG.swiper.slidesPerView}
        spaceBetween={COVERFLOW_CONFIG.swiper.spaceBetween}
        speed={COVERFLOW_CONFIG.swiper.speed}
        keyboard={{ enabled: true }}
        coverflowEffect={COVERFLOW_CONFIG.effect}
        onSlideChange={(swiper) => {
          const idx = swiper.realIndex;
          const item = slides[idx];
          if (item && onItemChange) onItemChange(item);
        }}

      >
        {slides.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide-coverflow w-70! sm:w-100! md:w-130! px-20">
            <Link href={`blog/${item.domainSlug}/${item.categorySlug}/${item.slug}`}>
              <CoverflowCard item={item} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}