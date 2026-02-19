export interface Category {  // 하위 Category
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface Domain {  // 상위 Domain
  id: string;
  name: string;
  slug: string;
  isOpen: boolean;
  categories: Category[];  // 하위 Category들
}

export type Domains = Domain[];
