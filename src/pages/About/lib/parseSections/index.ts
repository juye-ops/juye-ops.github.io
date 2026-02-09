import type { Section } from '../../model/types';

export function parseSections(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split('\n');
  
  let currentSection = { title: '', content: '' };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // div.page 라인 만나면 섹션 자르기
    if (line.includes('className="page"') || line.includes("className='page'")) {
      if (currentSection.content.trim()) {
        sections.push({ 
          title: currentSection.title,  // 빈 문자열 그대로
          content: currentSection.content.trim() 
        });
      }
      currentSection = { title: '', content: '' };
      continue;
    }
    
    else {
      currentSection.content += line + '\n';
    }
  }

  if (currentSection.content.trim()) {
    sections.push({ 
      title: currentSection.title,
      content: currentSection.content.trim() 
    });
  }

  return sections;
}
