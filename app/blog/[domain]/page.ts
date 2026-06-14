import categoryTree from "@/shared/metadata/categoryTree.json";

export async function generateStaticParams() {
  return categoryTree.map((node) => ({
    domain: encodeURIComponent(node.domainSlug),
  }));
}

export const dynamicParams = false;

export { DomainPage as default } from "@/domain/blog/pages/DomainPage";