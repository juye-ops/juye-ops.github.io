// src/pages/blog/ui/PostPage/index.tsx
import ReactMarkdown from 'react-markdown';  // npm i react-markdown
import { useParams, Link } from 'react-router';
import { useBlogPosts } from '../../lib/useBlogPosts';

export const PostPage = () => {
  const params = useParams();
  const { domain, category, slug } = params;
  
  const { post } = useBlogPosts({ domain, category, slug });

  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
        
        <article className="mt-16">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-3xl mb-12 shadow-2xl"
            />
          )}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              <Link 
                to={`/blog/${post.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full hover:bg-indigo-100"
              >
                {post.domain}
              </Link>
              <span className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6 text-gray-900">
              {post.title}
            </h1>
            <time className="text-xl text-gray-500">{post.date}</time>
          </header>
          
          <div className="prose prose-headings:text-gray-900 prose-h1:text-4xl prose-h2:text-3xl prose-a:text-indigo-600 max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};
