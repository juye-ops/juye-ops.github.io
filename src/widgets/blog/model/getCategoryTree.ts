import { getPostPathList } from "@/entities/blog";
import { DomainNode } from "@/entities/blog/model/category.types";
import { fetchRaw, parseMarkdown } from "@/shared";
import path from "path"; // 파일명 추출을 위해 필요합니다.

export async function getCategoryTree(): Promise<DomainNode[]> {
  const postPathList = await getPostPathList();
  const allPosts = await Promise.all(
    postPathList.map(async (postPath) => {
      const rawData = await fetchRaw(postPath);
      const parsedData = parseMarkdown(rawData, true) as any;

      // [수정 1] 파일 경로에서 slug(파일명)를 추출합니다.
      // 예: "posts/devops/docker/volume-guide.md" -> "volume-guide"
      const slug = path.basename(postPath, ".md");

      return {
        postPath,
        slug, // 추출한 slug 추가
        title: parsedData.title || "제목 없음",
        domain: parsedData.domain || "NoDomain",
        category: parsedData.category || "Uncategorized",
      };
    })
  );

  const tree = allPosts.reduce((acc: DomainNode[], curr) => {
    let domainNode = acc.find((d) => d.domain === curr.domain);
    if (!domainNode) {
      domainNode = { domain: curr.domain, categories: [] };
      acc.push(domainNode);
    }

    let categoryNode = domainNode.categories.find((c) => c.category === curr.category);
    if (!categoryNode) {
      categoryNode = { category: curr.category, posts: [] };
      domainNode.categories.push(categoryNode);
    }

    // [수정 2] 비어있던 slug 자리에 위에서 만든 curr.slug를 넣어줍니다.
    categoryNode.posts.push({
      title: curr.title,
      postPath: curr.postPath,
      slug: curr.slug
    });

    return acc;
  }, []);

  return tree.sort((a, b) => a.domain.localeCompare(b.domain));
}
