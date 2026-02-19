import { useRef } from "react";
import { CoverflowSwiper } from "../CoverflowSwiper";
import { COVERFLOW_STYLES } from "./style";
import type { CoverflowProps } from "../../model/Coverflow/types";

export function Coverflow({ items, onItemChange }: CoverflowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <CoverflowSwiper
        items={items}
        onItemChange={onItemChange}
        containerRef={containerRef}
      />
      <style>{COVERFLOW_STYLES}</style>
    </section>
  );
}
