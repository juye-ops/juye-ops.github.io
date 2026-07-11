import { Coverflow } from "@/domain/home/components/Coverflow";
import { getFeaturedPosts } from "../utils/getFeaturedPosts";

export function HomePage() {
  // 컴포넌트 내부에서 함수 호출하여 가공된 데이터 사용
  const featuredPosts = getFeaturedPosts();

  return (
    <div className={"items-center justify-center h-screen fade-in"}>
      <Coverflow items={featuredPosts} />
    </div>
  );
}