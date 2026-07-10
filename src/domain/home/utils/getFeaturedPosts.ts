// @/shared/utils/post.ts
import flatPostsData from "@/shared/metadata/posts.flat.json";
import { getSlugsFromNames } from "@/shared/utils/getSlugsFromName";

export const getFeaturedPosts = () => {
  return Object.entries(flatPostsData)
    .filter(([_, post]) => post.frontmatter.featured === true)
    .map(([slug, post]) => {
      // 1. 이름 기반으로 슬러그 추출
      const slugs = getSlugsFromNames(post.frontmatter.domain, post.frontmatter.category);
      
      return {
        ...post.frontmatter,
        slug,
        // 2. 추출한 결과 사용 (실패 시 unknown 폴백)
        domainSlug: slugs?.domainSlug || "unknown",
        categorySlug: slugs?.categorySlug || "unknown",
        description: post.frontmatter.description || "",
        thumbnail: post.frontmatter.thumbnail || "",
        date: post.frontmatter.date,
      };
    });
};