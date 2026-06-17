'use client';

import Link from 'next/link';
import type { SearchablePost } from '../utils/getFlatPosts';

interface SearchResultListProps {
  posts: SearchablePost[];
}

export function SearchResultList({ posts }: SearchResultListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400 animate-in fade-in">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {posts.map((post) => (
        // 🌟 Link를 article의 부모로 배치
        <Link 
          key={post.postPath} 
          href={`/blog/${post.domainSlug}/${post.categorySlug}/${post.slug}`}
          className="block group" // 블록 요소로 만들어 클릭 영역 확보
        >
          <article
            className="flex items-center justify-between p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm shadow-slate-100/80 hover:border-indigo-200 transition-all"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-indigo-600">{post.domain} / {post.category}</span>
              <h3 className="text-lg font-semibold text-slate-800">{post.title}</h3>
            </div>
            <span className="text-slate-300 group-hover:text-indigo-600 transition-colors">→</span>
          </article>
        </Link>
      ))}
    </div>
  );
}