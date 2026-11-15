import React from "react";

export function MemberCardSkeleton() {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200/70 p-4 h-full flex flex-col justify-between animate-pulse">
      <div className="relative w-full aspect-square rounded-md bg-slate-200 shrink-0" />
      <div className="pt-3 text-center space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-slate-200/70 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
}

export function TeamSkeleton() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Tenure selector placeholder */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200 animate-pulse">
        <div className="h-4 w-16 bg-slate-200 rounded" />
        <div className="h-9 w-36 bg-slate-200 rounded-lg" />
      </div>

      {/* Executive Committee Section Skeleton */}
      <section>
        <div className="mb-8 sm:mb-10 animate-pulse space-y-2 text-center sm:text-left">
          <div className="h-7 w-48 bg-slate-200 rounded" />
          <div className="h-4 w-72 bg-slate-200/80 rounded" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Advisors Section Skeleton */}
      <section className="pt-8 border-t border-slate-200">
        <div className="mb-6 sm:mb-8 animate-pulse space-y-2 text-center sm:text-left">
          <div className="h-7 w-32 bg-slate-200 rounded" />
          <div className="h-4 w-60 bg-slate-200/80 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
