// entities/portfolio/model/types.ts
interface PortfolioFrontmatter {
  index: number;
  title: string;
  organization: string;
  due: string;
  description: string;
  images: string[];
}

interface PortfolioProject extends PortfolioFrontmatter {
  slug: string;
  body: string; // markdown 원문
}

export interface PortfolioProjectProps {
  project: PortfolioProject
}