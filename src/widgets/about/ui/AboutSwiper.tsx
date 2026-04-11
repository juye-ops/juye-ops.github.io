'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './About.module.css';
import { Content, Profile } from '@/entities/about';

interface AboutSwiperProps {
  frontmatter: any
  sections: string[]
}

export function AboutSwiper({ frontmatter, sections }: AboutSwiperProps) {
  return (
    <Swiper
      direction="vertical"
      modules={[Mousewheel, Pagination]}
      mousewheel={{ forceToAxis: true }}
      pagination={{ clickable: true, dynamicBullets: true }}
      keyboard={{ enabled: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <SwiperSlide className={styles.slide}>
        {frontmatter ? <Profile key="profile" frontmatter={frontmatter} /> : null}
      </SwiperSlide>
      {sections.map((section) => (
        <SwiperSlide className={styles.slide}>
          <Content section={section} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}