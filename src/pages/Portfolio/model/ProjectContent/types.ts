// entities/portfolio/model/types.ts
export interface PortfolioFrontmatter {
  index: number;
  title: string;
  organization: string;
  due: string;
  description: string;
  images: string[];
}

export interface PortfolioProject extends PortfolioFrontmatter {
  slug: string;
  body: string; // markdown 원문
}

export interface PortfolioProjectProps {
  project: PortfolioProject
}