// @/domain/blog/components/BlogContentPanel.tsx
import { SearchResultList } from './SearchResultList';
import { CategoryPanel } from './CategoryPanel';
import type { SearchablePost } from '../utils/getFlatPosts';
import type { DomainNode } from '../types/domain.types';

export function BlogContentPanel({ 
  text, 
  filteredPosts, 
  categoryTreeData 
}: { 
  text: string, 
  filteredPosts: SearchablePost[], 
  categoryTreeData: DomainNode[] 
}) {
  return (
    <div className="max-w-3xl mx-auto">
      {text.trim() ? (
        <SearchResultList posts={filteredPosts} />
      ) : (
        <CategoryPanel domains={categoryTreeData} selectedDomain={null} selectedCategory={null} />
      )}
    </div>
  );
}