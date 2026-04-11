import { CoverflowItem } from "./coverflow-item.types";

export interface CoverflowCardProps {
  item: CoverflowItem;
  onClick: () => void;
}