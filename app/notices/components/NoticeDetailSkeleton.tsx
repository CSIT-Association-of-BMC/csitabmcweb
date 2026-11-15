import React from "react";
import { Container } from "@/components/shared/Container";

export function NoticeDetailSkeleton() {
  return (
    <article className="min-h-screen bg-white">
      <Container className="py-8 sm:py-12">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-64 mb-8 animate-pulse" />

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Proportional Document Preview Skeleton */}
          <div className="lg:col-span-7">
            <div className="w-full aspect-[3/4] max-w-lg mx-auto rounded-2xl bg-slate-100 border border-slate-200 p-6 animate-pulse flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-200" />
              <div className="w-48 h-4 bg-slate-200 rounded" />
              <div className="w-32 h-3 bg-slate-200 rounded" />
            </div>
          </div>

          {/* Right Column: Notice Info Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3 animate-pulse">
              <div className="h-6 bg-slate-200 rounded-full w-24" />
              <div className="h-8 bg-slate-200 rounded w-full" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-40 pt-2" />
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
            </div>

            <div className="pt-6 space-y-3 animate-pulse">
              <div className="h-5 bg-slate-200 rounded w-32" />
              <div className="space-y-2">
                <div className="h-16 bg-slate-100 rounded-xl" />
                <div className="h-16 bg-slate-100 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
