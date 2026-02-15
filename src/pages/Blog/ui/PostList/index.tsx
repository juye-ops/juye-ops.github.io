// src/pages/blog/ui/PostListPage/index.tsx

import { PostList } from "@/widgets/PostList/ui";
import { useParams } from "react-router";
import { useBlogPosts } from "../../lib/useBlogPosts";
import { BlogHeader } from "../BlogHeader";

export const PostListPage = () => {
  const params = useParams();
  const { domain, category } = params;
  const { posts, selectedDomain, selectedCategory } = useBlogPosts({ domain, category });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <BlogHeader 
          domain={selectedDomain} 
          category={selectedCategory} 
        />
        
        <div className="mt-16">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};
