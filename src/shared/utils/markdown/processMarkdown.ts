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

import { RAW_URL_ROOT } from '@/shared/constants/env';


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

          // 이미 절대 경로(http/https)이거나 데이터 URI인 경우는 건너뜀
          if (!src.startsWith('http') && !src.startsWith('data:')) {
            // 상대 경로일 경우 ROOT 경로를 앞에 붙임
            // 슬래시(/) 처리를 깔끔하게 하기 위해 정규식 사용 가능
            node.properties.src = `${RAW_URL_ROOT}/${src.replace(/^\/+/, '')}`;
          }
        }
      });
    })
    .process(content);

  return String(file);
}