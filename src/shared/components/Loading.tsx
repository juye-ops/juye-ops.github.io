// app/blog/loading.tsx

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm">
      {/* 회전하는 스피너 */}
      <div className="relative h-16 w-16">
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-500"></div>
      </div>

      {/* 텍스트 */}
      <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">
        Loading...
      </p>
    </div>
  );
}