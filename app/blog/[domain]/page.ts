import treePostsData from "@/shared/metadata/posts.tree.json";

export async function generateStaticParams() {

  return treePostsData.map((node: any) => ({
    domain: encodeURIComponent(node.domainSlug),
  }));
}

export const dynamicParams = false; // 정의되지 않은 경로로 접속 시 404 반환

export { DomainPage as default } from "@/domain/blog/pages/DomainPage";