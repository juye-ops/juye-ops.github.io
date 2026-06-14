import categoryTree from "@/shared/metadata/categoryTree.json";

export async function generateStaticParams() {
  return categoryTree.flatMap((domainNode) =>
    domainNode.categories.map((categoryNode) => ({
      domain: encodeURIComponent(domainNode.domainSlug),
      // 🌟 원래 이름 대신 'ci-cd'가 담긴 주소용 필드를 넘겨줍니다!
      category: encodeURIComponent(categoryNode.categorySlug), 
    }))
  );
}
// 2. output: export 환경이므로 정의되지 않은 동적 경로는 무조건 404 처리합니다.
export const dynamicParams = false;

// 3. 실제 페이지를 그려줄 도메인 컴포넌트를 연결합니다.
export { PostListPage as default } from "@/domain/blog/pages/PostListPage";