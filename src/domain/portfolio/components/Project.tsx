'use client';

import { ProjectFrontmatter } from "@/domain/portfolio/types/portfolio.types";
import { ProjectContent } from "./ProjectContent";
import { ProjectDetail } from "./ProjectDetail";
import { useState } from "react";
import { Modal } from "@/shared/components/Modal";

interface ProjectProps {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function Project({ frontmatter, content }: ProjectProps) {
  const [open, setOpen] = useState(false);
  return (
    // 💡 핵심 수정 1: 최외각 패딩을 분리합니다. 
    // 기본 상태(화면이 작아졌을 때)에는 pb-0을 주어 아래쪽 여백을 완전히 제로로 만듭니다.
    // 세로 화면이 넉넉할 때만(min-h-[800px]:pb-20) 원래 원하셨던 아래쪽 여백이 생기도록 제한합니다.
    <div className="h-screen flex flex-col overflow-y-auto max-w-6xl mx-auto px-8 pt-20 pb-0 relative">
      
      <div className="flex-shrink-0">
        <ProjectContent frontmatter={frontmatter} />
      </div>
      
      <hr className="mt-4 border-gray-300 flex-shrink-0" />
      
      <div className="flex-shrink-0">
        <ProjectDetail title={frontmatter.title} content={content} />
      </div>

      {/* 그라데이션 + 버튼 (더 보기) */}
      {/* 💡 핵심 수정 2: 원래 원하셨던 sticky bottom-0 구조를 그대로 유지합니다. */}
      {/* -mt-24를 통해 본문 글자 위로 겹치며(초과하며) 그라데이션 효과를 정직하게 냅니다. */}
      <div className="pointer-events-none sticky bottom-0 inset-x-0 h-24 bg-linear-to-t from-white dark:from-neutral-900 via-white/20 dark:via-neutral-900/80 to-transparent flex items-end justify-center z-10 -mt-24">
        <button
          type="button"
          className="pointer-events-auto mb-4 inline-flex items-center gap-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 px-4 py-1.5 text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition shadow-md"
          onClick={() => setOpen(true)}
        >
          더 보기
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={frontmatter.title}>
        <article
          className={"prose prose-slate max-w-6xl mx-auto "}
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </Modal>
    </div>
  )
}