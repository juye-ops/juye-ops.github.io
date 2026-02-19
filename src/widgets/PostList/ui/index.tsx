import { Link } from "react-router";
import type { Post } from "@/entities/Post/model/types";


interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {posts.map((post) => {
      const domainSlug = post.domain.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      return (
        <article key={post.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden hover:-translate-y-3 transition-all duration-500 border border-gray-100 hover:border-indigo-200 cursor-pointer">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                {post.domain}
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
                {post.category}
              </span>
            </div>
            <Link 
              to={`/blog/${domainSlug}/${categorySlug}/${post.slug}`}
              className="block"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 line-clamp-2 leading-tight">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>
            </Link>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <time className="text-sm text-gray-500">{post.date}</time>
              <span className="text-indigo-600 font-semibold text-sm hover:text-indigo-700">
                읽기 →
              </span>
            </div>
          </div>
        </article>
      );
    })}
  </div>
);
