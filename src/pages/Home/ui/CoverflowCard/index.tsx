import type { CoverflowCardProps } from "../../model/CoverflowCard/types";
import { CoverflowCardContent } from "../CoverflowCardContent";
import { CoverflowCardImage } from "../CoverflowCardImage";

export function CoverflowCard({ item, onClick }: CoverflowCardProps) {
  return (
    <article
      className="group relative h-[700px] sm:!h-[500px] rounded-2xl bg-neutral-900/70 border border-neutral-800 overflow-hidden shadow-lg shadow-black/40 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CoverflowCardImage src={item.thumbnailUrl} alt={item.title} />
      <CoverflowCardContent
        title={item.title}
        description={item.description}
        badge={item.isFeatured ? "Featured" : ""}
      />
    </article>
  );
}
