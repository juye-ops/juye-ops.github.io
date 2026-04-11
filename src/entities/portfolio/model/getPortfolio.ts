import { fetchRaw, parseMarkdown } from "@/shared";
import { glob } from "glob/raw";
import path from "path";

export async function getPortfolio() {
  const portfolioDir = path.join(process.cwd(), 'public/content/portfolio');
  const projectPathList = await glob(`${portfolioDir}/**/*.md`)

  const projects = await Promise.all(
    projectPathList.map(async (projectPath) => {
      const rawData = await fetchRaw(projectPath);
      return parseMarkdown(rawData);
    })
  )

  return projects
}