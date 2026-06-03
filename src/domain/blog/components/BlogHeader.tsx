import Link from "next/link";

export const BlogHeader = ({ domain, category }: { domain: string | null; category: string | null }) => {
  return (
    <div className="text-center mb-20">
      <nav className="flex items-center justify-center text-sm text-gray-500 mb-8 max-w-4xl mx-auto">
        <Link href="/blog" className="hover:text-indigo-600 font-medium">Blog</Link>
        {domain && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/blog/${domain}`} className="font-semibold text-gray-900 capitalize hover:text-indigo-600">{domain}</Link>
          </>
        )}
        {category && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <span className="font-semibold text-indigo-600 capitalize">{category}</span>
          </>
        )}
      </nav>
      
      <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
        {domain ? domain : 'Blog'} {'>'} 
        {category && <span className="text-4xl md:text-5xl text-indigo-600"> {category}</span>}
      </h1>
    </div>
  );
};
