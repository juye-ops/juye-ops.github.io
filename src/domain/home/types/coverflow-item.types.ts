export interface CoverflowItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags?: string[];
  isFeatured?: boolean;
  createdAt: string;
}