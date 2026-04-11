import { ProjectFrontmatter } from "@/entities/portfolio/model/portfolio.types";

interface ProjectInfoProps {
  frontmatter: ProjectFrontmatter
}

export function ProjectInfo({ frontmatter }: ProjectInfoProps) {
  return (
    < div className="space-y-4" >
      <div className="flex justify-items justify-between">
        <span className=" bg-neutral-100 dark:bg-neutral-800 text-xs font-medium rounded-full text-neutral-600">
          {frontmatter.organization}
        </span>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span>📅 {frontmatter.due}</span>
          <span>•</span>
          <span>{frontmatter.images?.length || 0} images</span>
        </div>
      </div>
      <h1 className="text-3xl xl:text-4xl font-black bg-gradient-to-r from-black via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
        {frontmatter.title}
      </h1>
      <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        {frontmatter.description}
      </p>
    </div >
  )
}