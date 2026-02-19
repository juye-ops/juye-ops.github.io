type PostId = string;

interface CoverflowItem {
  id: PostId;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags?: string[];
  isFeatured?: boolean;
  createdAt: string;
}

interface CoverflowProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
}

export type {
  CoverflowItem,
  CoverflowProps
}