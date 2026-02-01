// src/widgets/home/coverflow/ui/CoverflowWidget.tsx
"use client";

import { useRef } from "react";
import { SwiperContainer } from "../SwiperContainer";
import { COVERFLOW_STYLES } from "../CoverflowWidgetStyles";
import type { CoverflowWidgetProps } from "../../model/types";

export function CoverflowWidget({ items, onItemChange }: CoverflowWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <SwiperContainer
        items={items}
        onItemChange={onItemChange}
        containerRef={containerRef}
      />
      <style>{COVERFLOW_STYLES}</style>
    </section>
  );
}
