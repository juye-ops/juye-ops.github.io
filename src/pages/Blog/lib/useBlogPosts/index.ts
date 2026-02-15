import { parseAllPosts } from '@/entities/Post/lib/parseFrontmatter';
import { useMemo } from 'react';
import { useParams } from 'react-router';

const toSlug = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

interface UseBlogPostsProps {
  domain?: string;    // slug or display
  category?: string;  // slug or display
  slug?: string;      // post slug(file)
  markdown?: string;  // ✅ post slug(file)로 쓰자 (이름은 markdown이어도 동작은 slug)
}

export const useBlogPosts = ({ domain, category, slug, markdown }: UseBlogPostsProps = {}) => {
  const params = useParams();

  const allPosts = useMemo(() => parseAllPosts(), []);

  // ✅ 선택값: props가 있으면 props 우선, 아니면 URL params
  const domainParam = (domain ?? params.domain ?? null) as string | null;
  const categoryParam = (category ?? params.category ?? null) as string | null;
  const slugParam = (slug ?? params.slug ?? null) as string | null;

  // ✅ 필터링은 slugify 규칙으로 통일
  const selectedDomainSlug = domainParam ? toSlug(domainParam) : null;
  const selectedCategorySlug = categoryParam ? toSlug(categoryParam) : null;

  const posts = useMemo(() => {
    let result = [...allPosts];

    if (selectedDomainSlug) {
      result = result.filter(p => toSlug(p.domain) === selectedDomainSlug);
    }
    if (selectedCategorySlug) {
      result = result.filter(p => toSlug(p.category) === selectedCategorySlug);
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allPosts, selectedDomainSlug, selectedCategorySlug]);

  // ✅ 표시용 원문 복원 (DevOps / CI/CD)
  const selectedDomain = useMemo(() => {
    if (!selectedDomainSlug) return null;
    return posts[0]?.domain ?? allPosts.find(p => toSlug(p.domain) === selectedDomainSlug)?.domain ?? domainParam;
  }, [selectedDomainSlug, posts, allPosts, domainParam]);

  const selectedCategory = useMemo(() => {
    if (!selectedCategorySlug) return null;
    return posts[0]?.category ?? allPosts.find(p => toSlug(p.category) === selectedCategorySlug)?.category ?? categoryParam;
  }, [selectedCategorySlug, posts, allPosts, categoryParam]);

  // ✅ PostPage용: post 하나 찾기
  const post = useMemo(() => {
    // 1) markdown(=slug) 주면 그걸로 바로 찾기
    if (markdown) return allPosts.find(p => p.slug === markdown) ?? null;

    // 2) 아니면 기존 route 기반 찾기
    if (!selectedDomainSlug || !selectedCategorySlug || !slugParam) return null;

    return (
      allPosts.find(
        p =>
          toSlug(p.domain) === selectedDomainSlug &&
          toSlug(p.category) === selectedCategorySlug &&
          p.slug === slugParam
      ) ?? null
    );
  }, [allPosts, markdown, selectedDomainSlug, selectedCategorySlug, slugParam]);

  return { posts, post, selectedDomain, selectedCategory };
};
