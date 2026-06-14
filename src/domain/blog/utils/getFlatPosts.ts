// @/domain/blog/utils/getFlatPosts.ts
import categoryTree from "@/shared/metadata/categoryTree.json";

export interface SearchablePost {
  title: string;
  slug: string;
  postPath: string;
  domain: string;
  domainSlug: string;
  category: string;
  categorySlug: string;
  content: string;
}

export function getFlatPosts(): SearchablePost[] {
  return categoryTree.flatMap((domainNode) =>
    domainNode.categories.flatMap((categoryNode) =>
      categoryNode.posts.map((post) => ({
        title: post.title,
        slug: post.slug,
        postPath: post.postPath,
        domain: domainNode.domain,
        domainSlug: domainNode.domainSlug,
        category: categoryNode.category,
        categorySlug: categoryNode.categorySlug,
        content: post.content
      }))
    )
  );
}