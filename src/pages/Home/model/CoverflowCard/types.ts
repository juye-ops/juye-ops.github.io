import type { CoverflowItem } from "../Coverflow/types";

interface CoverflowCardProps {
  item: CoverflowItem;
  onClick: () => void;
}

export type {
  CoverflowCardProps
}