'use client';

import { ProjectContent } from "./ProjectContent";
import { ProjectDetail } from "./ProjectDetail";
import { useState } from "react";
import { Modal } from "@/shared/components/Modal";
import { useProject } from "../hooks/useProject"; // 훅 import
import Loading from "@/shared/components/Loading";

interface ProjectProps {
  contentUrl: string;
}

export function Project({ contentUrl }: ProjectProps) {
  const [open, setOpen] = useState(false);
  const { data, loading } = useProject(contentUrl);

  // 로딩 중이거나 데이터가 없으면 초기 화면 처리
  if (loading || !data) return <Loading/>;

  return (
    <div className="h-screen flex flex-col overflow-y-auto max-w-6xl mx-auto px-8 pt-20 pb-0 relative">
      <div className="flex-shrink-0">
        {/* 파싱된 frontmatter 사용 */}
        <ProjectContent frontmatter={data.frontmatter} />
      </div>

      <hr className="mt-4 border-gray-300 flex-shrink-0" />

      <div className="flex-shrink-0">
        <ProjectDetail
          title={data.frontmatter.title}
          content={data.content} // 파싱된 content 전달
        />
      </div>

      <div className="pointer-events-none sticky bottom-0 inset-x-0 h-24 bg-linear-to-t from-white dark:from-neutral-900 via-white/20 dark:via-neutral-900/80 to-transparent flex items-end justify-center z-10 -mt-24">
        <button
          type="button"
          className="pointer-events-auto mb-4 inline-flex items-center gap-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 px-4 py-1.5 text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition shadow-md"
          onClick={() => setOpen(true)}
        >
          더 보기
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={data.frontmatter.title}>
        <article
          className="prose prose-slate max-w-6xl mx-auto"
          // 여기서 마크다운 -> HTML 변환 로직(예: remark)을 추가로 거쳐야 할 수 있습니다.
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </Modal>
    </div>
  )
}