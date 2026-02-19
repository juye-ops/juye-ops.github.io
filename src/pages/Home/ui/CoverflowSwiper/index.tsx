
import { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { useWheelScroll } from "../../lib/hooks/useWheelScroll";
import { COVERFLOW_CONFIG } from "../../model/config";
import type { CoverflowSwiperProps } from "../../model/CoverflowSwiper/types";
import { CoverflowCard } from "../CoverflowCard";

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

  const handleCardClick = (clickedDataIndex: number) => {
    if (!swiperRef.current) return;
    const targetRealIndex = clickedDataIndex % slides.length;
    swiperRef.current.slideToLoop(targetRealIndex, 300);
  };

  return (
    <div ref={internalContainerRef}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[EffectCoverflow, Keyboard]}  // ← Mousewheel 제거!
        effect="coverflow"
        grabCursor
        centeredSlides={true}
        loop={true}
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
        className="w-1/3"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide-coverflow !w-[200px] sm:!w-[300px] md:!w-[400px]">
            <CoverflowCard item={item} onClick={() => handleCardClick(index)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
