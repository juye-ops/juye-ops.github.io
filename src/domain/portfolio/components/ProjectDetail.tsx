import styles from "./ProjectDetail.module.css"
import "@/shared/styles/markdown.css"

const PREVIEW_MAX_HEIGHT = 360; // px

interface ProjectDetailProps {
  title: string
  content: string;
}

export function ProjectDetail({ title, content }: ProjectDetailProps) {

  return (
      <div className="relative">
        {/* 미리보기 영역 */}
        <div
          className={styles.sectionContent}
          style={{ maxHeight: PREVIEW_MAX_HEIGHT }}
        >
          <article
            className={"prose prose-slate max-w-6xl mx-auto "}
            dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
  );
}
