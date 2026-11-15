import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { NoticeListSkeleton } from "./components/NoticeListSkeleton";

export default function NoticesLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-10 md:py-14">
      <Container as="main">
        <SectionHeading
          highlight="Official Notices"
          title="& Announcements"
          subtitle="Stay informed with official circulars, exam schedules, and administrative updates from CSITABMC."
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        {/* Search and Category Filter Skeleton */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 w-full md:w-auto">
            <div className="h-9 w-20 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-9 w-24 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-9 w-24 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-full md:w-80 bg-slate-200 rounded-lg animate-pulse" />
        </div>

        <NoticeListSkeleton count={8} />
      </Container>
    </div>
  );
}
