import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useAbout } from '../model/useAbout';
import { Profile } from '@/pages/About/ui/Profile';
import { Content } from '@/pages/About/ui/Content';
import styles from './About.module.css';

export function About() {
  const { frontmatter, sections, isLoading, error } = useAbout();

  if (isLoading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>오류: {error}</div>;

  return (
    <Swiper
      direction="vertical"
      modules={[Mousewheel, Pagination]}
      mousewheel={{ forceToAxis: true }}
      pagination={{ clickable: true, dynamicBullets: true }}
      style={{ position: 'absolute', inset: 0 }}
      >
      <SwiperSlide className={styles.slide}>
        {frontmatter && <Profile frontmatter={frontmatter} />}
      </SwiperSlide>
      {sections.map((section, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <Content section={section} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
