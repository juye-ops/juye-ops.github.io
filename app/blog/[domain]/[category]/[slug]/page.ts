import { getCategoryTree } from "@/widgets/blog";

export async function generateStaticParams() {
  const tree = await getCategoryTree();
  
  // 3중 중첩 구조를 하나의 배열로 쫙 펼치기
  return tree.flatMap((domainNode) =>
    domainNode.categories.flatMap((categoryNode) =>
      categoryNode.posts.map((post) => ({
        domain: encodeURIComponent(domainNode.domain),
        category: encodeURIComponent(categoryNode.category),
        slug: encodeURIComponent(post.slug),
      }))
    )
  );
}

export const dynamicParams = false;

export { PostPage as default } from "@/pages/blog/ui/PostPage";