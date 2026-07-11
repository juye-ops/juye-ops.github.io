import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { PostData, RawPosts, SearchablePost } from '../types/post.types';
// 방금 정의하신 타입을 import 합니다.

export function useBlogSearch(postsData: RawPosts) {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  // 1. 타입을 확실하게 지정하여 배열로 변환
  const postsArray: SearchablePost[] = useMemo(() => 
    Object.entries(postsData).map(([slug, data]) => ({
      slug,
      ...data
    })), 
  [postsData]);

  const fuse = useMemo(() => new Fuse(postsArray, {
    keys: ['frontmatter.title', 'frontmatter.category', 'frontmatter.domain', 'searchContent'],
    threshold: 0.35,
  }), [postsArray]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedText(text), 150);
    return () => clearTimeout(handler);
  }, [text]);

  const filteredPosts = useMemo(() => {
    const query = debouncedText.trim();
    if (!query) return [];
    return fuse.search(query).map(r => r.item);
  }, [debouncedText, fuse]);

  console.log(filteredPosts)
  return { text, setText, filteredPosts };
}