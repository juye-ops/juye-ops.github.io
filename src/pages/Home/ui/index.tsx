import { cn } from '@/shared/utils/cn';
import { Coverflow } from './Coverflow';

const MOCK_POSTS = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i),
  title: `Post ${i}`,
  description: `포트폴리오용 ${i} 글 요약입니다.`,
  thumbnailUrl: `https://picsum.photos/400/600?random=${i}`,
  isFeatured: true,
  createdAt: new Date().toISOString(),
}));


export function Home() {

  return (
    <div className={cn("items-center justify-center h-screen fade-in absolute inset-0")}>
      {/* Coverflow 영역 */}
      <Coverflow
        items={MOCK_POSTS}
        onItemChange={(post) => {
          console.log("active home cover post:", post.title);
        }}
      />

    </div>
  );
}