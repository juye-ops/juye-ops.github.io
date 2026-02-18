import type { CoverflowItem } from "./Coverflow/types";

export interface CoverflowWidgetProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
}
