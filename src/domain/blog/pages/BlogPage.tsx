// @/domain/blog/pages/BlogPage.tsx
'use client';

import categoryTreeData from "@/shared/metadata/categoryTree.json";
import { getFlatPosts } from "../utils/getFlatPosts";
import { useBlogSearch } from "../hooks/useBlogSearch";
import { BlogHeader } from "../components/BlogHeader";
import { BlogContentPanel } from "../components/BlogContentPanel";
import { SearchBar } from "../components/SearchBar";

export function BlogPage() {
  const allPosts = getFlatPosts();
  const { text, setText, filteredPosts } = useBlogSearch(allPosts);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans">
      <BlogHeader
        title="Categories"
        meta={<span className="text-slate-400">Technical infrastructure & engineering archive.</span>}
      />
      <div className="mt-12">
        <SearchBar value={text} onChange={setText} />
      </div>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <BlogContentPanel
          text={text}
          filteredPosts={filteredPosts}
          categoryTreeData={categoryTreeData}
        />
      </main>
    </div>
  );
}