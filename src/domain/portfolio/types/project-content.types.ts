// entities/portfolio/model/types.ts
interface ImageInfo {
  src: string
  caption: string
}

export interface PortfolioFrontmatter {
  index: number;
  title: string;
  organization: string;
  due: string;
  description: string;
  images: ImageInfo[];
}
