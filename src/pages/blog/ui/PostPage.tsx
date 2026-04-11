import { getCategoryTree } from "@/widgets/blog";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function PostPage({ params }: { params: Promise<{ domain: string; category: string; slug: string }> }) {
  const { domain, category, slug } = await params;

  // 1. 트리 구조가 아닌, 모든 포스트가 담긴 평면(Flat) 리스트를 가져옵니다.
  // (getCategoryTree 내부에서 allPosts를 반환하는 함수를 따로 분리하면 더 좋습니다)
  const tree = await getCategoryTree();
  const allPosts = tree.flatMap(d => d.categories.flatMap(c => c.posts));

  // 2. URL의 slug와 일치하는 녀석을 딱 하나만 찾습니다.
  // 이 단계에서 도메인이나 카테고리 이름을 비교할 필요가 없습니다. slug(파일명)는 고유하니까요!
  const decodedSlug = decodeURIComponent(slug);
  const currentPost = allPosts.find(p => p.slug === decodedSlug);

  console.log("🎯 매칭된 포스트:", currentPost);

  if (!currentPost || !currentPost.postPath) {
    return notFound();
  }

  try {
    // 3. 이미 확보된 '진짜 경로(postPath)'로 바로 읽기
    const fileContent = await fs.readFile(currentPost.postPath, "utf-8");

    // ... 렌더링 로직
    return (
      <div className="min-h-screen bg-white py-20 px-6">
        <article className="max-w-3xl mx-auto prose prose-slate prose-lg">
          <h1>{currentPost.title}</h1>
          <ReactMarkdown>{fileContent}</ReactMarkdown>
        </article>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}