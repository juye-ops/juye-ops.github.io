// @/domain/blog/pages/PostPage.tsx

import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import categoryTree from "@/shared/metadata/categoryTree.json";
import matter from "gray-matter";
import { BlogHeader } from "../components/BlogHeader";
import "./markdown.css"; import 'katex/dist/katex.min.css';

import { processMarkdown } from "../utils/processMarkdown"; // 위에서 만든 함수


interface PostPageProps {
  params: Promise<{
    domain: string;
    category: string;
    slug: string;
  }>;
}

export async function PostPage({ params }: PostPageProps) {
  const { domain: rawDomain, category: rawCategory, slug: rawSlug } = await params;

  const decodedDomain = decodeURIComponent(rawDomain);
  const decodedCategorySlug = decodeURIComponent(rawCategory);
  const decodedSlug = decodeURIComponent(rawSlug);

  const currentDomain = categoryTree.find((d) => d.domainSlug === decodedDomain);
  const currentCategory = currentDomain?.categories.find(
    (c) => c.categorySlug === decodedCategorySlug
  );
  const currentPost = currentCategory?.posts.find((p) => p.slug === decodedSlug);

  if (!currentPost || !currentCategory || !currentDomain) {
    return notFound();
  }

  try {
    const fullPath = path.join(process.cwd(), currentPost.postPath);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { content } = matter(fileContent);

    const displayDate = currentPost.date;
    const readingTime = Math.ceil(content.replace(/\s/g, "").length / 500);

    const processedHtml = await processMarkdown(content);

    return (
      <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased tracking-normal selection:bg-indigo-50 font-sans">

        {/* ─── 🚀 공통 컴포넌트로 규격 및 폰트 싱크 완료 ─── */}
        <BlogHeader
          domain={currentDomain.domain}
          domainSlug={currentDomain.domainSlug}
          category={currentCategory.category}
          categorySlug={currentCategory.categorySlug}
          title={currentPost.title}
          meta={
            <>
              <time dateTime={displayDate}>{displayDate}</time>
              <span className="text-slate-200">•</span>
              <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-md font-medium text-[11px]">
                {currentDomain.domain}
              </span>
              <span className="bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-0.5 rounded-md font-medium text-[11px]">
                {currentCategory.category}
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
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />
            <footer className="mt-16 pt-8 border-t border-slate-100 flex justify-end">
              <Link
                href={`/blog/${currentDomain.domainSlug}/${currentCategory.categorySlug}`}
                className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors"
              >
                ← Back to list
              </Link>
            </footer>
          </div>
        </main >
      </div >
    );
  } catch (error) {
    return notFound();
  }
}