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

import { remarkMark as remarkHighlight} from 'remark-mark-highlight'

export async function processMarkdown(content: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallout)
    .use(remarkHighlight)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
    })
    .use(rehypeStringify)
    .process(content);

  return String(file);
}