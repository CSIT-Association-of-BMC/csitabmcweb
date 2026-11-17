import React from "react";
import { Container } from "@/components/shared/Container";

export function BlogDetailSkeleton() {
  return (
    <article className="min-h-screen bg-slate-50/60 pb-16">
      {/* Header Skeleton */}
      <header className="pt-8 sm:pt-12 pb-6 sm:pb-8">
        <Container>
          {/* Breadcrumb */}
          <div className="h-4 bg-slate-200 rounded w-48 mb-6 animate-pulse" />

          {/* Title */}
          <div className="space-y-3 mb-6 animate-pulse">
            <div className="h-10 sm:h-12 bg-slate-200 rounded w-full" />
            <div className="h-10 sm:h-12 bg-slate-200 rounded w-3/4" />
          </div>

          {/* Excerpt */}
          <div className="space-y-2 mb-6 animate-pulse">
            <div className="h-5 bg-slate-200/80 rounded w-full" />
            <div className="h-5 bg-slate-200/80 rounded w-5/6" />
          </div>

          {/* Author / Date metadata row */}
          <div className="flex items-center justify-between py-4 border-y border-slate-200/90 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200" />
              <div className="h-4 w-32 bg-slate-200 rounded" />
            </div>
            <div className="h-4 w-24 bg-slate-200 rounded" />
          </div>
        </Container>
      </header>

      {/* Featured Cover Image Skeleton */}
      <Container className="mb-8 sm:mb-12">
        <div className="w-full aspect-video max-h-[500px] rounded-2xl sm:rounded-3xl bg-slate-200 animate-pulse" />
      </Container>

      {/* Main Body Skeleton */}
      <main className="w-full">
        <Container>
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-xs space-y-4 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-slate-200/80 rounded w-full" />
            <div className="h-4 bg-slate-200/80 rounded w-full" />
            <div className="h-4 bg-slate-200/80 rounded w-4/5" />
            <div className="h-32 bg-slate-100 rounded-xl my-6" />
            <div className="h-4 bg-slate-200/80 rounded w-full" />
            <div className="h-4 bg-slate-200/80 rounded w-3/4" />
          </div>
        </Container>
      </main>
    </article>
  );
}
