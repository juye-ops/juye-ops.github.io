import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Content.module.css';
import { CustomComponents } from '@/shared/components/CustomComponents';
import { ContentProps } from '@/domain/about/types/content.types';

export function Content({ section }: ContentProps) {
  return (
    <div className={styles.contentSlide + " max-w-7xl mx-auto"}>
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
