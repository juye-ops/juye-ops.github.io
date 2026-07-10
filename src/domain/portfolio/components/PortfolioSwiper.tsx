'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Project } from "./Project";

import projectMetadata from "@/shared/metadata/portfolio.json"


export function PortfolioSwiper() {
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
      {projectMetadata.map((project) => (
        <SwiperSlide>
          <Project {...project} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}