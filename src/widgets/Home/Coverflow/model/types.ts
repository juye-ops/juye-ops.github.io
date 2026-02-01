// src/widgets/home/coverflow/model/types.ts
export type PostId = string;

export interface CoverflowItem {
  id: PostId;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags?: string[];
  isFeatured?: boolean;
  createdAt: string;
}

export interface CoverflowWidgetProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
}
