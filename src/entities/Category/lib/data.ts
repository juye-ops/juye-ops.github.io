// src/entities/category/lib/data.ts
import type { Domains } from '../model/types';
import { getDomainsFromFrontmatter } from './parseDomains';

export const getDomains = (): Domains => {
  return getDomainsFromFrontmatter();
};
