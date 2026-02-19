// features/portfolio/ui/PortfolioDetail.tsx
import { useState } from "react";
import { Modal } from "@/shared/ui/Modal";
import ReactMarkdown from "react-markdown";
import type { PortfolioProjectProps } from "../../model/ProjectContent/types";
import styles from "./ProjectDetail.module.css"

const PREVIEW_MAX_HEIGHT = 360; // px

export function PortfolioDetail({ project }: PortfolioProjectProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-8">
      <div className="relative">
        {/* 미리보기 영역 */}
        <div 
          className={styles.sectionContent}
          style={{ maxHeight: PREVIEW_MAX_HEIGHT }}
        >
          <ReactMarkdown>{project.body}</ReactMarkdown>
        </div>

        {/* 그라데이션 + 버튼 (더 보기) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-neutral-900 via-white/80 dark:via-neutral-900/80 to-transparent flex items-end justify-center">
          <button
            type="button"
            className="pointer-events-auto mb-3 inline-flex items-center gap-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 px-4 py-1.5 text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
            onClick={() => setOpen(true)}
          >
            더 보기
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={project.title}
      >
        {/* <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none"> */}
        <article className={styles.sectionContent}>
          <ReactMarkdown>{project.body}</ReactMarkdown>
        </article>
      </Modal>
    </section>
  );
}
