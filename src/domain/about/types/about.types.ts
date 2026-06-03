export interface AboutFrontmatter {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  blog: string;
}

export interface AboutState {
  frontmatter: AboutFrontmatter | null;
  sections: string[];
}
