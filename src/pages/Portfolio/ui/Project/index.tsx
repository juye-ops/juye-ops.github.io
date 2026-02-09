import type { PortfolioProjectProps } from "@/pages/Portfolio/model/ProjectContent/types"
import { PortfolioContent } from "@/pages/Portfolio/ui/ProjectContent"
import { PortfolioDetail } from "@/pages/Portfolio/ui/ProjectDetail"



export function Project({ project }: PortfolioProjectProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden px-20 pt-40">
      <div className="flex-shrink-0">
        <PortfolioContent project={project} />
      </div>
      <div className="flex-shrink-0">
        <PortfolioDetail project={project} />
      </div>
    </div>
  )
}