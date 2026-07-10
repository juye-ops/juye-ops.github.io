'use client';

import Link from 'next/link';
import { SearchablePost } from '../types/post.types';
import { getSlugsFromNames } from '@/shared/utils/getSlugsFromName';

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
      {posts.map((post) => {
        // 1. 도메인/카테고리 이름으로 slug 추출
        const slugs = getSlugsFromNames(post.frontmatter.domain, post.frontmatter.category);
        
        // 2. 추출 실패 시 대비 (폴백 경로)
        const domainSlug = slugs?.domainSlug || 'unknown';
        const categorySlug = slugs?.categorySlug || 'unknown';

        return (
          <Link 
            key={post.contentUrl} 
            // 3. 추출한 슬러그를 사용
            href={`/blog/${domainSlug}/${categorySlug}/${post.slug}`}
            className="block group"
          >
            <article
              className="flex items-center justify-between p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm shadow-slate-100/80 hover:border-indigo-200 transition-all"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-indigo-600">
                  {post.frontmatter.domain} / {post.frontmatter.category}
                </span>
                <h3 className="text-lg font-semibold text-slate-800">{post.frontmatter.title}</h3>
              </div>
              <span className="text-slate-300 group-hover:text-indigo-600 transition-colors">→</span>
            </article>
          </Link>
        );
      })}
    </div>
  );
}