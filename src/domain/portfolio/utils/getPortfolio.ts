import { glob } from "glob/raw";
import path from "path";
import { fetchRaw } from "../../../shared/utils/common/fetchRaw";
import { parseMarkdown } from "../../../shared/utils/markdown";
import { processMarkdown } from "@/shared/utils/markdown/processMarkdown"; // processMarkdown 추가

export async function getPortfolio() {
  const portfolioDir = path.join(process.cwd(), 'public/portfolio');
  const projectPathList = await glob(`${portfolioDir}/**/*.md`);

  const projects = await Promise.all(
    projectPathList.map(async (projectPath) => {
      const rawData = await fetchRaw(projectPath);
      const { frontmatter, content } = parseMarkdown(rawData);

      // getAbout 처럼 비동기 마크다운 처리를 거쳐 결과를 반환합니다.
      const processedContent = await processMarkdown(content);

      return {
        frontmatter,
        content: processedContent // 변환된 데이터 반영
      };
    })
  );

  // frontmatter의 index 기반 정렬 (오름차순)

  return projects.sort((a, b) => a.frontmatter.index - b.frontmatter.index);
}