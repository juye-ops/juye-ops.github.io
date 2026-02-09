// pages/PortfolioPage.tsx
"use client";
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { usePortfolioProjects } from '@/pages/Portfolio/lib';
import { Project } from '@/pages/Portfolio/ui/Project';

export function Portfolio() {
  const { projects, loading } = usePortfolioProjects();
  const [activeIndex, setActiveIndex] = useState(0);

  // if (loading) return <LoadingSpinner />;

  return (
    <div className='absolute inset-0'>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        navigation={{
          prevEl: '.global-prev',
          nextEl: '.global-next',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        mousewheel={true}
        keyboard={{ enabled: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className='h-screen'
        direction='vertical'
      >
        {projects.map((project) => (
          <SwiperSlide key={project.slug}>
            <Project project={project} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 글로벌 네비게이션 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border">
        <div className="text-sm font-semibold min-w-[60px] text-center">
          {activeIndex + 1} / {projects.length}
        </div>
      </div>
    </div>
  );
}
