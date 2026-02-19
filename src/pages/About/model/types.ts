export interface Frontmatter {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  blog: string;
}

export interface Section {
  title: string;
  content: string;
}

export interface AboutState {
  frontmatter: Frontmatter | null;
  sections: Section[];
  isLoading: boolean;
  error: string | null;
}
