import { useSearchParams } from "react-router";
import { useBlogState } from "../lib/useBlogState";
import { BlogSearchBar } from "./SearchBar";
import { CategoryPanel } from "@/widgets/CategoryPanel/ui";

export const Blog = () => {
  const [searchParams] = useSearchParams();
  const state = useBlogState({
    initialDomain: searchParams.get('domain') || null,
    initialCategory: searchParams.get('category') || null,
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            Categories
          </h1>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <BlogSearchBar {...state.searchProps} />
        </div>

        {/* 중앙 대형 카테고리만 */}
        <div className="max-w-3xl mx-auto">
          <CategoryPanel
            domains={state.domains}
            selectedDomain={state.selectedDomain}      // ✅ 변경
            selectedCategory={state.selectedCategory}  // ✅ 변경
            onSelectCategory={state.handleSelectCategory}
          />
        </div>
      </div>
    </main>
  );
};
