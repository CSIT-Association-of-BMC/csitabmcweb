import React from "react";

export function EventCardSkeleton() {
  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl bg-slate-200 animate-pulse overflow-hidden p-5 flex flex-col justify-between shadow-sm">
      {/* Top right pill placeholder */}
      <div className="self-end w-20 h-6 bg-slate-300 rounded-full" />

      {/* Bottom content placeholders */}
      <div className="space-y-3">
        {/* Title */}
        <div className="h-5 bg-slate-300 rounded w-4/5" />
        <div className="h-4 bg-slate-300 rounded w-3/5" />

        {/* Date and Location lines */}
        <div className="pt-2 space-y-2">
          <div className="h-3.5 bg-slate-300/80 rounded w-1/2" />
          <div className="h-3.5 bg-slate-300/80 rounded w-2/3" />
        </div>

        {/* Action button */}
        <div className="pt-2">
          <div className="h-8 bg-slate-300 rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
}

export function EventListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}
