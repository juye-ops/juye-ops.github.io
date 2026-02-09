import type { CoverflowItem } from "../CoverflowCard/types";

interface CoverflowSwiperProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}


export type {
  CoverflowSwiperProps
}