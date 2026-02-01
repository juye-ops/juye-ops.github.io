// src/widgets/home/coverflow/ui/CoverflowCardContent.tsx
interface CoverflowCardContentProps {
  title: string;
  description: string;
  badge?: string;
}

export function CoverflowCardContent({
  title,
  description,
  badge,
}: CoverflowCardContentProps) {
  return (
    <div className="h-1/3 px-4 py-3 flex flex-col gap-1">
      {badge && (
        <span className="inline-flex w-fit items-center rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300">
          {badge}
        </span>
      )}
      <h3 className="text-sm md:text-base font-semibold text-white line-clamp-1">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-neutral-300 line-clamp-2">
        {description}
      </p>
    </div>
  );
}
