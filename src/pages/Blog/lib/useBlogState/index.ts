import { getDomains } from "@/entities/Category/lib/data";
import type { Domains } from "@/entities/Category/model/types";
import { parseAllPosts } from "@/entities/Post/lib/parseFrontmatter";
import type { Post } from "@/entities/Post/model/types";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

interface UseBlogStateProps {
  initialDomain?: string | null;
  initialCategory?: string | null;
}

interface BlogState {
  domains: Domains;
  filteredPosts: Post[];
  recentPosts: Post[];
  searchQuery: string;

  selectedDomain: string | null;
  selectedCategory: string | null;

  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;

  handleSelectCategory: (domainId: string, categoryId?: string) => void;

  searchProps: {
    query: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  };
}

export const useBlogState = (
  { initialDomain, initialCategory }: UseBlogStateProps = {},
): BlogState => {
  const navigate = useNavigate();
  const params = useParams(); // ✅ /blog/:domain/:category
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ q만 유지

  const [searchQuery, setSearchQueryLocal] = useState(searchParams.get('q') || '');

  const allPosts = useMemo(() => parseAllPosts(), []);
  const domains = useMemo(() => getDomains(), []);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQueryLocal(q);
  }, [searchParams]);

  // ✅ 쿼리스트링이 아니라 라우트 파라미터로 선택 상태 결정
  const selectedDomain = (params.domain ?? initialDomain ?? null) as string | null;
  const selectedCategory = (params.category ?? initialCategory ?? null) as string | null;

  const filteredPosts = useMemo(() => {
    let result = [...allPosts];

    // ✅ domainSlug 같은 거 없음 → Post.domain / Post.category 그대로 비교
    if (selectedDomain) {
      result = result.filter(
        (p) => p.domain.toLowerCase() === selectedDomain.toLowerCase(),
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q),
      );
    }

    return result;
  }, [allPosts, selectedDomain, selectedCategory, searchQuery]);

  const recentPosts = useMemo(() => filteredPosts.slice(0, 4), [filteredPosts]);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryLocal(query);

    // ✅ q만 쿼리로 남긴다
    const next = new URLSearchParams(searchParams);
    if (query) next.set('q', query);
    else next.delete('q');

    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchQuery);
  }, [searchQuery, setSearchQuery]);

  // ✅ 도메인/카테고리 선택은 라우팅으로 이동
  const handleSelectCategory = useCallback((domainId: string, categoryId?: string) => {
    const parsedDomain = encodeURIComponent(domainId);
    if (categoryId) {
      const parsedCategory = encodeURIComponent(categoryId); // "CI/CD" -> "CI%2FCD"
      navigate(`/blog/${parsedDomain}/${parsedCategory}`);
    } else {
      navigate(`/blog/${parsedDomain}`);
    }
  }, [navigate]);


  return {
    domains,
    filteredPosts,
    recentPosts,
    searchQuery,
    selectedDomain,
    selectedCategory,
    setSearchQuery,
    handleSearch,
    handleSelectCategory,
    searchProps: {
      query: searchQuery,
      onChange: (e) => setSearchQueryLocal(e.target.value),
      onSubmit: handleSearch,
    },
  };
};
