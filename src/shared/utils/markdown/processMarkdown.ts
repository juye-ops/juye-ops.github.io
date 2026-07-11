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


export async function processMarkdown(content: string) {

  const file = await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallout)
    .use(remarkHighlight)
    .use(remarkCodeTitles)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex, {
      strict: false, // 경고를 띄우지 않도록 설정
    }).use(rehypePrettyCode, {
      theme: 'github-dark',
      defaultLang: 'text',
    })
    .use(rehypeStringify)
    .use(() => (tree: any) => {
      visit(tree, 'element', (node) => {
        if (node.tagName === 'img' && node.properties?.src) {
          const src = node.properties.src as string;

          if (!src.startsWith('http') && !src.startsWith('data:')) {
            node.properties.src = `${PKMS_PATH}/${src.replace(/^\/+/, '')}`;
          }
        }
      });
    })
    .process(content);

  return String(file);
}