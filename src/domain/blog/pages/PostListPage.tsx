// @/domain/blog/pages/PostListPage.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogHeader } from "../components/BlogHeader"; // 공통 컴포넌트 임포트
import { PostList } from "../components/PostList";

import treePostsData from "@/shared/metadata/posts.tree.json";

interface PostListPageProps {
  params: Promise<{
    domain: string;
    category: string;
  }>;
}

export async function PostListPage({ params }: PostListPageProps) {
  const { domain: rawDomain, category: rawCategory } = await params;

  const decodedDomain = decodeURIComponent(rawDomain);
  const decodedCategory = decodeURIComponent(rawCategory);

  const currentDomain = treePostsData.find((d) => d.domainSlug === decodedDomain);
  const currentCategory = currentDomain?.categories.find(
    (c) => c.categorySlug === decodedCategory
  );

  if (!currentCategory || !currentDomain) {
    return notFound();
  }

  const posts = currentCategory.posts;
  const postCount = posts.length;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased tracking-normal selection:bg-indigo-50">

      {/* ─── 🚀 공통 컴포넌트로 규격 및 폰트 싱크 완료 ─── */}
      <BlogHeader
        domain={currentDomain.domain}
        domainSlug={currentDomain.domainSlug}
        category={currentCategory.category}
        categorySlug={currentCategory.categorySlug}
        title={currentCategory.category}
        meta={<span className="text-slate-400">{postCount} posts total</span>}
      />
      {/* ─── 📝 2. 은은한 회색 바탕 위의 화이트 카드 리스트 영역 ─── */}
      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
        <PostList
          posts={posts}
          domain={currentDomain.domain}
          domainSlug={currentDomain.domainSlug}
          category={currentCategory.category}
          categorySlug={currentCategory.categorySlug}
        />

        {/* 하단 푸터 백링크 */}
        <footer className="mt-32 pt-6 border-t border-slate-200/60 flex justify-end">
          <Link href="/blog" className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors">
            ← Back to list
          </Link>
        </footer>
      </main>

    </div>
  );
}