// src/widgets/home/coverflow/ui/CoverflowCardImage.tsx
interface CoverflowCardImageProps {
  src: string;
  alt: string;
}

export function CoverflowCardImage({ src, alt }: CoverflowCardImageProps) {
  return (
    <div className="h-2/3 w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
