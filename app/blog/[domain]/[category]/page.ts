import { getCategoryTree } from "@/domain/blog/utils/getCategoryTree";


export async function generateStaticParams() {
  const tree = await getCategoryTree();
  
  return tree.flatMap((domainNode) =>
    domainNode.categories.map((categoryNode) => ({
      domain: encodeURIComponent(domainNode.domain),
      category: encodeURIComponent(categoryNode.category),
    }))
  );
}

export const dynamicParams = false;

export { PostListPage as default } from "@/domain/blog/pages/PostListPage";