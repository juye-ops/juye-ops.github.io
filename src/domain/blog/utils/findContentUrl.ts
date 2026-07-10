// @/shared/utils/blog.ts
import flatPostsData from "@/shared/metadata/posts.flat.json";

export function getContentUrl(slug: string): string | null {
  // slug가 flatPostsData의 키인지 확인 후 바로 반환
  const post = flatPostsData[slug as keyof typeof flatPostsData];
  
  return post.contentUrl;
}