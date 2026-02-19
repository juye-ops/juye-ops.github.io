// src/widgets/category-panel/ui/CategoryPanel.tsx (완전 버전)
import type { Domains } from '@/entities/Category/model/types';
import { useState, useEffect, useCallback } from 'react';

interface CategoryPanelProps {
  domains: Domains;
  selectedDomain: string | null;    // ✅ 변경
  selectedCategory: string | null;  // ✅ 변경
  onSelectCategory: (domainId: string, categoryId?: string) => void;  // ✅ 변경
}


export const CategoryPanel = ({
  domains,
  selectedDomain,
  selectedCategory,
  onSelectCategory
}: CategoryPanelProps) => {
  const [localDomains, setLocalDomains] = useState(domains);

  useEffect(() => {
    setLocalDomains(domains);
  }, [domains]);

  const toggleDomain = useCallback((domain: string) => {
    const updated = localDomains.map((cat: any) =>
      cat.id === domain ? { ...cat, isOpen: !cat.isOpen } : cat
    );
    setLocalDomains(updated);
  }, [localDomains]);

  const selectDomain = useCallback((domain: string, category: string) => {
    onSelectCategory(domain, category);
  }, [onSelectCategory]);

  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 border border-white/50">
      <nav className="space-y-4">
        {localDomains.map((domain) => (
          <div key={domain.id}>
            <button
              onClick={() => toggleDomain(domain.id)}
              className={`w-full flex justify-between items-center py-6 px-6 text-left rounded-2xl transition-all duration-300 text-lg font-medium ${selectedDomain === domain.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-xl border-2 border-indigo-200'
                  : 'text-gray-900 hover:bg-gray-100 hover:shadow-lg'
                }`}
            >
              <span>{domain.name}</span>
              <span className={`transform transition-transform ${domain.isOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {domain.isOpen && (
              <div className="ml-8 mt-4 space-y-3 border-l-4 border-indigo-300 pl-6 bg-indigo-50/50 p-4">
                {domain.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => selectDomain(domain.id, category.id)}
                    className={`w-full text-left py-3 px-5 text-base rounded-xl transition-all duration-200 ${selectedCategory === category.id
                        ? 'bg-indigo-200 text-indigo-800 font-semibold shadow-md'
                        : 'text-gray-700 hover:bg-white hover:text-indigo-700 hover:shadow-md'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
