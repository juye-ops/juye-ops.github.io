'use client';

import { getFlatPosts } from "@/domain/blog/utils/getFlatPosts";
import { Coverflow } from "@/domain/home/components/Coverflow";

export function HomePage() {
  const allPosts = getFlatPosts()

  const featuredPosts = allPosts.filter((post) => post.featured === true);

  return (
    <div className={"items-center justify-center h-screen fade-in"}>
      {/* Coverflow 영역 */}
      <Coverflow
        items={featuredPosts}
      />

    </div>
  );
}