'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Path 이동을 위해 추가
import { DomainNode } from '../model/category.types';
import Link from 'next/link';

interface CategoryPanelProps {
  domains: DomainNode[];
  selectedDomain: string | null;
  selectedCategory: string | null;
}

export function CategoryPanel({
  domains,
  selectedDomain,
  selectedCategory
}: CategoryPanelProps) {
  const router = useRouter();

  // 1. 도메인별 열림/닫힘 상태 관리
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  // 2. [추가] 선택된 도메인이 URL에 있다면 해당 아코디언을 자동으로 엽니다.
  useEffect(() => {
    if (selectedDomain) {
      setOpenStates((prev) => ({
        ...prev,
        [selectedDomain]: true,
      }));
    }
  }, [selectedDomain]);

  // 3. 토글 함수
  const toggleDomain = useCallback((domainName: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [domainName]: !prev[domainName]
    }));
  }, []);

  // 4. [추가] Path Parameter로 이동하는 핸들러
  const handleCategoryClick = useCallback((domain: string, category: string) => {
    // 한글이나 공백이 있을 수 있으므로 인코딩하여 경로 생성
    const path = `/blog/${encodeURIComponent(domain)}/${encodeURIComponent(category)}`;
    router.push(path, { scroll: false });
  }, [router]);

  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/50">
      <nav className="space-y-4">
        {domains.map((domainNode) => {
          const isOpen = !!openStates[domainNode.domain];
          const isSelected = selectedDomain === domainNode.domain;

          return (
            <div key={domainNode.domain}>
              {/* 도메인 버튼 */}
              <button
                onClick={() => toggleDomain(domainNode.domain)}
                className={`w-full flex justify-between items-center py-4 px-6 text-left rounded-2xl transition-all duration-300 text-lg font-medium ${isSelected
                    ? 'bg-indigo-50 text-indigo-700 shadow-md border-2 border-indigo-200'
                    : 'text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Link
                  className="hover:text-indigo-500 hover:underline decoration-2 underline-offset-4 transition-colors cursor-pointer"
                  href={`/blog/${encodeURIComponent(domainNode.domain)}`}>
                  {domainNode.domain}
                </Link>
                <span className={`text-sm transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* 카테고리 아코디언 내용 */}
              {isOpen && (
                <div className="ml-6 mt-2 space-y-2 border-l-2 border-indigo-200 pl-4 py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  {domainNode.categories.map((catNode) => (
                    <button
                      key={catNode.category}
                      onClick={() => handleCategoryClick(domainNode.domain, catNode.category)}
                      className={`w-full text-left py-2 px-4 text-base rounded-xl transition-all duration-200 ${selectedCategory === catNode.category
                          ? 'bg-indigo-500 text-white font-semibold shadow-sm'
                          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{catNode.category}</span>
                        <span className={`text-xs ${selectedCategory === catNode.category ? 'text-indigo-100' : 'opacity-60'}`}>
                          {catNode.posts.length}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}