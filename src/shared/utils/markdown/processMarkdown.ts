import { unified, Plugin } from 'unified';
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
    .process(content);

  return String(file);
}