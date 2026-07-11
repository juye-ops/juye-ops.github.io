// @/domain/blog/components/PostList.tsx
'use client';

import Link from "next/link";
import { PostLeaf } from "../types/post.types";

import flatPostsData from "@/shared/metadata/posts.flat.json";

interface PostListProps {
  posts: PostLeaf[];
  domain: string;
  domainSlug: string;
  category: string;
  categorySlug: string;
}

export const PostList = ({ posts, domain, domainSlug, category, categorySlug }: PostListProps) => {
  return (
    // 🌟 3열 그리드를 과감히 폐기하고, 세로로 단단하게 쌓이는 와이드 카드 레이아웃
    <div className="flex flex-col gap-6 sm:gap-8">
      {posts.map((post) => {
        const encodedSlug = encodeURIComponent(post.slug);

        const postData = flatPostsData[post.slug as keyof typeof flatPostsData];
        const postHref = `/blog/${domainSlug}/${categorySlug}/${encodedSlug}`;

        return (
          <article
            key={post.slug}
            // 🌟 과한 그림자와 라운딩을 다듬어, 정갈하고 넓은 가로형 캡슐 카드로 재탄생
            className="group relative bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <Link href={postHref} className="block p-6 sm:p-8">

              {/* 1. 상단 메타 정보 영역 (날짜 + 카테고리 배지) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4 select-none">
                <time dateTime={postData.frontmatter.date} className="text-slate-400">
                  {new Date(postData.frontmatter.date).toISOString().split('T')[0]}
                </time>
                <span className="text-slate-200">•</span>
                <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-md font-medium text-[11px]">
                  {domain}
                </span>
                <span className="bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-md font-medium text-[11px]">
                  {category}
                </span>
              </div>

              {/* 2. 제목 영역 (가로폭을 100% 사용하여 절대 찌그러지지 않음) */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug mb-3">
                {postData.frontmatter.title}
              </h3>

              {/* 3. 본문 요약 (Prebuild 텍스트 매칭) */}
              {postData.contentUrl && (
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-normal">
                  {postData.frontmatter.description}
                </p>
              )}

              {/* 4. 우측 하단 미세한 화살표 인디케이터 */}
              <div className="mt-4 flex justify-end">
                <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                  Read article
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>

            </Link>
          </article>
        );
      })}
    </div>
  );
};