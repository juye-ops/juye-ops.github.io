// @/domain/blog/utils/getFlatPosts.ts
import categoryTree from "@/shared/metadata/categoryTree.json";

export interface SearchablePost {
  title: string;
  date: string;
  domain: string;
  domainSlug: string;
  category: string;
  categorySlug: string;
  description: string;
  thumbnail: string;
  featured: boolean;
  postPath: string;
  slug: string;
  content: string;
}

export function getFlatPosts(): SearchablePost[] {
  return categoryTree.flatMap((domainNode) =>
    domainNode.categories.flatMap((categoryNode) =>
      categoryNode.posts.map((post) => ({
        title: post.title,
        date: post.date,
        domain: domainNode.domain,
        domainSlug: domainNode.domainSlug,
        category: categoryNode.category,
        categorySlug: categoryNode.categorySlug,
        description: post.description,
        thumbnail: post.thumbnail,
        featured: post.featured,
        postPath: post.postPath,
        slug: post.slug,
        content: post.content
      }))
    )
  );
}