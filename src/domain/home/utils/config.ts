// src/widgets/home/coverflow/model/config.ts
export const COVERFLOW_CONFIG = {
  effect: {
    rotate: 12,
    stretch: 0,
    depth: 220,
    modifier: 1.4,
    slideShadows: false,
  },
  swiper: {
    spaceBetween: -60,
    speed: 300,
    slidesPerView: "auto" as const,
  },
  scroll: {
    scrollThreshold: 100,
    slideToSpeed: 100,
  },
  card: {
    heightMobile: "h-[700px]",
    heightTablet: "sm:!h-[500px]",
    widthMobile: "!w-[150px]",
    widthTablet: "sm:!w-[250px]",
    widthDesktop: "md:!w-[350px]",
  },
} as const;
