// app/blog/[domain]/[category]/[slug]/page.tsx

import categoryTree from "@/shared/metadata/categoryTree.json";

export async function generateStaticParams() {
  return categoryTree.flatMap((domainNode) =>
    domainNode.categories.flatMap((categoryNode) =>
      categoryNode.posts.map((post) => ({
        domain: encodeURIComponent(domainNode.domainSlug),
        category: encodeURIComponent(categoryNode.categorySlug), 
        slug: encodeURIComponent(post.slug),
      }))
    )
  );
}

export const dynamicParams = false;
export { PostPage as default } from "@/domain/blog/pages/PostPage";