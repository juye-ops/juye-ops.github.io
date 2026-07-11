import treePostsData from "@/shared/metadata/posts.tree.json";

export async function generateStaticParams() {
  return treePostsData.flatMap((domainNode) =>
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