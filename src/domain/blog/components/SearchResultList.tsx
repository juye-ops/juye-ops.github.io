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
    <div className="flex flex-col gap-4 animate-in fade-in duration-300"> {/* grid -> flex-col */}
      {posts.map((post) => (
        <article
          key={post.postPath}
          // 🌟 PostList와 동일한 클래스 구조로 변경
          className="group flex items-center justify-between p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm shadow-slate-100/80 hover:border-indigo-200 transition-all"
        >
          {/* 일렬 배치의 상세 레이아웃을 여기에 작성 */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-indigo-600">{post.domain} / {post.category}</span>
            <h3 className="text-lg font-semibold text-slate-800">{post.title}</h3>
          </div>
          <span className="text-slate-300 group-hover:text-indigo-600 transition-colors">→</span>
        </article>
      ))}
    </div>
  );}