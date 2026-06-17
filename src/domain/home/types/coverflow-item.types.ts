export interface CoverflowItem {
  title: string;
  description: string;
  thumbnail: string;
  tags?: string[];
  featured?: boolean;
  date: string;
  domainSlug: string;
  categorySlug: string;
  slug: string;
}