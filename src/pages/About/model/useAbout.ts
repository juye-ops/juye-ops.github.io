import { useEffect, useState } from 'react';
import { parseMarkdown, type Frontmatter } from '@/shared/lib/markdown';
import { parseSections } from '../lib/parseSections';
import type { AboutState, Section } from './types';

export function useAbout(): AboutState {
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAbout() {
      try {
        const response = await fetch('/content/about.md');
        if (!response.ok) throw new Error('파일을 불러올 수 없습니다');

        const text = await response.text();
        const { frontmatter: fm, content: body } = parseMarkdown(text);

        setFrontmatter(fm);
        setSections(parseSections(body));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류 발생';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    loadAbout();
  }, []);

  return { frontmatter, sections, isLoading, error };
}
