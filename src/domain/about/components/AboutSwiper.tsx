'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Content } from './Content';
import { Profile } from './Profile';
import { AboutSectionData } from '../types/about.types';

export function AboutSwiper({ frontmatter, sections }: AboutSectionData) {

  return (
    <Swiper
      direction="vertical"
      modules={[Mousewheel, Pagination]}
      mousewheel={{ forceToAxis: true }}
      pagination={{ clickable: true, dynamicBullets: true }}
      keyboard={{ enabled: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <SwiperSlide>
        {frontmatter && <Profile key="profile" frontmatter={frontmatter} />}
      </SwiperSlide>
      {sections.map((section) => (
        <SwiperSlide>
          <Content section={section} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}