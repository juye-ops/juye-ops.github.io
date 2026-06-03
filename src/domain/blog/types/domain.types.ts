import { Category } from "./category.types";

export interface Domain {  // 상위 Domain
  id: string;
  name: string;
  slug: string;
  isOpen: boolean;
  categories: Category[];  // 하위 Category들
}

export type Domains = Domain[];
