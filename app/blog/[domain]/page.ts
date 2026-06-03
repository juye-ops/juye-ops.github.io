import { getCategoryTree } from "@/domain/blog/utils/getCategoryTree";

export async function generateStaticParams() {
  const tree = await getCategoryTree();
  
  const domains = Array.from(new Set(tree.map((post) => post.domain)));

  return domains.map((domain) => ({
    domain: encodeURIComponent(domain),
  }));
}

export const dynamicParams = false;

export { DomainPage as default } from "@/domain/blog/pages/DomainPage";