import { CategoryPanel } from "@/entities/blog";
import { SearchBar } from "@/features/blog";
import { getCategoryTree } from "../model/getCategoryTree";
import { CategoryTree } from "@/entities/blog/model/category.types";

export async function Category() {
  const categoryTreeData = await getCategoryTree() as CategoryTree;
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            Categories
          </h1>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <SearchBar />
        </div>

        <div className="max-w-3xl mx-auto">
          <CategoryPanel domains={categoryTreeData} selectedDomain={null} selectedCategory={null} />
        </div>
      </div>
    </main>
  );
};