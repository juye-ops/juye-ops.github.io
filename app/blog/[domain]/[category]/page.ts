import treePostsData from "@/shared/metadata/posts.tree.json";

export async function generateStaticParams() {
  return treePostsData.flatMap((domainNode) =>
    domainNode.categories.map((categoryNode) => ({
      domain: encodeURIComponent(domainNode.domainSlug),
      category: encodeURIComponent(categoryNode.categorySlug), 
    }))
  );
}
// 2. output: export 환경이므로 정의되지 않은 동적 경로는 무조건 404 처리합니다.
export const dynamicParams = false;

// 3. 실제 페이지를 그려줄 도메인 컴포넌트를 연결합니다.
export { PostListPage as default } from "@/domain/blog/pages/PostListPage";