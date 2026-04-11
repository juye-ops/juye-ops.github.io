import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProjectInfo } from "./ProjectInfo";
import { ProjectImage } from "./ProjectImage";
import { ProjectFrontmatter } from "@/entities/portfolio/model/portfolio.types";

interface ProjectContentProps {
  frontmatter: ProjectFrontmatter
}

export function ProjectContent({ frontmatter }: ProjectContentProps) {

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 items-start gap-12">
      {/* 왼쪽: 프로젝트 정보 */}
      <ProjectInfo frontmatter={frontmatter} />

      {/* 오른쪽: 이미지 Swiper */}
      <ProjectImage frontmatter={frontmatter} />
    </section>
  );
}
