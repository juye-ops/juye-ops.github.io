import matter from 'gray-matter';

// 1. 순수하게 문자열을 받아 객체로 변환하는 함수 (Shared)
export function parseMarkdown(text: string, matterOnly: boolean = false) {
  const { data, content: body } = matter(text);
  return matterOnly ? data : { frontmatter: data, content: body };
}