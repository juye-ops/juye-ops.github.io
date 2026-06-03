import { parseMarkdown, parseSections } from "@/shared/utils/markdown";
import { AboutFrontmatter } from "./about.types";
import path from "path";
import { fetchRaw } from "@/shared/utils/common/fetchRaw";

export async function getAbout() {
  const filePath = path.join(process.cwd(), 'public/content/about.md');
  const rawData = await fetchRaw(filePath);

  const { frontmatter, content } = parseMarkdown(rawData);
  const sections = parseSections(content);

  return {
    frontmatter: frontmatter as AboutFrontmatter,
    sections
  };
}