// src/entities/category/lib/parseCategories.ts

import { parseAllPosts } from "@/entities/Post/lib/parseFrontmatter";
import type { Category, Domain, Domains } from "../../model/types";



export const getDomainsFromFrontmatter = (): Domains => {
  const posts = parseAllPosts();
  const domainMap: Record<string, Domain> = {};

// Domain (상위) > Category (하위)
posts.forEach((post) => {
  const domainId = post.domain.toLowerCase();    // 상위 Domain
  const categoryId = post.category.toLowerCase(); // 하위 Category

  if (!domainMap[domainId]) {
    domainMap[domainId] = {
      id: domainId,
      name: post.domain,
      slug: domainId,
      isOpen: false,
      categories: [],
    };
  }

  const existingCategory = domainMap[domainId].categories.find(
    (c: Category) => c.id === categoryId
  );
  if (!existingCategory) {
    domainMap[domainId].categories.push({
      id: categoryId,
      name: post.category,
      slug: categoryId,
      postCount: 1,
    });
  } else {
    existingCategory.postCount!++;
  }
});

return Object.values(domainMap) as Domains;
};
