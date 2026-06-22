import { parseMarkdown, parseSections } from "@/shared/utils/markdown";
import { AboutFrontmatter } from "./about.types";
import path from "path";
import { fetchRaw } from "@/shared/utils/common/fetchRaw";
import { processMarkdown } from "@/shared/utils/markdown/processMarkdown"; // 추가

export async function getAbout() {
  const filePath = path.join(process.cwd(), 'public/about.md');
  const rawData = await fetchRaw(filePath);

  const { frontmatter, content } = parseMarkdown(rawData);
  const sections = parseSections(content);
  // 모든 섹션을 병렬로 비동기 처리하여 HTML로 변환합니다.
  const processedSections = await Promise.all(
    sections.map((section) => processMarkdown(section))
  );

  return {
    frontmatter: frontmatter as AboutFrontmatter,
    sections: processedSections // 변환된 HTML 문자열 배열을 반환
  };
}