// src/widgets/home/coverflow/ui/CoverflowWidgetStyles.ts
export const COVERFLOW_STYLES = `
  .swiper-slide-coverflow {
    transition: transform 0.45s ease, opacity 0.45s ease;
    opacity: 0.4;
  }

  .swiper-slide-coverflow.swiper-slide-active {
    transform: scale(1.08) translateY(-8px);
    opacity: 1;
    z-index: 20;
  }

  .swiper-slide-coverflow.swiper-slide-prev,
  .swiper-slide-coverflow.swiper-slide-next {
    opacity: 0.7;
    transform: scale(0.9);
  }
`;
 