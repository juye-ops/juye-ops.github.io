import { ProjectFrontmatter } from "../types/portfolio.types";

interface ProjectInfoProps {
  frontmatter: ProjectFrontmatter & {
    domain?: string[];
    skills?: string[];
    role?: string;
    outcome?: string;
    href?: string;
  };
}

export function ProjectInfo({ frontmatter }: ProjectInfoProps) {
  return (
    // 전체 min-h-[252px]를 유지하여 이미지 높이에 대응하되, 내부 요소들은 마진 없이 촘촘하게 흐릅니다.
    <div className="w-full h-full min-h-[252px] pb-2">

      {/* 1. 상단 미니멀 타이틀 라인 */}
      <div className="flex items-center justify-between gap-2 text-[11px] font-mono tracking-tight text-neutral-400  mb-3">
        {frontmatter.organization && (
          <span className="text-neutral-600 font-bold tracking-normal"> {frontmatter.organization} </span>)}
        <div className="flex items-center gap-2">
          <span>{frontmatter.due}</span>
          <span className="text-neutral-200  select-none">•</span>
          <span>{frontmatter.images?.length || 0} images</span>
        </div>
      </div>

      {/* 2. 대제목 */}
      <div className="mb-3.5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-tight mb-2">{frontmatter.title}</h1>
        <div className="h-[1px] w-full bg-neutral-100 /60" />
      </div>

      {/* 3. 인스펙터 메타데이터 그리드 */}
      <div className="space-y-3.5 text-xs py-1 mb-4">
        {frontmatter.role && (
          <div className="grid grid-cols-[60px_1fr] items-start gap-2">
            <span className="font-mono text-[10px] uppercase font-semibold text-neutral-400  pt-0.5">role</span>
            <span className="text-[11px] text-neutral-700  font-medium">{frontmatter.role}</span>
          </div>
        )}

        {/* Domain 행 */}
        {frontmatter.domain && frontmatter.domain.length > 0 && (
          <div className="grid grid-cols-[60px_1fr] items-start gap-2">
            <span className="font-mono text-[10px] uppercase font-semibold text-neutral-400  pt-0.5">domain</span>
            <div className="flex flex-wrap gap-1.5">
              {frontmatter.domain.map((dom) => (
                <span key={dom} className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-sm bg-neutral-100  text-neutral-800  border border-neutral-200/40 /40" >
                  {dom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Techs 행 */}
        {frontmatter.skills && frontmatter.skills.length > 0 && (
          <div className="grid grid-cols-[60px_1fr] items-start gap-2">
            <span className="font-mono text-[10px] uppercase font-semibold text-neutral-400 pt-0.5">techs</span>
            <div className="flex flex-wrap gap-1">
              {frontmatter.skills.map((skill) => (
                <span key={skill} className="inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded-sm bg-blue-50/40 /20 text-blue-600  border border-blue-100/50 /30">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Outcome 행 */}
        {frontmatter.outcome && (
          <div className="grid grid-cols-[60px_1fr] items-start gap-2">
            <span className="font-mono text-[10px] uppercase font-semibold text-neutral-400  pt-0.5">result</span>
            <span className="text-[11px] text-neutral-600  break-keep leading-relaxed">{frontmatter.outcome}</span>
          </div>
        )}

        {/* Link 행 */}
        {frontmatter.href && (
          <div className="grid grid-cols-[60px_1fr] items-start gap-2">
            <span className="font-mono text-[10px] uppercase font-semibold text-neutral-400  pt-0.5">source</span>
            <a
              href={frontmatter.href}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-blue-500  hover:underline font-mono inline-flex items-center gap-0.5"
            >
              visit project ↗
            </a>
          </div>
        )}
      </div>

      {/* 구분선과 본문 설명 영역 (그리드 바로 아래에 마진 없이 타이트하게 연결) */}
      <div className="space-y-2">
        <div className="h-[1px] w-full bg-neutral-100 /60" />
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-500  tracking-tight break-keep font-normal pt-0.5">
          {frontmatter.description}
        </p>
      </div>

    </div>
  );
}