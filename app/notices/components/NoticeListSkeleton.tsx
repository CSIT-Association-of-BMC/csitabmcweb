import React from "react";

export function NoticeCardSkeleton() {
  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl bg-slate-200 animate-pulse overflow-hidden p-5 flex flex-col justify-between border border-slate-200/90 shadow-sm">
      {/* Category Pill placeholder */}
      <div className="self-end w-20 h-6 bg-slate-300 rounded-full" />

      {/* Document Body placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 space-y-3 opacity-60">
        <div className="w-12 h-12 rounded-xl bg-slate-300/80" />
        <div className="w-3/4 h-3 bg-slate-300/80 rounded" />
        <div className="w-1/2 h-2.5 bg-slate-300/80 rounded" />
      </div>

      {/* Title & Date placeholder */}
      <div className="space-y-2 pt-3 border-t border-slate-200">
        <div className="h-4 bg-slate-300 rounded w-5/6" />
        <div className="h-3 bg-slate-300/70 rounded w-1/3" />
      </div>
    </div>
  );
}

export function NoticeListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      {Array.from({ length: count }).map((_, i) => (
        <NoticeCardSkeleton key={i} />
      ))}
    </div>
  );
}
