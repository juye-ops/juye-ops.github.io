'use client';

import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { SearchBar } from './SearchBar';
import { SearchResultList } from './SearchResultList';
import { CategoryPanel } from './CategoryPanel';
import type { SearchablePost } from '../utils/getFlatPosts';
import type { DomainNode } from '../types/domain.types';

interface BlogSearchContainerProps {
  allPosts: SearchablePost[];
  categoryTreeData: DomainNode[];
}

export function BlogSearchContainer({
  allPosts,
  categoryTreeData
}: BlogSearchContainerProps) {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  // 1. 디바운스 엔진
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 150);

    return () => clearTimeout(handler);
  }, [text]);

  // 2. Fuse.js 생성
  const fuse = useMemo(() => {
    return new Fuse(allPosts, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'category', weight: 0.15 },
        { name: 'domain', weight: 0.15 },
        { name: 'content', weight: 0.2 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, [allPosts]);

  // 3. 실시간 검색 결과
  const filteredPosts = useMemo(() => {
    const query = debouncedText.trim();
    if (!query) return [];
    return fuse.search(query).map((result) => result.item);
  }, [debouncedText, fuse]);

  return (
    <div className="space-y-12">
      {/* 🔍 검색 바 (UI 컴포넌트) */}
      <SearchBar value={text} onChange={setText} />

      {/* 🎛️ 스위칭 및 결과 렌더링 영역 */}
      <div className="max-w-3xl mx-auto">
        {text.trim() ? (
          <SearchResultList posts={filteredPosts} />
        ) : (
          <CategoryPanel domains={categoryTreeData} selectedDomain={null} selectedCategory={null} />
        )}
      </div>
    </div>
  );
}