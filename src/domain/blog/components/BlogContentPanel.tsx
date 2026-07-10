// @/domain/blog/components/BlogContentPanel.tsx
import { SearchResultList } from './SearchResultList';
import { CategoryPanel } from './CategoryPanel';

import treePostsData from "@/shared/metadata/posts.tree.json";
import { SearchablePost } from '../types/post.types';

export function BlogContentPanel({ 
  text, 
  filteredPosts, 
}: { 
  text: string, 
  filteredPosts: SearchablePost[], 
}) {
  return (
    <div className="max-w-3xl mx-auto">
      {text.trim() ? (
        <SearchResultList posts={filteredPosts} />
      ) : (
        <CategoryPanel domains={treePostsData} selectedDomain={null} selectedCategory={null} />
      )}
    </div>
  );
}