// src/utils/parseMarkdown.ts
export interface Frontmatter {
  name: string;
  email: string;
  phone: string;
  blog: string;
  tagline: string;
}

interface ParseResult {
  frontmatter: Frontmatter | null;
  content: string;
}

export function parseMarkdown(content: string): ParseResult {
  // BOM 제거
  let cleanContent = content.replace(/^\uFEFF/, '');
  
  // 1단계: 첫 번째 --- 찾기
  if (!cleanContent.startsWith('---')) {
    console.warn('❌ 파일이 --- 로 시작하지 않습니다');
    return { frontmatter: null, content: cleanContent };
  }
  
  // 2단계: 첫 번째 --- 이후 두 번째 --- 찾기
  const firstDashIndex = 3; // '---' 길이
  const secondDashIndex = cleanContent.indexOf('\n---', firstDashIndex);
  
  if (secondDashIndex === -1) {
    console.warn('❌ 종료 --- 을 찾을 수 없습니다');
    return { frontmatter: null, content: cleanContent };
  }
  
  // 3단계: frontmatter 추출
  const frontmatterText = cleanContent.substring(firstDashIndex + 1, secondDashIndex).trim();
  const body = cleanContent.substring(secondDashIndex + 5).trim(); // '\n---\n' 제거
  
  console.log('✅ Frontmatter 텍스트:\n', frontmatterText);
  
  // 4단계: YAML 파싱
  const frontmatter: Partial<Frontmatter> = {};
  
  frontmatterText.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.substring(0, colonIndex).trim() as keyof Frontmatter;
    let value = line.substring(colonIndex + 1).trim();
    
    // 따옴표 제거
    value = value.replace(/^["']|["']$/g, '');
    
    console.log(`🔑 ${key} = "${value}"`);
    
    if (key in { name: 1, email: 1, phone: 1, blog: 1, tagline: 1 }) {
      (frontmatter as Record<keyof Frontmatter, string>)[key] = value;
    }
  });

  // 5단계: 필수 필드 검증
  const requiredFields: (keyof Frontmatter)[] = ['name', 'email', 'phone', 'blog', 'tagline'];
  const missingFields = requiredFields.filter(field => !frontmatter[field]);
  
  if (missingFields.length > 0) {
    console.warn('⚠️ 필수 필드 부족:', missingFields);
    console.warn('파싱된 데이터:', frontmatter);
    return { frontmatter: null, content: cleanContent };
  }

  console.log('✅ Frontmatter 파싱 성공:', frontmatter);
  console.log('📝 본문 (처음 100자):', body.substring(0, 100));
  
  return {
    frontmatter: frontmatter as Frontmatter,
    content: body,
  };
}
