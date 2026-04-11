export interface PostFrontmatter {
  title: string;
  domain: string;
  category: string;
}

export interface PostMarkdownData {
  frontmatter: {
    title: string;
    domain: string;
    category: string;
  }
  content: string
}