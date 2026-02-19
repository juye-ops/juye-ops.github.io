// src/entities/post/lib/parseFrontmatter.ts
interface Frontmatter {
  title: string;
  domain: string;
  category: string;
  date: string;
  excerpt?: string;
  image?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  domain: string;
  category: string;
  excerpt: string;
  date: string;
  content: string;
  image?: string;
}

const mdModules = import.meta.glob('/content/posts/**/*.md', { eager: true, query: '?raw', import: 'default' });

const parseFrontmatter = (rawContent: string): { frontmatter: Frontmatter; content: string } => {
  // --- 구분자 찾기 (여러 줄 허용)
  const frontmatterRegex = /---\s*\n([\s\S]*?)\n---/;
  const frontmatterMatch = rawContent.match(frontmatterRegex);
  
  if (!frontmatterMatch) {
    return { 
      frontmatter: { title: 'Untitled', domain: 'Uncategorized', category: 'General', date: '2026-01-01' }, 
      content: rawContent 
    };
  }

  const [, frontmatterStr, content] = frontmatterMatch;
  const frontmatter: any = {};

  // 줄 단위 파싱 (더 강력)
  frontmatterStr.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // key: value 형식 (공백, 따옴표 처리)
    const keyValueMatch = trimmed.match(/^([^:]+?)\s*:\s*(.*)$/);
    if (keyValueMatch) {
      let [, key, value] = keyValueMatch;
      key = key.trim().toLowerCase();
      
      // 따옴표 제거
      value = value.trim().replace(/^['"](.*)['"]$/, '$1');
      
      frontmatter[key] = value;
    }
  });

  // 디버깅 로그 (한 번만)
  console.log('Parsed frontmatter:', frontmatter);

  return {
    frontmatter: {
      title: frontmatter.title || 'Untitled',
      domain: frontmatter.domain || 'Uncategorized',
      category: frontmatter.category || 'General',
      date: frontmatter.date || '2026-01-01',
      excerpt: frontmatter.excerpt,
      image: frontmatter.image,
    },
    content: content || rawContent,
  };
};

export const parseAllPosts = (): Post[] => {
  return Object.entries(mdModules).map(([path, rawContent]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { frontmatter, content } = parseFrontmatter(rawContent as string);
    
    return {
      id: slug,
      slug,
      title: frontmatter.title,
      domain: frontmatter.domain,
      category: frontmatter.category,
      excerpt: frontmatter.excerpt || content.slice(0, 160) + '...',
      date: frontmatter.date,
      content,
      image: frontmatter.image,
    };
  });
};
