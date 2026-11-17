import React from "react";

export function BlogCardSkeleton() {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] rounded-2xl bg-slate-200 animate-pulse overflow-hidden p-5 flex flex-col justify-between shadow-xs">
      {/* Category Pill placeholder */}
      <div className="self-end w-20 h-6 bg-slate-300 rounded-full" />

      {/* Content placeholders */}
      <div className="space-y-3">
        <div className="h-5 bg-slate-300 rounded w-4/5" />
        <div className="h-4 bg-slate-300 rounded w-2/3" />
        <div className="pt-2 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-slate-300" />
          <div className="h-3.5 bg-slate-300 rounded w-28" />
        </div>
      </div>
    </div>
  );
}

export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
