import matter from "gray-matter";

// types/markdown.types.ts
export interface MarkdownResult<T> {
  frontmatter: T;
  content: string;
}

// shared/utils/markdown.ts
export function parseMarkdown<T>(text: string): MarkdownResult<T> {
  const { data, content } = matter(text);
  return { 
    frontmatter: data as T, 
    content 
  };
}