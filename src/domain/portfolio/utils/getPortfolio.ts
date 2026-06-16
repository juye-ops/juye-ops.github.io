
import { glob } from "glob/raw";
import path from "path";
import { fetchRaw } from "../../../shared/utils/common/fetchRaw";
import { parseMarkdown } from "../../../shared/utils/markdown";

export async function getPortfolio() {
  const portfolioDir = path.join(process.cwd(), 'public/portfolio');
  const projectPathList = await glob(`${portfolioDir}/**/*.md`)

  const projects = await Promise.all(
    projectPathList.map(async (projectPath) => {
      const rawData = await fetchRaw(projectPath);
      return parseMarkdown(rawData);
    })
  )

  return projects
}