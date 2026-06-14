import { DomainNode } from "./domain.types";


export interface PostLeaf {
  title: string;
  slug: string;      // URL에 사용될 식별자 (파일명에서 추출)
  postPath: string;  // 실제 파일 읽기용 경로
  content: string;
  date?: string;     // 있으면 좋음
}

export interface CategoryLeaf {
  category: string;
  categorySlug: string; // 🌟 새로 추가된 주소용 필드
  posts: any[];
}

export interface CategoryPanelProps {
  domains: DomainNode[];
  selectedDomain: string | null;
  selectedCategory: string | null; // 🌟 부모로부터 'ci-cd' 같은 주소창 slug가 넘어옵니다.
}
