import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkCallout from '@r4ai/remark-callout'
import { remarkMark as remarkHighlight } from 'remark-mark-highlight'
import remarkBreaks from 'remark-breaks';
import remarkCodeTitles from "remark-flexible-code-titles";

import { visit } from 'unist-util-visit'; // 설치 필요: npm install unist-util-visit

import { PKMS_PATH } from '@/shared/constants/env';
import { PostFrontmatter } from '@/domain/blog/types/post.types';


function remarkCustom({ frontmatter, slug }: { frontmatter: PostFrontmatter; slug: string }) {
  return (tree: any) => {
    (visit as any)(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (!node.value || typeof index !== 'number' || !parent) return;

      // 옵시디언 이미지 문법 정규식
      const obsidianImageRegex = /!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg))\]\]/;
      if (!obsidianImageRegex.test(node.value)) return;

      const newChildren: any[] = [];
      let text = node.value;
      let match;

      while ((match = obsidianImageRegex.exec(text)) !== null) {
        // 이미지 앞 텍스트 처리
        if (match.index > 0) {
          newChildren.push({ type: 'text', value: text.slice(0, match.index) });
        }

        const originalFilename = match[1];

        // [경로 조립 로직]
        // 만약 파일명이 이미 '/'로 시작하면(절대경로) 그대로 사용, 아니면 조립
        const resolvedUrl = originalFilename.startsWith('/') 
          ? originalFilename 
          : `/assets/images/posts/${frontmatter.domain}/${frontmatter.category}/${slug}/${originalFilename}`;

        // 이미지 노드 생성
        newChildren.push({
          type: 'image',
          url: resolvedUrl,
          alt: originalFilename,
        });

        text = text.slice(match.index + match[0].length);
      }

      // 마지막 텍스트 처리
      if (text.length > 0) {
        newChildren.push({ type: 'text', value: text });
      }

      parent.children.splice(index, 1, ...newChildren);
      return index + newChildren.length;
    });
  };
}

function rehypeCustom() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src as string;

        if (!src.startsWith('http') && !src.startsWith('data:')) {
          node.properties.src = `${PKMS_PATH}/${src.replace(/^\/+/, '')}`;
        }
      }
    });
  }
}


export async function processMarkdown(content: string, frontmatter: PostFrontmatter, slug: string) {
  return String(await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallout)
    .use(remarkHighlight)
    .use(remarkCodeTitles)
    .use(remarkCustom, { frontmatter, slug })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex, { strict: false, })
    .use(rehypePrettyCode, { theme: 'github-dark', defaultLang: 'text', })
    .use(rehypeCustom)
    .use(rehypeStringify)
    .process(content)
  );
}