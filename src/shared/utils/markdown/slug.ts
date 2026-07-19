import path from "path";
import treePostsData from "@/shared/metadata/posts.tree.json";
import flatPostsData from "@/shared/metadata/posts.flat.json"

export function getSlugFromContentURL(contentUrl: string) {
  return path.basename(contentUrl, '.md');
}

// 도메인(이름)과 카테고리(이름)를 알 때 slug들을 찾아내는 함수
export function getSlugsFromNames(domainName: string, categoryName: string) {
  // 1. 도메인 이름이 일치하는 도메인 노드 찾기
  const domainNode = treePostsData.find(d => d.domain === domainName);

  if (!domainNode) return null;

  // 2. 카테고리 이름이 일치하는 카테고리 노드 찾기
  const categoryNode = domainNode.categories.find(c => c.category === categoryName);

  if (!categoryNode) return null;

  // 3. 찾은 슬러그들 반환
  return {
    domainSlug: domainNode.domainSlug,
    categorySlug: categoryNode.categorySlug
  };
}

export function getBlogUrlBySlug(slug: string) {
  const postData = (flatPostsData as Record<string, any>)[slug];

  // 1. 🚨 예외 처리를 최상단으로 올립니다! postData가 없으면 바로 탈출합니다.
  if (!postData) return '/blog';

  // 2. 이제 postData가 확실히 존재하므로 안전하게 에러 없이 데이터를 읽어옵니다.
  const domainSlug = String(postData.frontmatter?.domain ?? "").toLowerCase();
  const categorySlug = String(postData.frontmatter?.category ?? "").toLowerCase();

  return `/blog/${domainSlug}/${categorySlug}/${slug}`;
}