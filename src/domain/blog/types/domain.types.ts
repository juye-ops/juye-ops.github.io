export interface DomainNode {
  domain: string;
  domainSlug: string;
  categories: CategoryLeaf[];
}

export interface CategoryLeaf {
  category: string;
  categorySlug: string; // 🌟 새로 추가된 주소용 필드
  posts: { slug: string, date: string }[];
}

export interface CategoryPanelProps {
  domains: DomainNode[];
  selectedDomain: string | null;
  selectedCategory: string | null; // 🌟 부모로부터 'ci-cd' 같은 주소창 slug가 넘어옵니다.
}