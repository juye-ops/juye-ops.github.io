import { CategoryLeaf } from "./category.types";

export interface DomainNode {
  domain: string;
  domainSlug: string;
  categories: CategoryLeaf[];
}
