import { ContentProps } from '@/domain/about/types/content.types';
import "@/shared/styles/markdown.css";
import 'katex/dist/katex.min.css';

export function Content({ section }: ContentProps) {
  return (
    <div>
      <article
        className={"prose prose-slate max-w-6xl mx-auto px-8 py-20"}
        dangerouslySetInnerHTML={{ __html: section }} />
    </div>
  );
}
