export interface PostFrontmatter {
  title: string;
  domain: string;
  category: string;
  date: string;
  thumbnail: string;
  description: string;
  featured: boolean;
}

// export interface PostData{
//   frontmatter: PostFrontmatter;
//   content: string;
//   slug: string;
// }


// 이렇게 하면 인터페이스를 따로 만들 필요 없이 JSON 구조에서 타입을 자동 추출합니다.
// 이렇게 타입을 선언해서 쓰세요.
export type RawPosts = Record<string, {
  frontmatter: {
    title: string;
    domain: string;
    category: string;
    date: string;
    thumbnail: string;
    description: string;
    featured: boolean;
  };
  searchContent: string;
  contentUrl: string;
}>;

export type PostKey = keyof RawPosts;

export interface SearchablePost {
  slug: string;
  frontmatter: PostFrontmatter;
  searchContent: string;
  contentUrl: string;
}

export interface PostLeaf {
  slug: string;
  date: string;
}


export interface PostData {
  frontmatter: PostFrontmatter;
  content: string; // 마크다운 본문
  readingTime: number; // 계산해서 넣어줄 필드
}