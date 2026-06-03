export function parseSections(content: string): string[] {
  const sections: string[] = [];
  const lines = content.split('\n');

  let currentSection = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // div.page 라인 만나면 섹션 자르기
    if (line.includes('className="page"') || line.includes("className='page'")) {
      if (currentSection.trim()) {
        sections.push(currentSection.trim());
      }
      currentSection = '';
      continue;
    }

    else {
      currentSection += line + '\n';
    }
  }

  if (currentSection.trim()) {
    sections.push(currentSection.trim());
  }

  return sections;
}
