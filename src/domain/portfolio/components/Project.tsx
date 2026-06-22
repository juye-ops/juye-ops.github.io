'use client';

import { ProjectFrontmatter } from "@/domain/portfolio/types/portfolio.types";
import { ProjectContent } from "./ProjectContent";
import { ProjectDetail } from "./ProjectDetail";

interface ProjectProps {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function Project({ frontmatter, content }: ProjectProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden max-w-6xl mx-auto px-8 py-20">
      <div className="flex-shrink-0">
        <ProjectContent frontmatter={frontmatter} />
      </div>
      <div className="flex-shrink-0">
        <ProjectDetail title={frontmatter.title} content={content} />
      </div>
    </div>
  )
}