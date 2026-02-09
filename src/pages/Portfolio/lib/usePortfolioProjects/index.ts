// entities/portfolio/model/usePortfolioProjects.ts
import { useState, useEffect } from 'react';
import type { PortfolioProject } from '../../model/ProjectContent/types';
import { parseFrontmatter } from '../parseFrontmatter';


export function usePortfolioProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const files = [
          'kubernetes-cluster.md',
          'react-blog-portfolio.md',
        ];

        const projectList: PortfolioProject[] = [];

        for (const fileName of files) {
          const response = await fetch(`/content/portfolio/${fileName}`);
          if (!response.ok) continue;

          const rawContent = await response.text();
          const { frontmatter, body } = parseFrontmatter(rawContent);

          if (frontmatter) {
            projectList.push({
              ...frontmatter,
              slug: fileName.replace('.md', ''),
              body,  // ✅ frontmatter 제거된 순수 본문
            });
            console.log(`✅ 파싱: ${frontmatter.title}, body 길이: ${body.length}`);
          }
        }

        setProjects(projectList.sort((a, b) => a.index - b.index));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { projects, loading };
}
