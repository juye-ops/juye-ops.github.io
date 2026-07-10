import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogHeader } from "../components/BlogHeader";
import "@/shared/styles/markdown.css"; import 'katex/dist/katex.min.css';

import { processMarkdown } from "@/shared/utils/markdown/processMarkdown";

import { getContentUrl } from "../utils/findContentUrl";
import { usePost } from "../hooks/usePosts";
import { PostContent } from "../components/PostContent";


interface PostPageProps {
  params: Promise<{
    domain: string;
    category: string;
    slug: string;
  }>;
}

export async function PostPage({ params }: PostPageProps) {
  const { domain: rawDomain, category: rawCategory, slug: rawSlug } = await params;

  const contentUrl = getContentUrl(rawSlug);
  // contentUrl이 null이면 훅을 호출하지 않고 일찍 리턴합니다.
  if (!contentUrl) {
    return notFound();
  }


  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased tracking-normal selection:bg-indigo-50 font-sans">
      <PostContent contentUrl={contentUrl} domainSlug={rawDomain} categorySlug={rawCategory} />
    </div >
  );
}