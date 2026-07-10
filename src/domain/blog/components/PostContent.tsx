'use client';

import { notFound } from "next/navigation";
import { usePost } from "../hooks/usePosts";
import { BlogHeader } from "./BlogHeader";
import Link from "next/link";
import Loading from "@/shared/components/Loading";

interface PostContentProps {
  contentUrl: string;
  domainSlug: string;
  categorySlug: string;
}

export function PostContent({ contentUrl, domainSlug, categorySlug }: PostContentProps) {
  const { data, loading } = usePost(contentUrl);

  if (loading) return <Loading/>;
  if (!data) return <div>Post not found</div>;

  const frontmatter = data.frontmatter
  const content = data.content
  const readingTime = data.readingTime

  try {
    const displayDate = frontmatter.date;

    return (
      <>
        {/* ─── 🚀 공통 컴포넌트로 규격 및 폰트 싱크 완료 ─── */}
        <BlogHeader
          domain={frontmatter.domain}
          domainSlug={domainSlug}
          category={frontmatter.category}
          categorySlug={categorySlug}
          title={frontmatter.title}
          meta={
            <>
              <time dateTime={displayDate}>{new Date(displayDate).toISOString().split('T')[0]}</time>
              <span className="text-slate-200">•</span>
              <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-md font-medium text-[11px]">
                {frontmatter.domain}
              </span>
              <span className="bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-0.5 rounded-md font-medium text-[11px]">
                {frontmatter.category}
              </span>
              <span className="text-slate-200">•</span>
              <span>{readingTime} min read</span>
            </>
          }
        />

        {/* ─── 📝 본문 아티클 카드 ─── */}
        <main className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm shadow-slate-100/80">
            <article
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <footer className="mt-16 pt-8 border-t border-slate-100 flex justify-end">
              <Link
                href={`/blog/${domainSlug}/${categorySlug}`}
                className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors"
              >
                ← Back to list
              </Link>
            </footer>
          </div>
        </main >
      </>
    )
  } catch (error) {
    return notFound();
  }
}