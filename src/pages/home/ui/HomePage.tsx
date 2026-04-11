'use client';

import { cn } from '@/shared/model/cn';
import { Coverflow } from '../../../widgets/home/ui/Coverflow';

const MOCK_POSTS = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i),
  title: `Post ${i}`,
  description: `포트폴리오용 ${i} 글 요약입니다.`,
  thumbnailUrl: `https://picsum.photos/400/600?random=${i}`,
  isFeatured: true,
  createdAt: new Date().toISOString(),
}));


export function HomePage() {

  return (
    <div className={cn("items-center justify-center h-screen fade-in")}>
      {/* Coverflow 영역 */}
      <Coverflow
        items={MOCK_POSTS}
      />

    </div>
  );
}