// @/domain/blog/hooks/useBlogSearch.ts
import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import type { SearchablePost } from '../utils/getFlatPosts';

export function useBlogSearch(allPosts: SearchablePost[]) {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedText(text), 150);
    return () => clearTimeout(handler);
  }, [text]);

  const fuse = useMemo(() => new Fuse(allPosts, {
    keys: ['title', 'category', 'domain', 'content'],
    threshold: 0.35,
  }), [allPosts]);

  const filteredPosts = useMemo(() => {
    const query = debouncedText.trim();
    if (!query) return [];
    return fuse.search(query).map(r => r.item);
  }, [debouncedText, fuse]);

  return { text, setText, filteredPosts };
}