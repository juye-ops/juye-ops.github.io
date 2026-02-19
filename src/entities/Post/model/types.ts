export interface Post {
  id: string;
  title: string;
  slug: string;
  domain: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  categories?: string[];
}
