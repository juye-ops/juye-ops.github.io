import { parseMarkdown, parseSections } from "@/shared/model";
import { AboutFrontmatter } from "./about.types";
import { fetchRaw } from "@/shared";
import path from "path";

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