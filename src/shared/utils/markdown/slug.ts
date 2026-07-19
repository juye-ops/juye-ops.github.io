import path from "path";
import treePostsData from "@/shared/metadata/posts.tree.json";

export function getSlugFromContentURL(contentUrl: string){
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