// app/blog/[domain]/page.tsx (Server Component)
import { getCategoryTree } from "@/widgets/blog";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function DomainPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain: rawDomain } = await params;
  const domainName = decodeURIComponent(rawDomain);

  const tree = await getCategoryTree();
  const currentDomain = tree.find((d) => d.domain === domainName);

  if (!currentDomain) return notFound();

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        {/* 헤더: 기존 BlogHeader와 결을 맞춘 디자인 */}
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
            {domainName}
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">
            EXPLORE <span className="text-indigo-600 px-1">{currentDomain.categories.length}</span> CATEGORIES
          </p>
        </header>

        {/* 리스트: 기존 PostList 카드 느낌을 리스트로 압축 */}
        <div className="space-y-4">
          {currentDomain.categories.map((cat) => (
            <Link 
              key={cat.category}
              href={`/blog/${rawDomain}/${encodeURIComponent(cat.category)}`}
              className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300"
            >
              {/* 왼쪽: 카테고리 이름 (강조) */}
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full group-hover:h-8 transition-all duration-300" />
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {cat.category}
                </h2>
              </div>

              {/* 오른쪽: 정보와 화살표 */}
              <div className="flex items-center gap-6">
                <span className="text-sm font-semibold text-gray-400 group-hover:text-indigo-400 transition-colors">
                  {cat.posts.length} Posts
                </span>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-indigo-50 text-gray-300 group-hover:text-indigo-600 transition-all">
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-0.5" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}