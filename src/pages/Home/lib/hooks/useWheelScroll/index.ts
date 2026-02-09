// src/widgets/home/coverflow/lib/hooks/useWheelScroll.ts
import { useEffect, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { COVERFLOW_CONFIG } from "../../../model/config";

interface UseWheelScrollProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  swiperRef: React.RefObject<SwiperInstance | null>;
  totalSlides: number;
}

export function useWheelScroll({
  containerRef,
  swiperRef,
  totalSlides,
}: UseWheelScrollProps) {
  const lastScrollTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!containerRef?.current) {
      console.warn("containerRef not available");
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      if (!swiperRef.current) return;

      e.preventDefault();  // ← 기본 스크롤 방지!

      const scrollAmount = Math.abs(e.deltaY);
      const iterations = Math.round(
        scrollAmount / COVERFLOW_CONFIG.scroll.scrollThreshold
      );

      const currentRealIndex = swiperRef.current.realIndex;
      let targetRealIndex: number;

      if (e.deltaY > 0) {
        // 아래로 스크롤 → 오른쪽으로 슬라이드
        targetRealIndex = (currentRealIndex + iterations) % totalSlides;
      } else if (e.deltaY < 0) {
        // 위로 스크롤 → 왼쪽으로 슬라이드
        targetRealIndex =
          (currentRealIndex - iterations + totalSlides * 10) % totalSlides;
      } else {
        return;
      }

      swiperRef.current.slideToLoop(
        targetRealIndex,
        COVERFLOW_CONFIG.scroll.slideToSpeed
      );

      lastScrollTimeRef.current = Date.now();
    };

    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });  // ← passive: false!

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [containerRef, swiperRef, totalSlides]);
}
