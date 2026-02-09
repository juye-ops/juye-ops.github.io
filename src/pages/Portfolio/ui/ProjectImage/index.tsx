
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { PortfolioProjectProps } from "../../model/ProjectContent/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function ProjectImage({ project }: PortfolioProjectProps) {
  const hasImages = project.images?.length > 0;


  return (
    <div className="relative">
      <div className="w-full h-72 xl:h-80 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800">
        {hasImages ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: `.img-prev-${project.slug}`,
              nextEl: `.img-next-${project.slug}`,
            }}
            pagination={{
              clickable: true,
              el: `.img-pagination-${project.slug}`
            }}
            spaceBetween={20}
            slidesPerView={1}
            className="h-full !w-full"
            loop={project.images!.length > 1}
          >
            {project.images!.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-full relative group">
                  <img
                    src={src}
                    alt={`${project.title} ${idx + 1}`}
                    className="h-full w-full object-cover rounded-3xl hover:scale-[1.02] transition-transform duration-500 group-hover:shadow-2xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-full flex items-center justify-center p-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-12 h-12 text-neutral-500" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-semibold text-neutral-600 dark:text-neutral-400">이미지 준비중</p>
            </div>
          </div>
        )}
      </div>
      {/* 이미지 네비게이션 (각 프로젝트별 고유 클래스) */}
      {hasImages && project.images!.length > 1 && (
        <>
          <div className={`img-prev-${project.slug} absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10 flex items-center justify-center hover:shadow-xl`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </div>
          <div className={`img-pagination-${project.slug} absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1`} />
          <div className={`img-next-${project.slug} absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10 flex items-center justify-center hover:shadow-xl`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </>
      )}
    </div>
  )
}