import { BlogHeader } from "@/entities/blog/ui/BlogHeader";
import { PostList } from "@/entities/blog/ui/PostList";
import { getCategoryTree } from "@/widgets/blog";
import { notFound } from "next/navigation";

interface PostListPageProps {
  params: Promise<{ // Next.js 15에서는 Promise 타입이 정확합니다.
    domain: string;
    category: string;
  }>;
}

export async function PostListPage({ params }: PostListPageProps) {
  // 1. 원본 파라미터를 먼저 받습니다. (인코딩된 상태: %EB%B8%94%EB%A1%9C%EA%B7%B8 등)
  const { domain: rawDomain, category: rawCategory } = await params; 

  // 2. 화면 표시 및 데이터 검색을 위해 디코딩합니다. (한글 상태: 블로그 등)
  const decodedDomain = decodeURIComponent(rawDomain);
  const decodedCategory = decodeURIComponent(rawCategory);

  // 3. 서버에서 전체 트리 데이터 로드
  const tree = await getCategoryTree();

  // 4. 디코딩된 텍스트로 트리에서 데이터를 찾습니다.
  const currentDomain = tree.find((d) => d.domain === decodedDomain);
  const currentCategory = currentDomain?.categories.find(
    (c) => c.category === decodedCategory
  );

  if (!currentCategory) {
    return notFound();
  }

  const posts = currentCategory.posts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더에는 읽기 편하게 디코딩된 이름을 보냅니다. */}
        <BlogHeader 
          domain={decodedDomain} 
          category={decodedCategory} 
        />
        
        <div className="mt-16">
          {/* [중요] PostList에는 'rawDomain', 'rawCategory'를 보냅니다.
            이미 인코딩된 상태이므로 PostList 내부에서 중복 인코딩을 방지할 수 있습니다.
          */}
          <PostList 
            posts={posts} 
            domain={rawDomain} 
            category={rawCategory} 
          />
        </div>
      </div>
    </div>
  );
}