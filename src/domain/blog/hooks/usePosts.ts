// @/domain/blog/hooks/usePost.ts

import { useState, useEffect } from 'react';
import { PostData, PostFrontmatter } from '../types/post.types';
import { parseMarkdown } from '@/shared/utils/markdown';
import { processMarkdown } from '@/shared/utils/markdown/processMarkdown';
import { getSlugFromContentURL } from '@/shared/utils/markdown/getSlug';

export function usePost(contentUrl: string) {
  const [data, setData] = useState<PostData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(contentUrl);
        const rawContent = await response.text();
        const { frontmatter, content } = parseMarkdown(rawContent);
        const mdSlug = getSlugFromContentURL(contentUrl)

        const processedHtml = await processMarkdown(content, frontmatter, mdSlug);

        // 읽기 시간 계산
        const readingTime = Math.ceil(content.replace(/\s/g, "").length / 500);

        setData({
          frontmatter: frontmatter as PostFrontmatter,
          content: processedHtml,
          readingTime
        });
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [contentUrl]);

  return { data, loading };
}