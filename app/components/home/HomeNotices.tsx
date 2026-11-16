import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Bell, Calendar } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getNotices } from "@/lib/api/notices";

interface HomeNoticesProps {
  className?: string;
}

export async function HomeNotices({ className = "" }: HomeNoticesProps) {
  try {
    const { notices } = await getNotices({ ordering: "-created_at" });
    const latestNotices = (notices || []).slice(0, 3);

    if (latestNotices.length === 0) {
      return null;
    }

    return (
      <section className={`w-full py-12 sm:py-16 bg-white border-t border-slate-200/60 ${className}`}>
        <Container>
          <SectionHeading
            highlight="Latest"
            title="Notices & Circulars"
            subtitle="Important updates, examination schedules, and official association announcements."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {latestNotices.map((notice) => {
              let formattedDate = "";
              try {
                formattedDate = notice.publishedAt
                  ? format(new Date(notice.publishedAt), "MMMM d, yyyy")
                  : "Recent";
              } catch {
                formattedDate = "Recent";
              }

              return (
                <Link
                  key={notice.id || notice.slug}
                  href={`/notices/${encodeURIComponent(notice.slug || notice.id || "")}`}
                  className="group rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-primary/40 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        <Bell className="w-3 h-3 text-primary" />
                        {notice.category || "General"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {notice.title}
                    </h3>

                    {notice.description && (
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {notice.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-primary">
                    <span>Read Notice</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/notices"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-300 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </Container>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch homepage notices:", error);
    return null;
  }
}
