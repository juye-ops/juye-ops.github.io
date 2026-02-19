// entities/portfolio/ui/PortfolioHero.tsx
"use client";
import type { PortfolioProjectProps } from "../../model/ProjectContent/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProjectInfo } from "../ProjectInfo";
import { ProjectImage } from "../ProjectImage";

export function PortfolioContent({ project }: PortfolioProjectProps) {

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 items-start gap-12">
      {/* 왼쪽: 프로젝트 정보 */}
      <ProjectInfo project={project} />

      {/* 오른쪽: 이미지 Swiper */}
      <ProjectImage project={project} />
    </section>
  );
}
