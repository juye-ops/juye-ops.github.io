export interface PostLeaf {
  title: string;
  slug: string;      // URL에 사용될 식별자 (파일명에서 추출)
  postPath: string;  // 실제 파일 읽기용 경로
  date?: string;     // 있으면 좋음
}

export interface CategoryNode {
  category: string;
  posts: PostLeaf[];
}

export interface DomainNode {
  domain: string;
  categories: CategoryNode[];
}

// 최종적으로 반환할 트리 타입
export type CategoryTree = DomainNode[];