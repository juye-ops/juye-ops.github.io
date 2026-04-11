'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Project } from "@/widgets/portfolio";

interface PortfolioSwiperProps {
  projects: any[];
}

export function PortfolioSwiper({ projects }: PortfolioSwiperProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      mousewheel={true}
      keyboard={{ enabled: true }}
      className='h-screen'
      direction='vertical'
    >
      {projects.map((project) => (
        <SwiperSlide>
          <Project {...project} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}