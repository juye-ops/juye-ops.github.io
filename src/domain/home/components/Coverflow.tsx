'use client';
import { useRef } from "react";
import { CoverflowSwiper } from "./CoverflowSwiper";
import { CoverflowProps } from "../types/coverflow.types";
import "./Coverflow.css";

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
    </section>
  );
}
