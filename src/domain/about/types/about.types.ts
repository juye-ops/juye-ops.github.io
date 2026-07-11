export interface AboutFrontmatter {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  blog: string;
}

export interface AboutJSONData {
  frontmatter: AboutFrontmatter;
  contentUrl: string;
}

export interface AboutSectionData {
  frontmatter: AboutFrontmatter;
  sections: string[];
}