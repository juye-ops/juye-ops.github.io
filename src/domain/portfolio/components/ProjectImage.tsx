"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProjectFrontmatter } from "@/domain/portfolio/types/portfolio.types";

interface ProjectImageProps {
  frontmatter: Omit<ProjectFrontmatter, "images"> & {
    images?: { src: string; caption?: string }[];
  };
}

export function ProjectImage({ frontmatter }: ProjectImageProps) {
  const hasImages = frontmatter.images && frontmatter.images.length > 0;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  if (!hasImages) {
    return (
      <div className="w-full aspect-video max-w-md rounded-xl flex items-center justify-center text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700">
        준비중
      </div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-2">
      {/* 1. 메인 이미지 슬라이더 (16:9 고정 및 초소형 핏) */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full w-full"
          navigation={{
            nextEl: '.swiper-button-prev-custom',
            prevEl: '.swiper-button-next-custom',
          }}
        >
          {frontmatter.images!.map((image, idx) => (
            <SwiperSlide key={idx} className="h-full w-full">
              <img
                src={image.src}
                alt={image.caption || `${frontmatter.title} ${idx + 1}`}
                className="h-full w-full object-cover select-none"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 콤팩트 사이즈에 맞춘 미니 화살표 버튼 */}
        {frontmatter.images!.length > 1 && (
          <>
            <button className="swiper-button-prev-custom absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-5.5 h-5.5 bg-black/15 hover:bg-black/35 backdrop-blur-xs rounded-full text-white transition flex items-center justify-center">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="swiper-button-next-custom absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-5.5 h-5.5 bg-black/15 hover:bg-black/35 backdrop-blur-xs rounded-full text-white transition flex items-center justify-center">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>

      {/* 2. 필름 스트립 미니 썸네일 리스트 (도트 인디케이터처럼 작고 앙증맞게 축소) */}
      {frontmatter.images!.length > 1 && (
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
          {frontmatter.images!.map((image, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => swiperRef.current?.slideTo(idx)}
                className={`relative flex-shrink-0 w-8 h-5 rounded-xs overflow-hidden transition-all duration-200 border ${
                  isActive
                    ? "border-blue-500 scale-95"
                    : "border-transparent opacity-40 hover:opacity-75"
                }`}
              >
                <img src={image.src} alt="thumbnail" className="w-full h-full object-cover select-none" />
              </button>
            );
          })}
        </div>
      )}

      {/* 3. 하단 초슬림 캡션 영역 */}
      {frontmatter.images![activeIndex]?.caption && (
        <div className="w-full p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/60 shadow-3xs mt-0.5">
          <div className="flex gap-2 items-start">
            <span className="inline-flex items-center justify-center text-[8px] font-mono font-bold bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100/60 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 rounded px-1 py-0.5 mt-0.5 select-none">
              FIG {activeIndex + 1}
            </span>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal font-normal tracking-tight break-keep flex-1">
              {frontmatter.images![activeIndex].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}