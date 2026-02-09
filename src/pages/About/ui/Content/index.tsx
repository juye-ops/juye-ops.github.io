import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CustomComponents } from '@/shared/lib/markdown';
import styles from './Content.module.css';
import type { ContentProps } from '../../model/Content/types';

export function Content({ section }: ContentProps) {
  return (
    <div className={styles.contentSlide}>
      {section.title && <h2 className={styles.sectionTitle}>{section.title}</h2>}
      <article className={styles.sectionContent}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={CustomComponents}
        >
          {section.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
