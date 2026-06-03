import { CoverflowItem } from "./coverflow-item.types";


export interface CoverflowSwiperProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}