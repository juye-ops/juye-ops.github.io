import { CoverflowItem } from "./coverflow-item.types";


export interface CoverflowProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
}