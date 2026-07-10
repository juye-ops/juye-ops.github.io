"use client";

import { AboutSwiper } from "@/domain/about/components/AboutSwiper";
import { useAbout } from "../hooks/useAbout";
import Loading from "@/shared/components/Loading";

export function AboutPage() {
  const { data: aboutData, loading, error } = useAbout();


  if (loading) return <Loading/>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!aboutData) return null;

  return (
    <main className="relative h-dvh">
      <AboutSwiper {...aboutData} />
    </main>
  );
}