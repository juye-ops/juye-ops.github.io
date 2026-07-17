import matter from "gray-matter";

// types/markdown.types.ts
export interface MarkdownResult {
  frontmatter: any;
  content: string;
}

// shared/utils/markdown.ts
export function parseMarkdown(text: string): MarkdownResult {
  const { data, content } = matter(text);
  return { 
    frontmatter: data, 
    content 
  };
}