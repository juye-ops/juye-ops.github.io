'use client';
import { ProjectFrontmatter } from "@/entities/portfolio/model/portfolio.types";
import { ProjectContent } from "../../../entities/portfolio/ui/ProjectContent"
import { ProjectDetail } from "../../../entities/portfolio/ui/ProjectDetail";

interface ProjectProps {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function Project({ frontmatter, content }: ProjectProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden px-20 pt-40">
      <div className="flex-shrink-0">
        <ProjectContent frontmatter={frontmatter} />
      </div>
      <div className="flex-shrink-0">
        <ProjectDetail title={frontmatter.title} content={content} />
      </div>
    </div>
  )
}