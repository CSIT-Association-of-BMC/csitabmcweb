import { Container } from "@/components/shared/Container";

export function EventDetailSkeleton() {
  return (
    <article className="min-h-screen bg-slate-50/50 animate-pulse">
      {/* Hero Skeleton (Navy background #2b3870) */}
      <section className="relative w-full bg-[#2b3870] text-white pt-10 sm:pt-14 pb-14 sm:pb-18 overflow-hidden">
        <Container>
          {/* Breadcrumb Skeleton */}
          <div className="mb-8 sm:mb-10 flex items-center space-x-2">
            <div className="h-4 w-12 bg-white/20 rounded" />
            <span className="text-white/40">/</span>
            <div className="h-4 w-14 bg-white/20 rounded" />
            <span className="text-white/40">/</span>
            <div className="h-4 w-36 bg-white/20 rounded" />
          </div>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Metadata, Title, Excerpt, Quick Info */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              <div className="h-6 w-24 bg-white/20 rounded-full" />
              <div className="space-y-3">
                <div className="h-10 sm:h-12 w-4/5 bg-white/20 rounded-lg" />
                <div className="h-10 sm:h-12 w-3/5 bg-white/20 rounded-lg" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full bg-white/10 rounded" />
                <div className="h-4 w-2/3 bg-white/10 rounded" />
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="h-8 w-32 bg-white/15 rounded-lg" />
                <div className="h-8 w-32 bg-white/15 rounded-lg" />
                <div className="h-8 w-40 bg-white/15 rounded-lg" />
              </div>
            </div>

            {/* Right Column: Poster Skeleton */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md aspect-[4/3] sm:aspect-[16/10] lg:aspect-square bg-white/10 rounded-2xl border border-white/10 shadow-lg" />
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Skeleton Layout */}
      <section className="w-full py-10 lg:py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Main Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* About Card Skeleton */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
                <div className="h-8 w-48 bg-slate-200 rounded-lg pb-3" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded" />
                  <div className="h-4 w-4/5 bg-slate-100 rounded" />
                </div>
                <div className="space-y-3 pt-4">
                  <div className="h-6 w-36 bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-3/4 bg-slate-100 rounded" />
                </div>
              </div>

              {/* Speakers Card Skeleton */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="h-7 w-40 bg-slate-200 rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4 p-4 border border-slate-100 rounded-xl">
                    <div className="w-14 h-14 rounded-full bg-slate-200 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-28 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 border border-slate-100 rounded-xl">
                    <div className="w-14 h-14 rounded-full bg-slate-200 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-28 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="h-12 w-full bg-slate-200 rounded-xl" />
                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-16 bg-slate-200 rounded" />
                      <div className="h-3 w-32 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-16 bg-slate-200 rounded" />
                      <div className="h-3 w-24 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-16 bg-slate-200 rounded" />
                      <div className="h-3 w-28 bg-slate-100 rounded" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <div className="h-10 flex-1 bg-slate-100 rounded-lg" />
                  <div className="h-10 flex-1 bg-slate-100 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
