import { getCategoryTree } from "@/widgets/blog";

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

export { PostListPage as default } from "@/pages/blog/ui/PostListPage";