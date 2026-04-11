'use client';

import Link from "next/link";
import { PostLeaf } from "../model/category.types";

interface PostListProps {
  posts: PostLeaf[];
  domain: string;
  category: string;
}

export const PostList = ({ posts, domain, category }: PostListProps) => {
  // 1. URL 안전을 위해 도메인과 카테고리를 미리 인코딩합니다.
  const encodedDomain = encodeURIComponent(domain);
  const encodedCategory = encodeURIComponent(category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => {
        // 2. 이미 getCategoryTree에서 slug를 만들어 보냈으므로 그대로 사용합니다.
        // 혹시 모르니 slug도 인코딩 처리해줍니다.
        const encodedSlug = encodeURIComponent(post.slug);
        const postHref = `/blog/${encodedDomain}/${encodedCategory}/${encodedSlug}`;

        return (
          <article
            key={post.postPath}
            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden hover:-translate-y-3 transition-all duration-500 border border-gray-100 hover:border-indigo-200"
          >
            {/* 3. 카드 전체를 클릭 가능하게 만드는 Link (가장 깔끔한 방식) */}
            <Link href={postHref} className="absolute inset-0 z-10">
              <span className="sr-only">{post.title} 읽기</span>
            </Link>

            <div className="p-8">
              {/* 태그 영역 */}
              <div className="flex flex-wrap gap-2 mb-6 relative z-20">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                  {domain}
                </span>
                <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
                  {category}
                </span>
              </div>

              {/* 제목 영역 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
              </div>

              {/* 하단 푸터 영역 */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-20">
                <time className="text-sm text-gray-500 font-mono">
                  {post.date || '2026.03.29'}
                </time>
                <span className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  읽기 <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};