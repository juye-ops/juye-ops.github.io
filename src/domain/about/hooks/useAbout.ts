import { useState, useEffect } from 'react';
import { parseMarkdown, parseSections } from '@/shared/utils/markdown/parser';
import { processMarkdown } from '@/shared/utils/markdown/processMarkdown';
import { AboutFrontmatter, AboutSectionData } from '../types/about.types';

import aboutMetadata from '@/shared/metadata/about.json';
import { getSlugFromContentURL } from '@/shared/utils/markdown/slug';

export function useAbout() {
  const [data, setData] = useState<AboutSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. contentUrl을 통해 실제 마크다운 텍스트를 가져옵니다.
        const mdRes = await fetch(aboutMetadata.contentUrl);
        const mdSlug = getSlugFromContentURL(aboutMetadata.contentUrl)


        const rawMarkdown = await mdRes.text();

        // 2. 가져온 마크다운 텍스트를 파싱합니다.
        const { frontmatter, content } = parseMarkdown(rawMarkdown);
        const sections = parseSections(content);

        // 3. 비동기 마크다운 처리 (HTML 변환)
        const processedSections = await Promise.all(
          sections.map((section) => processMarkdown(section, frontmatter, mdSlug))
        );

        // 4. 최종 데이터 저장
        setData({
          frontmatter: frontmatter as AboutFrontmatter,
          sections: processedSections
        });
      } catch (e: any) {
        console.error("About 데이터 로딩 실패:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}