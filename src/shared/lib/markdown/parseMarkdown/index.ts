// src/shared/lib/markdown/parseMarkdown.ts
export interface Frontmatter {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  blog: string;
}

// 브라우저에서 동작하는 순수 JS 구현
export function parseMarkdown(raw: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterMatch = raw.match(/---\s*\n([\s\S]*?)\n---\s*\n/);
  
  if (frontmatterMatch) {
    const yamlContent = frontmatterMatch[1];
    const content = raw.replace(/---\s*\n[\s\S]*?\n---\s*\n/, '').trim();
    
    // 간단한 YAML 파서 (name, tagline, email, phone, blog만 파싱)
    const frontmatter: Partial<Frontmatter> = {};
    
    yamlContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed.includes(':')) {
        const [key, value] = trimmed.split(':', 2);
        const cleanKey = key.trim();
        const cleanValue = value?.trim().replace(/['"]/g, '');
        
        if (cleanKey === 'name') frontmatter.name = cleanValue;
        if (cleanKey === 'tagline') frontmatter.tagline = cleanValue;
        if (cleanKey === 'email') frontmatter.email = cleanValue;
        if (cleanKey === 'phone') frontmatter.phone = cleanValue;
        if (cleanKey === 'blog') frontmatter.blog = cleanValue;
      }
    });
    
    return {
      frontmatter: frontmatter as Frontmatter,
      content
    };
  }
  
  return {
    frontmatter: { name: '', tagline: '', email: '', phone: '', blog: '' },
    content: raw
  };
}
