"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProjectFrontmatter } from "@/domain/portfolio/types/portfolio.types";

interface ProjectImageProps {
  frontmatter: ProjectFrontmatter;
}

export function ProjectImage({ frontmatter }: ProjectImageProps) {
  const hasImages = frontmatter.images && frontmatter.images.length > 0;
  // Swiper 초기화 상태를 추적하여 버튼 렌더링 보장
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative group w-full">
      <div className="w-full h-72 xl:h-80 rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-800">
        {hasImages ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            className="h-full w-full"
            onInit={() => setIsReady(true)}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              el: '.swiper-pagination-custom',
              clickable: true,
            }}
          >
            {frontmatter.images!.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={src}
                  alt={`${frontmatter.title} ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
            
            {/* Swiper 내부 매커니즘을 이용한 버튼 배치 */}
            {hasImages && frontmatter.images!.length > 1 && (
              <>
                <button className="swiper-button-prev-custom absolute left-4 top-1/2 z-10 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="swiper-button-next-custom absolute right-4 top-1/2 z-10 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <div className="swiper-pagination-custom absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2" />
              </>
            )}
          </Swiper>
        ) : (
          /* 이미지 준비중 UI (생략) */
          <div className="h-full flex items-center justify-center text-neutral-400">준비중</div>
        )}
      </div>
    </div>
  );
}