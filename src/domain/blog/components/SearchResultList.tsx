'use client';

import Link from 'next/link';
import type { SearchablePost } from '../utils/getFlatPosts';

interface SearchResultListProps {
  posts: SearchablePost[];
}

export function SearchResultList({ posts }: SearchResultListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 animate-in fade-in">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
      {posts.map((post) => (
        <article
          key={post.postPath}
          className="group relative bg-white rounded-3xl p-6 border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <Link
            href={`/blog/${post.domainSlug}/${post.categorySlug}/${encodeURIComponent(post.slug)}`}
            className="absolute inset-0 z-10"
          />
          <div className="flex gap-2 mb-3 relative z-20 text-xs">
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
              {post.domain}
            </span>
            <span className="px-2 py-0.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
              {post.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </article>
      ))}
    </div>
  );
}