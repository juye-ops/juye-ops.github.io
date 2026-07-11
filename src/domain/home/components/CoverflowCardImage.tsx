import { CoverflowCardImageProps } from "../types/coverflow-card-image.types";

export function CoverflowCardImage({ src, alt }: CoverflowCardImageProps) {
  // src가 없거나 빈 문자열일 경우를 모두 체크
  const hasImage = !!src && src.trim() !== "";

  return (
    <div className="h-2/3 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        // 이미지가 없을 때의 대체 UI (예: 기본 아이콘이나 배경)
        <span className="text-slate-400 text-sm">No Thumbnail</span>
      )}
    </div>
  );
}