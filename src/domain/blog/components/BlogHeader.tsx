// @/domain/blog/components/BlogHeader.tsx
import Link from "next/link";

interface BlogHeaderProps {
  domain?: string;
  domainSlug?: string;
  category?: string;
  categorySlug?: string;
  title: string;
  meta?: React.ReactNode;
  searchComponent?: React.ReactNode; // 여기에 직접 SearchBar 컴포넌트를 넘겨주세요
}

export function BlogHeader({ domain, domainSlug, category, categorySlug, title, meta }: BlogHeaderProps) {
  return (
    <header className="w-full bg-white border-b border-slate-100 pt-16 pb-8 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 1. 상단 영역: 브레드크럼 & 타이틀 */}
        <div>
          <nav className="flex items-center gap-2 text-[13px] text-slate-400 mb-5 font-sans font-medium select-none">
            <Link href="/blog" className={!domain ? "text-indigo-600 font-semibold" : "hover:text-slate-900 transition-colors"}>
              Blog
            </Link>
            
            {domain && (
              <>
                <span className="text-slate-300">/</span>
                <Link href={`/blog/${domainSlug}`} className={!category ? "text-indigo-600 font-semibold" : "hover:text-slate-900 transition-colors"}>
                  {domain}
                </Link>
              </>
            )}
            
            {category && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-indigo-600 font-semibold">{category}</span>
              </>
            )}
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-[40px] font-semibold tracking-tight text-slate-900 mb-4 leading-snug">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 text-[13px] font-sans text-slate-400 select-none">
            {meta}
          </div>
        </div>
      </div>
    </header>
  );
}