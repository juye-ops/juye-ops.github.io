// @/domain/blog/pages/DomainPage.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import categoryTree from "@/shared/metadata/categoryTree.json";
import { BlogHeader } from "../components/BlogHeader"; // 공통 헤더 임포트

export async function DomainPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain: rawDomain } = await params;
  const domainName = decodeURIComponent(rawDomain);
  const currentDomain = categoryTree.find((d) => d.domainSlug === domainName);

  if (!currentDomain) return notFound();

  return (
    // 전체 베이스 슬레이트 회색 톤 동기화
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased tracking-normal selection:bg-indigo-50 font-sans">

      {/* ─── 🚀 공통 컴포넌트로 규격 및 폰트 싱크 완료 ─── */}
      <BlogHeader
        domain={currentDomain.domain}
        domainSlug={currentDomain.domainSlug}
        title={currentDomain.domain}
        meta={<span className="text-slate-400">{currentDomain.categories.length} categories available</span>}
      />
      {/* ─── 📝 화이트 카드 기반의 카테고리 리스트 ─── */}
      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-20">

        <div className="flex flex-col gap-4">
          {currentDomain.categories.map((cat) => {
            const encodedCategory = encodeURIComponent(cat.categorySlug);
            const categoryHref = `/blog/${rawDomain}/${encodedCategory}`;

            return (
              <Link
                key={cat.category}
                href={categoryHref}
                className="group flex items-center justify-between p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm shadow-slate-100/80 hover:border-indigo-200 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-500 transition-colors duration-300" />
                  <h2 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {cat.category}
                  </h2>
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400">
                  <span className="font-medium">{cat.posts.length} posts</span>
                  <span className="text-slate-300 group-hover:text-indigo-600 transition-colors font-bold">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 하단 푸터 백링크 */}
        <footer className="mt-32 pt-6 border-t border-slate-100 flex justify-end">
          <Link href="/blog" className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors">
            ← Back to main
          </Link>
        </footer>
      </main>
    </div>
  );
}