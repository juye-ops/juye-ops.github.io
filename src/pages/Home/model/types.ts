import type { CoverflowItem } from "./CoverflowCard/types";

export interface CoverflowWidgetProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
}
