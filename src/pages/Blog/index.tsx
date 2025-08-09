import { useState } from 'react';
import { cn } from '../../shared/utils/cn';

function Blog() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const posts = [
    { id: 'post1', title: 'My First Blog Post', content: '# My First Blog Post\n\nThis is the content of my first blog post.\n\nIt\'s about various topics and ideas.' },
    { id: 'post2', title: 'Another Blog Post', content: '# Another Blog Post\n\nThis is the second blog post.\n\nIt discusses different aspects of software development.' },
  ];

  const renderPostContent = () => {
    if (!selectedPost) {
      return <p>Select a post from the left to view its content.</p>;
    }
    const post = posts.find(p => p.id === selectedPost);
    return (
      <div className={cn("post-content")}>
        {/* In a real application, you would parse Markdown here */}
        <h2 className={cn("text-gray-800 mt-0 mb-4")}>{post?.title}</h2>
        <p className={cn("text-gray-600 leading-relaxed")}>{post?.content.split('\n\n')[1]}</p>
      </div>
    );
  };

  return (
    <div className={cn("w-lvw h-full flex flex-1 border border-gray-200 rounded-lg overflow-hidden font-sans fade-in")}>
      <div className={cn("w-64 border-r border-gray-200 p-5 bg-gray-50 overflow-y-auto")}>
        <h2 className={cn("text-gray-800 mt-0 mb-5")}>Posts</h2>
        <ul className={cn("list-none p-0")}>
          {posts.map(post => (
            <li key={post.id} onClick={() => setSelectedPost(post.id)} className={cn("py-2.5 px-4 mb-1.5 cursor-pointer rounded-md transition-all duration-200 ease-in-out", selectedPost === post.id ? 'bg-gray-600 font-bold translate-x-0.5 shadow-md' : 'hover:bg-gray-100 hover:translate-x-0.5 hover:shadow-md')}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn("flex-1 p-5 overflow-y-auto bg-white w-full mx-auto")}>
        {renderPostContent()}
      </div>
    </div>
  );
}

export default Blog;
