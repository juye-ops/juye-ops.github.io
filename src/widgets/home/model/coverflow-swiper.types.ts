import { CoverflowItem } from "@/entities/home";

export interface CoverflowSwiperProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}