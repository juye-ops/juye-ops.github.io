import { CoverflowItem } from "@/entities/home";

export interface CoverflowProps {
  items: CoverflowItem[];
  onItemChange?: (item: CoverflowItem) => void;
}