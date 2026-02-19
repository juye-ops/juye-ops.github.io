export const CustomComponents = {
  h1: ({ node, ...props }: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-2" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h3 className="text-xl font-semibold mt-5 mb-3" {...props} />
  ),
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: ({ node, ...props }: any) => (
    <th className="bg-gray-100 border border-gray-300 px-3 py-2 text-left font-semibold" {...props} />
  ),
  td: ({ node, ...props }: any) => (
    <td className="border border-gray-300 px-3 py-2" {...props} />
  ),
  tr: ({ node, ...props }: any) => (
    <tr className="hover:bg-gray-50" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc list-inside mb-3 space-y-1 text-sm" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="ml-2" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="mb-3 leading-relaxed text-sm" {...props} />
  ),
};
