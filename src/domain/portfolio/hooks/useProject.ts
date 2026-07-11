// src/domain/portfolio/hooks/useProject.ts
import { parseMarkdown } from '@/shared/utils/markdown';
import { processMarkdown } from '@/shared/utils/markdown/processMarkdown';
import { useState, useEffect } from 'react';
import { ProjectFrontmatter } from '../types/portfolio.types';
import { processImageUrl } from '../utils/processImageUrl';


export function useProject(contentUrl: string) {
  const [data, setData] = useState<{ frontmatter: ProjectFrontmatter; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      if (!contentUrl) return;
      try {
        setLoading(true);
        const response = await fetch(contentUrl);
        const rawText = await response.text();

        // 1. 파싱
        let { frontmatter, content } = parseMarkdown<ProjectFrontmatter>(rawText);

        // 2. frontmatter 덮어쓰기 (가공)
        if (Array.isArray(frontmatter.images)) {
          frontmatter = {
            ...frontmatter,
            images: frontmatter.images.map((img) => ({
              ...img,
              src: processImageUrl(img.src),
            })),
          };
        }

        // 3. content 덮어쓰기 (변환)
        content = await processMarkdown(content);

        // 4. 최종 데이터 상태 업데이트
        setData({ frontmatter, content });
      } catch (error) {
        console.error("Failed to fetch/parse project content:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [contentUrl]);

  return { data, loading };
}