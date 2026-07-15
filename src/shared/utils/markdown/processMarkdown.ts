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

function remarkCustom() {
  return (tree: any, file: any) => {
    console.log(file);
    (visit as any)(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (!node.value || typeof index !== 'number' || !parent) return;

      // 1. 정규식 수정: [^\]] 대신 [\s\S]를 사용하여 줄바꿈을 포함하도록 합니다.
      // 2. g 플래그를 사용하지 않고 exec 대신 match 등을 활용하거나 주의가 필요합니다.
      const obsidianImageRegex = /!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg))\]\]/;

      if (!obsidianImageRegex.test(node.value)) return;

      const newChildren: any[] = [];
      let text = node.value;
      let match;

      // 루프를 돌며 분해
      while ((match = obsidianImageRegex.exec(text)) !== null) {
        // 이미지 앞의 텍스트
        if (match.index > 0) {
          newChildren.push({ type: 'text', value: text.slice(0, match.index) });
        }

        // 이미지 노드
        newChildren.push({
          type: 'image',
          url: match[1],
          alt: match[1],
        });

        // 나머지 텍스트
        text = text.slice(match.index + match[0].length);
      }

      // 마지막 텍스트
      if (text.length > 0) {
        newChildren.push({ type: 'text', value: text });
      }

      // 부모 교체
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


export async function processMarkdown(content: string) {
  return String(await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallout)
    .use(remarkHighlight)
    .use(remarkCodeTitles)
    .use(remarkCustom)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex, { strict: false, })
    .use(rehypePrettyCode, { theme: 'github-dark', defaultLang: 'text', })
    .use(rehypeCustom)
    .use(rehypeStringify)
    .process(content)
  );
}