import type { PortfolioFrontmatter } from "../../model/ProjectContent/types";

export function parseFrontmatter(rawContent: string): {
  frontmatter: PortfolioFrontmatter | null;
  body: string;  // frontmatter 제거된 순수 본문
} {
  // frontmatter 추출
  const frontmatterMatch = rawContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  
  if (!frontmatterMatch) {
    return { frontmatter: null, body: rawContent.trim() };
  }

  const yaml = frontmatterMatch[1];
  const bodyStart = rawContent.indexOf('---', 4) + 3;
  const cleanBody = rawContent.slice(bodyStart).trim();

  // YAML 파싱
  const lines = yaml.split('\n').map(l => l.trim()).filter(Boolean);
  const data: any = {};

// 기존 코드에서 이 부분만 수정
for (const line of lines) {
  const colonIdx = line.indexOf(':');
  if (colonIdx === -1) continue;

  const key = line.slice(0, colonIdx).trim();
  let value = line.slice(colonIdx + 1).trim();
  value = value.replace(/^["']|["']$/g, '');

  if (key === 'index') {
    data[key] = parseInt(value) || 0;
  } else if (key === 'images') {
    // ✅ 수정: images 키 만나면 빈 배열 초기화
    data[key] = data[key] || [];
  } else if (line.trim().startsWith('-')) {
    // ✅ 추가: - 로 시작하는 라인은 images 배열에 추가
    if (data.images && line.includes('images')) {
      const imgUrl = line.slice(1).trim().replace(/^["']|["']$/g, '');
      data.images.push(imgUrl);
    }
  } else {
    data[key] = value;
  }
}
  // 모든 필드 완전 검증
  const frontmatter: PortfolioFrontmatter | null = (
    typeof data.index === 'number' &&
    typeof data.title === 'string' &&
    typeof data.organization === 'string' &&
    typeof data.due === 'string' &&
    typeof data.description === 'string' &&
    Array.isArray(data.images)
  ) ? data as PortfolioFrontmatter : null;

  return { frontmatter, body: cleanBody };
}
