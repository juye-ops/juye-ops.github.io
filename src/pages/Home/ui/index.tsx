import { cn } from '../../../shared/utils/cn';
import * as m from '../../../features/Nav';
import { CoverflowWidget } from '@/widgets/Home/Coverflow';

const MOCK_POSTS = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i),
  title: `Post ${i}`,
  description: `포트폴리오용 ${i} 글 요약입니다.`,
  thumbnailUrl: `https://picsum.photos/400/600?random=${i}`,
  isFeatured: true,
  createdAt: new Date().toISOString(),
}));


export function Home() {
  const button_data = [
    { label: "ABOUT", path: "/about" },
    { label: "PORTFOLIO", path: "/portfolio" },
    { label: "BLOG", path: "/blog" }
  ];

  return (
    <div className={cn("bg-[#bb4444] items-center justify-center h-screen fade-in")}>
      {/* 네비게이션 바 */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-blue-100">
        <m.NavBoard data={button_data} />
      </div>

      {/* Coverflow 영역 */}
      <CoverflowWidget
        items={MOCK_POSTS}
        onItemChange={(post) => {
          console.log("active home cover post:", post.title);
        }}
      />

    </div>
  );
}