import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CustomComponents } from '@/shared';
import styles from './Content.module.css';
import type { ContentProps } from '../model/content.types';

export function Content({ section }: ContentProps) {
  return (
    <div className={styles.contentSlide}>
      <article className={styles.sectionContent}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={CustomComponents}
        >
          {section}
        </ReactMarkdown>
      </article>
    </div>
  );
}
